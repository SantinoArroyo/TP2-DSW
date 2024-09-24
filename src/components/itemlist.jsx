import React from 'react';
import Item from './Item';

function ItemList({ items, onUpdateItem, onDeleteItem, onMoveCompletedToEnd }) {
  const completedItems = items.filter((item) => item.completed);
  const incompleteItems = items.filter((item) => !item.completed);

  return (
    <div className="item-list-container">
      <div className="incomplete-items">
        <h2>Items por comprar</h2>
        <ul>
          {incompleteItems.map((item, index) => (
            <Item
              key={index}
              item={item}
              index={index}
              onUpdateItem={onUpdateItem}
              onDeleteItem={onDeleteItem}
              onMoveCompletedToEnd={onMoveCompletedToEnd}
            />
          ))}
        </ul>
      </div>
      <div className="completed-items">
        <h2>Items comprados</h2>
        <ul>
          {completedItems.map((item, index) => (
            <Item
              key={index}
              item={item}
              index={index + incompleteItems.length} // Ajustar el índice
              onUpdateItem={onUpdateItem}
              onDeleteItem={onDeleteItem}
              onMoveCompletedToEnd={onMoveCompletedToEnd}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ItemList;