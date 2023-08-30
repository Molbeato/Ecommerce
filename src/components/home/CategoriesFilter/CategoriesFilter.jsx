import './CategoriesFilter.css'
import { useCategories } from '../../../hooks/queries/useCategories'
import { useEffect, useRef, useState } from 'react';
import { InfinitySpin } from 'react-loader-spinner';

const CategoriesFilter = ({ formId, onChangeCategories, initialCategory= [] }) => {
    const { data, isLoading, isError, error} = useCategories();
    const [categoryIdList, setCategoryIdList] = useState(initialCategory)
    const isFirstRender = useRef(true)

    const addIdToList = (categoryId) => {
      const listCopy = structuredClone(categoryIdList);
      listCopy.push(categoryId)

      const copyWithNoRepeats = Array.from(new Set(listCopy));

      if (copyWithNoRepeats.length === data.length) setCategoryIdList([])
      else setCategoryIdList(copyWithNoRepeats);
    };

    const removeIdFromList = (categoryId) => {
      const listWihNoId = categoryIdList.filter((id) => id != categoryId);
      setCategoryIdList(listWihNoId)
    };

    const handleChange = (isChecked, categoryId) => {
      if (isChecked) addIdToList(categoryId);
      else removeIdFromList(categoryId)
    };

    const handleEmpty = (isChecked) => {
      if (isChecked) setCategoryIdList([]);
    };

    useEffect(() => {
      if (isFirstRender.current) isFirstRender.current = false;
      else onChangeCategories();
    }, [categoryIdList, onChangeCategories])


    if (isLoading) return <div className='categories-loader'>
    <InfinitySpin 
  width='200'
  color="rgb(143, 98, 169)"
/></div>

    if (isError) return <p>{error.message ?? "Something went wrong!"}</p>

  return (
    <fieldset form={formId} className='categories-filter_container'>
        <legend>Categories</legend>
        <div>
            <input
            checked= {categoryIdList.length === 0}
            onChange={(e) => handleEmpty(e.target.checked)}
            type= "checkbox"
            name='categories'
            value= ""
            id='empty-category'
            />
            <label htmlFor="empty-category">All</label>

            {data.map(category => (
              <div key={category.id}>
                <input
                checked={categoryIdList.includes(category.id)}
                onChange={(e) => handleChange(e.target.checked, category.id)}
                type="checkbox"
                name='categories'
                value={category.id}
                id={category.id + "category"}
                form={formId}
                />
                <label htmlFor={category.id + "category"}>{category.name}</label>
              </div>
            ))}
        </div>
    </fieldset>
  )
}

export default CategoriesFilter
