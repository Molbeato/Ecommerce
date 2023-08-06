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
  <Link to={`/product/${product.id}`}>
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

            <h3 className='product-cart__title'>{product.brand}</h3>
            <h2 className='product-cart__title'>{product.title}</h2>
        </header>

        <section className='product-cart__body'>
            <h3 className='product-cart__title'>Price</h3>
            <p className='product-cart__paragraph'><em>$ {product.price}</em></p>
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
          
        {!isAddVisible && <p>You already have this product in your cart</p>}

    </article>
  </Link>
  )
}

export default ProductCard
