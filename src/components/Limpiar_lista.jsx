import React from 'react';

 function LimpiarLista({ onClearList }) {
   return (
     <button className="limpiar-lista-button" onClick={onClearList}>
       Limpiar lista de productos por comprar
     </button>
   );
 }

 export default LimpiarLista;