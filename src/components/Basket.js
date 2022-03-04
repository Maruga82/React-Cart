import { React, useState } from 'react';
import { FaPlusCircle, FaMinusCircle, FaArrowsAltV } from 'react-icons/fa';
import { Link } from "react-router-dom";

//Gestione del carrello, stessa logica che c'è in app per il local storage e per l'Add nel carrello
//funzione getTotal per il totale degli oggetti nel carrello e la somma totale
const Basket = () => {
    const itemFromStorage = localStorage.getItem('cartStorage');
    const initialCartItem = itemFromStorage ? JSON.parse(itemFromStorage) : [];
    const [cartItems, setCartItems] = useState(initialCartItem);
    const countCartItems = cartItems.length;
    const getTotal = () => {
        return cartItems.reduce((result, product) => {
            result.pieces += product.currentQty;
            result.price += product.price * product.currentQty;
            return result;
        }, { price: 0, pieces: 0 })
    }
    //stessa logica di aggiunta al carrello, in più c'è la funzione onRemove per rimuovere dal carrello con metodo splice se c'è un prodotto solo nel carrello
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
    const onRemove = (product) => {
        const itemIndex = cartItems.findIndex(x => x.id === product.id && x.selectedSize === product.selectedSize);
        if (cartItems[itemIndex].currentQty >= 2) {
            cartItems[itemIndex].currentQty -= 1;
            setCartItems([...cartItems]);
        } else {
            cartItems.splice(itemIndex, 1);
            setCartItems([...cartItems]);
        }
    }

    // Tabella per la visualizzazione del carrello, all'interno della quale ciclo cartItems per i prodotti aggiunti
    // Il button per il remove e per l'add sono dinamici per non rompere il carrello e gestire l'aggiunta e la rimozione dei prodotti (riga 72 in giù)
    //
    return (
        <section>
            <div className='block col-2'>
                <h1 className="text-center m-bottom">STORE LOGO</h1>
            </div>
            <div className='row border-bottom'>
                <h2>CART</h2>
            </div>
            <div className='cart-box m-top'>
                <div className='row m-bottom'>
                    <h3>YOUR CART CONTAINS:</h3>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Model <FaArrowsAltV /></th>
                            <th>SKU</th>
                            <th>Size</th>
                            <th>Qty</th>
                            <th className='last-td'>Price <FaArrowsAltV /></th>
                        </tr>
                    </thead>
                    <tbody>
                        {cartItems.map((item, index) => (
                            <tr key={index}>
                                <td>
                                    <div className='flex-table'>
                                        {item.name}
                                        <button onClick={() => onRemove(item)} className="remove">Remove <FaMinusCircle /></button>
                                    </div>
                                </td>
                                <td>{item.code}</td>
                                <td>{item[item.selectedSize].label}</td>
                                <td>
                                    <div className='flex-table'>
                                        {item.currentQty || 0}
                                        {item.currentQty < item[item.selectedSize].quantity &&
                                            <button onClick={() => onAdd(item)} className="add">Add <FaPlusCircle /></button>
                                        }
                                    </div>
                                </td>
                                <td className='last-td'>{item.price}</td>
                            </tr>
                        ))}
                        <tr className='last-tr'>
                            <td></td>
                            <td></td>
                            <td ></td>
                            <td></td>
                            <td className='last-td'></td>
                        </tr>
                    </tbody>
                </table>
                <div className='row end'>
                    <div className='col-1'>
                        <p>Total pieces: <strong>{getTotal().pieces}</strong></p>
                    </div>
                </div>
                <div className='row end'>
                    <div className='col-1'>
                        <p>Total price: <strong>€ {getTotal().price}</strong></p>
                    </div>
                </div>
            </div>
            <div className='row block col-2'>
                <footer className='row cart-box footer'>
                    <div>
                        <p className='p-footer'>{countCartItems} product added</p>
                    </div>
                    <div>
                        <Link to="checkout" className='btn-cart'>Checkout</Link>
                    </div>
                </footer>
            </div>
        </section>
    )
}
export default Basket;