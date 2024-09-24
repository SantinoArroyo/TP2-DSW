import React, { useState } from 'react';

function Item({
  item,
  index,
  onUpdateItem,
  onDeleteItem,
  onMoveCompletedToEnd,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(item.text);
  const [editDescription, setEditDescription] = useState(item.description);
  const [editQuantity, setEditQuantity] = useState(item.quantity);

  const handleEditChange = (e) => {
    setEditText(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setEditDescription(e.target.value);
  };

  const handleQuantityChange = (e) => {
    setEditQuantity(parseInt(e.target.value));
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    setIsEditing(false);
    onUpdateItem(index, {
      ...item,
      text: editText,
      description: editDescription,
      quantity: editQuantity,
    });
  };

  const toggleComplete = () => {
    onUpdateItem(index, { ...item, completed: !item.completed });
    onMoveCompletedToEnd(); // Mover el item entre las listas al cambiar el estado completed
  };

  return (
    <li className={`item ${item.completed ? 'completed' : ''}`}>
      <div className="item-details">
        {isEditing ? (
          <form onSubmit={handleEditSubmit}>
            <input type="text" value={editText} onChange={handleEditChange} />
            <textarea
              value={editDescription}
              onChange={handleDescriptionChange}
            />
            <input
              type="number"
              value={editQuantity}
              onChange={handleQuantityChange}
              min="1"
            />
            <button type="submit">Guardar</button>
            <button type="button" onClick={() => setIsEditing(false)}>
              Cancelar
            </button>
          </form>
        ) : (
          <>
            <span onClick={toggleComplete}>
              {item.text} ({item.quantity})
            </span>
            {item.description && <p>{item.description}</p>}
          </>
        )}
      </div>
      <div className="item-actions">
        <button onClick={() => setIsEditing(true)}>Editar</button>
        <button onClick={() => onDeleteItem(index)}>Eliminar</button>
      </div>
    </li>
  );
}

export default Item;