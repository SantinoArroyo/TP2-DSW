import React, { useState } from 'react';

function InputArea({ onAddItem }) {
  const [newItem, setNewItem] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newQuantity, setNewQuantity] = useState('1');
  const [isFormValid, setIsFormValid] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isFormValid) {
      alert('Por favor, ingresa una cantidad válida (mayor que 0).');
      return;
    }

    if (newItem.trim() !== '') {
      onAddItem({
        text: newItem,
        description: newDescription,
        completed: false,
        quantity: newQuantity,
      });
      setNewItem('');
      setNewDescription('');
      setNewQuantity(1);
      setIsFormValid(true);
    }
  };

  return (
    <form className="input-area" onSubmit={handleSubmit}>
      <input
        type="text"
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
        placeholder="Agregar item"
      />
      <textarea
        value={newDescription}
        onChange={(e) => setNewDescription(e.target.value)}
        placeholder="Descripción (opcional)"
      />
      <input
        type="number"
        value={newQuantity}
        onChange={(e) => setNewQuantity(parseInt(e.target.value) || 1)}
        min="1"
        placeholder="Cantidad"
        />
      <button type="submit">Agregar</button>
    </form>
  );
}

export default InputArea;