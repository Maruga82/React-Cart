import React, { useState, useRef } from 'react';

// Componente che gestisce la card dei prodotti, inoltre gestisce anche la quantità dei prodotti selezionabili
// La funzione isDisabled disabilita il bottone add in caso il prodotto abbia raggiunto il numero massimo della quantità disponibile (nel return)
// La funzione handleSelectChange disabilita le select nel caso il prodotto abbia raggiunto il n. massimo e lo fa in concordanza con isDisabled() (nel return)
const Product = (props) => {
  const [isButtonDisabled, setButtonDisabled] = useState(true);
  const { product, onAdd, cartItem } = props;
  const isDisabled = (maxQuantity, productSize, cartItem) => {
    if (cartItem.length === 0) {
      return false;
    }
    const item = cartItem.find(item => item.selectedSize === productSize);
    if (!item) {
      return false;
    }
    return maxQuantity === item.currentQty;
  }

  const handleSelectChange = (e, product, cartItem) => {
    const productSize = e.target.value;
    const maxQuantity = product[productSize].quantity;
    const disabled = isDisabled(maxQuantity, productSize, cartItem);
    // console.log("valore", e.target.value);
    setButtonDisabled(disabled);
  }

  // Gestione dinamica dei testi, dei bollini e del css in generale delle card
  let quantity = product.qty;
  const texts = {
    0: "",
    1: "Last piece, buy it now!",
    2: "Last pieces available!",
    3: "Last pieces available!",
  }
  let last = false;
  if (quantity === 1) {
    last = true;
  }

  let qtyBadge = false;

  if (quantity < 4) {
    qtyBadge = true;
  }

  //useRef che gestisce il selected size nella select
  const selectRef = useRef();

  //Card dinamiche, il componente Main cicla nel mock, stampando a video tutte le card e in questo componente viene creata la singola card
  return (
    <div className='card'>
      <div className='row'>
        <span className={`badge ${last ? 'visible' : 'hidden'}`}>LAST</span>
        <span className={`badgeQty ${qtyBadge ? 'visible' : 'hidden'}`}>{product.qty}</span>
      </div>
      <div className='row border-bottom row-center'>
        <img className='small' src={product.image} alt={product.name} />
      </div>
      <div className='card-description'>
        <h3 className='card__title'>{product.name}</h3>
        <p className='p-small p-nomargin'>{product.code}</p>
        <div className='row'>
          <p className='p-small'>Qty: <strong>{product.qty}</strong></p>
          <p className='p-small red'>{texts[quantity]}</p>
        </div>
        <div>
          <p className='p-small'>Price: € <strong>{product.price}</strong></p>
        </div>
        <div>
          <div className='row m-top-10'>
            <form>
              <select aria-label="Sizes" name="size" defaultValue="true" ref={selectRef} onChange={e => {
                handleSelectChange(
                  e, product, cartItem
                )
              }}>
                <option disabled value={"true"}> Select size </option>
                <option
                  disabled={isDisabled(product.size1.quantity, "size1", cartItem)}
                  value="size1">{product.size1.label} ({product.size1.quantity} pcs)
                </option>
                <option
                  disabled={isDisabled(product.size2.quantity, "size2", cartItem)}
                  value="size2">{product.size2.label} ({product.size2.quantity} pcs)
                </option>
              </select>
            </form>
            <button
              disabled={isButtonDisabled}
              className='btn-add' onClick={() => onAdd({ ...product, selectedSize: selectRef.current.value })}>
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Product;
