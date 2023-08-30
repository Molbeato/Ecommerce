import './ProductDetail.css'
import { useNavigate, useParams } from 'react-router-dom'
import { useProductById } from '../../hooks/queries/useProductById'
import ProductList from '../../components/home/ProductList/ProductList';
import { useEffect, useState } from 'react';
import { useAddProductToCart } from '../../hooks/queries/useAddProductToCart';
import { useSelector } from 'react-redux';
import { useCart } from '../../hooks/queries/useCart';
import { InfinitySpin } from 'react-loader-spinner';

const ProductDetail = () => {
    const navigate = useNavigate();
    const cartQuery = useCart();
    const { productId } = useParams();
    const isLogged = useSelector(store => store.auth.isLogged)
    const { mutate } = useAddProductToCart();
    const { data, isLoading, isError, error } = useProductById(productId)

    const isProductInCart = 
        cartQuery.data?.some((cartProduct) => cartProduct.productId === data?.id
      ) ?? false;
   
    const quantityInCart = 
        cartQuery.data?.find((cartProduct) => Number(cartProduct.productId) === Number(productId)
    )?.quantity ?? 1;

    const [quantity, setQuantity] = useState(Number(quantityInCart));

    const increment = () => {
        const newQuantity = quantity + 1 
        const stock = 15
        if (newQuantity <= stock) setQuantity(newQuantity)
    };

    const decrease = () => {
        const newQuantity = quantity - 1 
        if (newQuantity >= 1) setQuantity(newQuantity);
    };

    const handleAddCart = () => {
        if (isLogged) mutate({ quantity, productId });
        else navigate('/login')
    };

    useEffect(() => {
      setQuantity(Number(quantityInCart));
    }, [quantityInCart])
    

    if (isLoading) return <div className='detail-loader'> 
    <InfinitySpin 
color="rgb(143, 98, 169)"
/></div>

    if (isError) return <p>{error.message ?? 'Something went wrong!'}</p>

    return (
    <section>
        <section>
            <div className='image-container'>
                <img src={data.images[1]?.url} alt={data.tittle} />  
            </div>

            <div className='info-container'>
                <h3 className='product-brand'>{data.brand}</h3>
                <h2>{data.title}</h2>

                <p>{data.description}</p>
                
                <div>
                    <div>
                        <h3>Price</h3>
                        <p>
                            <em>$ {data.price}</em>
                        </p>
                    </div>
                    

                    <div>
                        <h3>Quantity</h3>

                        <div className='cart-product__controls'>
                            <button className='cart-product__btn' onClick={decrease }>-</button>
                            <span>{quantity}</span>
                            <button className='cart-product__btn' onClick={increment}>+</button>
                        </div>
                    </div>
                </div>

                {!isProductInCart && (
                    <button onClick={handleAddCart}>Add to cart</button>
                )}

                {isProductInCart && <button>Update in cart</button>}
            </div>
        </section>

        <ProductList categories={data.categoryId} excludeIds={[data.id]}/>
    </section>
  )
}

export default ProductDetail
