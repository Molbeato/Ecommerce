import { Link, useNavigate } from 'react-router-dom';
import './ProductCard.css'
import { useAddProductToCart } from '../../../hooks/queries/useAddProductToCart';
import { useSelector } from 'react-redux';
import { useCart } from '../../../hooks/queries/useCart';

const ProductCard = ({ product }) => {
  const { mutate } = useAddProductToCart();
  const { data, isLoading } = useCart()
  const isLogged = useSelector(store => store.auth.isLogged)
  const navigate = useNavigate();

  const isProductInCart= data?.some(
    (cartProduct) => cartProduct.productId === product.id
  );

  const isAddVisible = !isLogged || !isProductInCart

  const handleAdd = (e) => {
    e.preventDefault();

    if (!isLogged) navigate('/login');
    else mutate({ quantity: 1, productId: product.id })
  }
  
  return (
  <Link to={`/product/${product.id}`} className='link'>
    <article className='product-cart'>
        <header className='product-cart__header'>
            <div className='product-cart__container-img'>
                <img
                src={product.images[0]?.url}
                alt={product.title + 'image 1'}
                className='product-cart__img product-cart__container-img--visible'
                />
                <img
                src={product.images[1]?.url}
                alt={product.title + 'image 2'}
                className='product-cart__img product-cart__container-img--hidden'
                />
            </div>
            <hr />

        </header>

        <h2 className='product-card__name'>{product.title}</h2>
        <h3 className='product-card__brand'>{product.brand}</h3>
            

            

  
        <section className='product-cart__body'>
            <h3 className='product-cart__title'>Price:</h3>
            <p className='product-cart__price'><em>${product.price}</em></p>
        </section>

        {isAddVisible && (
          <button
            className='product-cart__btn'
            onClick={handleAdd}
            disabled={isLoading}
          >
            <i className='bx bx-cart-download'></i>
          </button>
        )}
          
        {!isAddVisible && <p className='product-cart-in__btn'>Already in Cart</p>}

    </article>
  </Link>
  )
}

export default ProductCard
