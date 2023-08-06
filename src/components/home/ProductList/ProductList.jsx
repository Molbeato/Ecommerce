import './ProductList.css'
import { useProducts } from '../../../hooks/queries/useProducts'

import ProductCard from '../ProductCard/ProductCard'


const ProductList = ({ categories, title, excludeIds = [] }) => {
  const {data, isLoading, isError} = useProducts(categories, title);

  if (isLoading) return <p>Loading products...</p>

  if (isError) return <p>Something went wrong!</p>

  return (
    <ul className='product-list'>
      {data
      .filter((product) => !excludeIds.includes(product.id))
      .map((product) => (
        <li key={product.id} className='product-list__item'>
          <ProductCard product={product}/>
        </li>
      ))}
    </ul>
  )
}

export default ProductList
