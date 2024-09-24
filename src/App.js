import React, { useState } from 'react';
import ItemList from './components/itemlist';
import InputArea from './components/Item_entrada';

import { ChromePicker } from 'react-color';
import './styles/App.css';

function App() {
  const [lists, setLists] = useState([
    { name: 'Lista 1', items: [], color: 'blue', showColorPicker: false },
  ]);
  const [activeListIndex, setActiveListIndex] = useState(0);

  const addList = () => {
    setLists([
      ...lists,
      {
        name: `Lista ${lists.length + 1}`,
        items: [],
        color: 'blue',
      },
    ]);
    setActiveListIndex(lists.length);
  };

  const addItem = (newItem) => {
    if (lists.length === 0) {
      alert('¡Crea una lista primero!');
      return;
    }

    const updatedLists = [...lists];
    updatedLists[activeListIndex].items.push(newItem);
    setLists(updatedLists);
  };

  const updateItem = (index, updatedItem) => {
    const updatedLists = [...lists];
    updatedLists[activeListIndex].items[index] = updatedItem;
    setLists(updatedLists);
  };

  const deleteItem = (index) => {
    const updatedLists = [...lists];
    updatedLists[activeListIndex].items.splice(index, 1);
    setLists(updatedLists);
  };

  const moveCompletedToEnd = () => {
    const updatedLists = [...lists];
    const completedItems = updatedLists[activeListIndex].items.filter(
      (item) => item.completed
    );
    const incompleteItems = updatedLists[activeListIndex].items.filter(
      (item) => !item.completed
    );
    updatedLists[activeListIndex].items = [...incompleteItems, ...completedItems];
    setLists(updatedLists);
  };

  const deleteActiveList = () => {
    if (
      window.confirm(
        `¿Estás seguro de que quieres eliminar la lista "${lists[activeListIndex].name}"?`
      )
    ) {
      const updatedLists = lists.filter((_, i) => i !== activeListIndex);
      setLists(updatedLists);

      
      if (updatedLists.length === 0) {
        
        setActiveListIndex(0);
      } else if (activeListIndex >= updatedLists.length) {
        
        setActiveListIndex(updatedLists.length - 1);
      }
    }
  };

  const clearActiveList = () => {
    if (
      window.confirm(
        `¿Estás seguro de que quieres limpiar la lista "${lists[activeListIndex].name}"?`
      )
    ) {
      const updatedLists = [...lists];
      updatedLists[activeListIndex].items = updatedLists[
        activeListIndex
      ].items.filter((item) => item.completed);
      setLists(updatedLists);
    }
  };

  const updateListColor = (index, newColor) => {
    const updatedLists = [...lists];
    updatedLists[index].color = newColor.hex;
    setLists(updatedLists);
  };

  const toggleColorPicker = (index) => {
    setLists(prevLists => prevLists.map((list, i) => 
      i === index ? { ...list, showColorPicker: !list.showColorPicker } : list
    ));
  };

  return (
    <div className='App'>
      <h1>Lista de compras</h1>
      <div className='tabs'>
        {lists.map((list, index) => (
          <div key={index} className='tab-container'>
            <button
              className={`tab ${index === activeListIndex ? 'active' : ''}`}
              style={{ backgroundColor: list.color }}
              onClick={() => {
                setActiveListIndex(index);
                toggleColorPicker(index);
              }}
            >
              {list.name}
            </button>

            {/* Condicional para mostrar ChromePicker */}
            {list.showColorPicker && ( 
              <div className="color-picker-container">
                <ChromePicker
                  color={list.color}
                  onChange={(color) => updateListColor(index, color)}
                />
              </div>
            )}

          </div>
        ))}
        <button className='add-tab' onClick={addList}>
          +
        </button>
      </div>
      <InputArea onAddItem={addItem} />

    
      {lists.length > 0 ? (
        <ItemList
          items={lists[activeListIndex].items}
          onUpdateItem={updateItem}
          onDeleteItem={deleteItem}
          onMoveCompletedToEnd={moveCompletedToEnd}
          onClearList={clearActiveList}
        />
      ) : (
        <p>No hay listas creadas. ¡Añade una nueva lista!</p>
      )}

      {lists.length > 0 && (
        <button className='delete-list-button' onClick={deleteActiveList}>
          Eliminar lista
        </button>
      )}
    </div>
  );
}

export default App;