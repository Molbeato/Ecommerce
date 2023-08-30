import { useState } from 'react'
import './CartProduct.css'
import { useUpdateCart } from '../../../hooks/queries/useUpdateCart'
import { useSelector } from 'react-redux'
import { useDeleteProductFromCart } from '../../../hooks/queries/useDeleteProductFromCart'

const CartProduct = ({ cartProduct }) => {
    const initialQuantity = Number(cartProduct.quantity)
    const price = Number(cartProduct.product.price)
    const { isLoading, mutate } = useUpdateCart();
    const  deleteMutation = useDeleteProductFromCart();
    const [quantity, setQuantity] = useState(initialQuantity)
    const isLogged = useSelector(store => store.auth.isLogged)

    const increment = () => {
        const newQuantity = quantity + 1 
        const stock = 15
        if (newQuantity <= stock) setQuantity(newQuantity)
    };

    const decrease = () => {
        const newQuantity = quantity - 1 
        if (newQuantity >= 1) setQuantity(newQuantity);
    };

    const handleUpdate = () => {
        if (isLogged) mutate ({ cartProductId: cartProduct.id, newQuantity: quantity});
    }

    const handleDelete = () => {
        if (isLogged) deleteMutation.mutate(cartProduct.id);
    }

  return (
    <article className='cart-product'>
        <div className='cart-product__img'>
            <img
            src={cartProduct.product.images[1]?.url}
            alt={cartProduct.product.title}
            />
        </div>


        <div className='cart-product__detail'>
            <header className='cart-product__header'>
                <h4 className='cart-product__title'>{cartProduct.product.title}</h4>
                   
            </header>
        
        
        <div>
            <div className='cart-product__controls'>
                <button onClick={decrease} className='cart-product__btn'>-</button>
                <span>{quantity}</span>
                <button onClick={increment} className='cart-product__btn'>+</button>
                 <button
                    className='cart-product__trash'
                    onClick={handleDelete}
                    disabled={deleteMutation.isLoading}
                    >
                        <i className='bx bx-trash'></i>
                    </button>
                
            </div>
            

            {initialQuantity != quantity && (
                <button onClick={handleUpdate} disabled={isLoading}>
                Update Cart
                </button>
            )}
        </div>

        <div>
            <h5>Total:</h5>
            <p><em>$ {initialQuantity * price}</em></p>
        </div>
        <hr />
        </div>
    </article>
  )
}

export default CartProduct
