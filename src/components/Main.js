import React from 'react';
import Product from '../Product';

// Componente che gestisce nella home la visualizzazione delle card
const Main = (props) => {
    const { products, onAdd, cartItems } = props;
    const getCartItem = (product) => {
        return cartItems.filter(x => x.id === product.id);
    }
    return (
        <section className='block col-2'>
            <div className='row'>
                {products.map((product) => (
                    <Product key={product.id} product={product} onAdd={onAdd} cartItem={getCartItem(product)} />
                ))}
            </div>
        </section>
    )
}

export default Main;