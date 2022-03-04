import React from 'react'
import { Link } from "react-router-dom";

//Pagina semplice che simula il checkout, immaginando che solitamente si passa per delle API che permettono il pagamento su portali esterni
function Checkout() {
    return (
        <section>
            <div className='block col-2'>
                <h1 className="text-center m-bottom">STORE LOGO</h1>
            </div>
            <div className='internal-row products-title m-bottom'>
            </div>
            <div className='row cart-box text-center column p-total'>
                <div>
                    <h2>Thank you!</h2>
                </div>
                <div>
                    <h2>Your 3 products will be shipped soon</h2>
                </div>
                <div>
                    <button className='btn-cart'>Buy more</button>
                </div>
            </div>
            <div className='row block col-2'>
                <footer className='row cart-box footer'>
                    <div>
                        <Link to="/" className='btn-cart'>Buy more</Link>
                    </div>
                </footer>
            </div>
        </section>
    )
}

export default Checkout