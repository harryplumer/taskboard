import axios from 'axios'

//getAllCategories
export const getCategories = () => {
  //thunk
  return(dispatch) => {
    axios.get('/api/categories')
      .then( res => dispatch({type: 'CATEGORIES', categories: res.data}))
  }
}

//AddCatgeory
export const addCategory = (category) => {
  return(dispatch) => {
    axios.post('/api/categories', {category})
      .then( res => dispatch({ type: 'ADD CATEGORY', categories: res.data }))
  }
}

//EditCategory
export const updateCategory = (category) => {
  return(dispatch) => {
    axios.put(`/api/categories/${category.id}`, {category})
      .then(res => dispatch({type: 'UPDATE CATEGORY', category: res.data}))
  }
}

//DeleteCategory
export const deleteCategory = (id) => {
  return(dispatch) => {
    axios.delete(`/api/categories/${id}`)
      .then(res => dispatch({type: 'DELETE CATEGORY', categories: res.data}))
  }
}
