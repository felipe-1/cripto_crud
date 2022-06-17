import React from "react";
import '../App.css';

const AddCoinForm = ({handleAddCoinChange, addCoin, errMessage }) => {
  return (
    <div className='criptoInfo'>
        
    <h2>Adicionar Moeda</h2>

      <label>Nome:</label>
      <input
        name='name' 
        type="text" 
        autoComplete="off"
        onChange={handleAddCoinChange} 
      />

      <label>Código:</label>
      <input 
        name='cod'
        type="text"
        autoComplete="off"
        onChange={handleAddCoinChange} 
      />

      <label>Cotação:</label>
      <input
        name='price' 
        type="number"
        autoComplete="off"
        onChange={handleAddCoinChange}  
      />
      <button onClick={addCoin}>Adicionar Moeda</button>

      
      <div className="errMessage">{errMessage}</div>

    </div>
    )
}

export default AddCoinForm;