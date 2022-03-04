import Main from './components/Main';
import data from './data';
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
// Tutto il css è dentro index.css; ho gestito tutto con Flex e cercato, il più possibile, di usare valori univoci per tenere il codice asciutto
// Ho creato un mock dati (data.js) che ho messo dentro products,
// poi ho creato un local storage per avere un minimo di persistenza dati, in caso non ci fossero prodotti torna un array vuoto in modo da evitare errori
// a seguire la gestione del carrello con un hook useState
// countCartItems gestisce la quantità di prodotti nel carrello che verrà visualizzata nel footer

const App = () => {
  const { products } = data;
  const itemFromStorage = localStorage.getItem('cartStorage');
  const initialCartItem = itemFromStorage ? JSON.parse(itemFromStorage) : [];
  const [cartItems, setCartItems] = useState(initialCartItem);
  const countCartItems = cartItems.length;

  // logica di aggiunta prodotti al carrello, ciclo con findIndex nel mock, chiave id && la taglia selezionata per la select e per prodotti diversi a carrello
  // aggiunge 1 se non ci sono prodotti nel carrello
  // altrimenti aggiunge 1 se non ci sono prodotti simili (l'if dentro l'else per evitare che il carrello si rompa)
  const onAdd = (product) => {
    const itemIndex = cartItems.findIndex(x => x.id === product.id && x.selectedSize === product.selectedSize);
    if (itemIndex < 0) {
      setCartItems([...cartItems, { ...product, currentQty: 1 }])
    } else {
      if (cartItems[itemIndex].currentQty === product[product.selectedSize].quantity) {
        return;
      }
      cartItems[itemIndex].currentQty += 1;
      setCartItems([...cartItems]);
    }
  }
  //useEffect per aggiornare il carrello ogni volta che cartItems viene modificato
  useEffect(() => {
    localStorage.setItem('cartStorage', JSON.stringify(cartItems))
  }, [cartItems])
  return (
    <div className="App">
      <section>
        <div className='block col-2'>
          <h1 className="text-center m-bottom">STORE LOGO</h1>
        </div>
        <div className='internal-row products-title'>
          <h2 className=''>
            LAST PRODUCTS AVAILABLE
          </h2>
        </div>
        <div className='row'>
          <Main onAdd={onAdd} products={products} cartItems={cartItems} />
        </div>
        <div className='row block col-2'>
          <footer className='row cart-box footer'>
            <div>
              <p className='p-footer'>{countCartItems} product added</p>
            </div>
            <div>
              <Link to="basket" className='btn-cart'>Go to Cart</Link>
            </div>
          </footer>
        </div>
      </section>
    </div>
  );
}

export default App;
