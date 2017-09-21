const categories = (state = [], action) => {
  switch (action.type) {
    case 'CATEGORIES':
      return action.categories
    case 'ADD CATEGORY':
      return action.categories
    case 'UPDATE CATEGORY':
      return state.map( category => {
        if (category.id === action.category.id)
          return action.category 
        return category 
      })
    case 'DELETE CATEGORY':
      return action.categories
    default:
      return state
  }
}

export default categories