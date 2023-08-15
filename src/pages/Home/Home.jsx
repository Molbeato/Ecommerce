import './Home.css';

import ProductList from '../../components/home/ProductList/ProductList';
import CategoriesFilter from '../../components/home/CategoriesFilter/CategoriesFilter';
import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { Form, useLoaderData, useSubmit } from 'react-router-dom';

const Home = () => {
  const formId = useId();
  const submit = useSubmit();
  const formRef = useRef();
  const { categories, title } = useLoaderData();
  const [titleValue, setTitleValue] = useState(title);

  const handleChangeCategories = useCallback(() => {
    if (!formRef.current) return;

    submit(formRef.current)
  }, [submit]);

  useEffect(() => {
    setTitleValue(title);
  }, [title]);
  

  return (
    <div className='home-container'>
      <aside>
        <CategoriesFilter
          formId={formId}
          onChangeCategories={handleChangeCategories}
          initialCategory={categories}
          />
      </aside>

      <section >
        <Form id={formId} ref={formRef}>
          <input
          className='search-bar'
          type="search"
          name='title'
          value={titleValue}
  
          onChange={(e) => setTitleValue(e.target.value)}
          placeholder='What are we looking for you today?'/>
     
        </Form>
        <ProductList categories={categories} title={title}/>
      </section>
    </div>
  )
}

export default Home
