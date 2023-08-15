import { useSelector } from 'react-redux'
import { useCart } from '../../../hooks/queries/useCart'
import { useCreatePurchase } from '../../../hooks/queries/useCreatePurchase'
import CartProduct from '../CartProduct/CartProduct'
import './Cart.css'

const Cart = ({ isVisible }) => {
  const isLogged = useSelector(store => store.auth.isLogged);
  const { data, isLoading, isError, error } = useCart()
  const createPurchaseMutation = useCreatePurchase();

  const reducer = (sum, cartProduct) => {
    const quantity = Number(cartProduct.quantity);
    const price = Number(cartProduct.product.price);
    return sum + quantity * price;
  };

  const total = data?.reduce(reducer, 0) ?? 0


    const toggleCart = isVisible 
    ? "wrapper-cart"
    : "wrapper-cart wrapper-cart--hidden"

    const handleCheckOut = () => {
      if (isLogged) createPurchaseMutation.mutate();
    }

  if (isLoading) return 

  if (isError) return 

  return (
    <div className={toggleCart}>
        <aside className='cart'>
            <h2 className='cart__title'>Shopping Cart</h2>

            {!data.length && <p>Cart is empty</p>}
            {Boolean(data.length) && (
              <div className='cart__container-list'>
                <ul className='cart__list'>
                  {data.map((cartProduct) => (
                    <li key={cartProduct.id}>
                    <CartProduct cartProduct={cartProduct}/>
                    </li>
                  ))}
                </ul>

                <div>
                  <div>
                    <p>
                      <span>Total</span>
                      <em>$ {total.toFixed(2)}</em>
                    </p>

                    <button className='checkout' onClick={handleCheckOut} disabled={createPurchaseMutation.isLoading || isLoading}>Checkout </button>
                  </div>
                </div>
              </div>
            )}
        </aside>
    </div>
  )
}

export default Cart
