import React from "react";
import '../App.css'

const UpdateCoinForm = ({handleAddCoinChange, deleteCoin, updateCoin, cancelSelect}) => {
  
  return (
    
    <div className='criptoInfo'>
        
    <h2>Alterar Moeda</h2>

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
      <div className='buttonGroup'>
        <button onClick={updateCoin}>Salvar</button>
        <button onClick={deleteCoin}>Deletar</button>
        <button onClick={cancelSelect}>Cancelar</button>
      </div>
    </div>
    )
}

export default UpdateCoinForm;