import React from 'react'
import {MenuItem} from "rmwc";
import {GET_CATEGORIES} from '../../Api'
const CategoryList =({setData, handleSearchToCategory})=>{
    const [categories, setCategories] = React.useState([])
    const getCategory = async ()=> {
        try {
            const token = window.localStorage.getItem('token')
            const {url, options} = GET_CATEGORIES(token, {total:0, perPage:0, page:1, lastpage:0})
            const response = await fetch(url, options)
            if(!response.ok) throw new Error(`Error: ${response.statusText}`)
            const {categories} = await response.json()
            console.log(categories)
            setCategories(categories)
        } catch (error) {
            console.log(error)
        }
    }

    React.useEffect(()=>{
        getCategory()
    },[])
    
    return(
        <>
        {categories.map(category=>{
            
            return(
                <MenuItem onClick={handleSearchToCategory} id={category.id} key={category.id}>{category.name}</MenuItem>
            )
        })}
        
        </>
    )
}

export default CategoryList