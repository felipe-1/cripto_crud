import './App.css';
import { useState } from "react";
import Axios from 'axios';
import AddCoinForm from './components/addCoinForm';
import UpdateCoinForm from './components/UpdateCoinForm';

function App() {

  const [coinList, setCoinList] = useState([]);
  const [CoinData, setCoinData] = useState({
    id: '',
    name: '',
    cod: '',
    price:'',
  });

  const [selectCoinId, setSelectCoinId] = useState(null);


  const [errMessage, setErrMessage] = useState('');

  const [selectInputValue, setSelectInputValue] = useState('');

  const handleAddCoinChange = (event) => {
    event.preventDefault();

    const fieldname = event.target.getAttribute('name');
    const fieldValue = event.target.value;

    const newCoinData = { ...CoinData};
    newCoinData[fieldname] = fieldValue;

    setCoinData(newCoinData);
  }

  const handleSelectCoin = (event) => {
    event.preventDefault();
    const fieldValue = event.target.value;
    setSelectInputValue(fieldValue);
  }

  const addCoin = () => {
    setSelectCoinId(null)
    let invalid = false;
    setErrMessage('');
    
    if (CoinData.name === '') {
      invalid = true;
    }
    if (CoinData.cod === '') {
      invalid = true;
    }
    if (CoinData.price === '') {
      invalid = true;
    }
    
    if (!invalid) {
      Axios.post('http://localhost:3001/add', {
      name: CoinData.name, 
      cod: CoinData.cod, 
      price: CoinData.price
    });
    getCoins();
  } else {
    setErrMessage('Por favor preencha todos os campos');
  }
    
  };

  const getCoins = () => {
    Axios.get('http://localhost:3001/coins').then((response) => {
      setCoinList(response.data);
    });
    setSelectCoinId(null);
  };

  const updateCoin = () => {
    Axios.put(`http://localhost:3001/update/${selectCoinId}`, {
      name: CoinData.name, 
      cod: CoinData.cod, 
      price: CoinData.price
    });
    setSelectCoinId(null);
    getCoins();
  }

  const deleteCoin = () => {
    Axios.delete(`http://localhost:3001/delete/${selectCoinId}`);
    setSelectCoinId(null); 
    getCoins();
  };

  const cancelSelect = () => {
    setSelectCoinId(null); 
  }

  const selectByName = () => {
    Axios.get(`http://localhost:3001/coins/${selectInputValue}`, {
    }).then((response) => {
    setCoinList(response.data);
    })
    setSelectCoinId(null);
  };

  return (
    <div className="App">

      <div className='inputs'>
      
        <div className='search'>
          <h2>Pesquisa por Nome</h2>
          <input
            name='select' 
            type="text" 
            autoComplete="off"
            onChange={handleSelectCoin} 
          />
          <div className='buttonGroup'>
            <button onClick={selectByName}>Pesquisar</button>
            <button onClick={getCoins}>Listar todas</button>
          </div>
        </div>

      
      {(selectCoinId === null) ? 
        <AddCoinForm
          handleAddCoinChange={handleAddCoinChange}
          addCoin={addCoin}
          errMessage={errMessage}
        />
        :
        <UpdateCoinForm
          handleAddCoinChange={handleAddCoinChange}
          deleteCoin={deleteCoin}
          updateCoin={updateCoin}
          cancelSelect={cancelSelect}
        />
      }
      </div>

      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Cod.</th>
            <th>Cotação</th>
            <th>Data de Inclusão</th>
            <th>Data de Atualização</th>
          </tr>
        </thead>
        <tbody>
        {coinList.map((val, key) => {
          return <tr 
            //className='coin'
            onClick={() => {
              setSelectCoinId(val.id)
              setErrMessage('');            
            }}
            style={{
              //color: selectCoinId === val.id ? 'black' : '',
              fontWeight: selectCoinId === val.id ? 'bold' : '',
            }}
          > 
          <td>{val.name}</td>
          <td>{val.code}</td> 
          <td>{val.price}</td>
          <td>{val.insert_date}</td>
          {val.update_date !== null ? <td>{val.update_date}</td> : "" }
          </tr>
        })}
        </tbody>
      </table>
    </div>
  );
}

export default App;
