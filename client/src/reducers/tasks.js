const tasks = (state = [], action) => {
  switch (action.type) {
    case 'TASKS':
      return action.tasks
    case 'ADD TASK':
      return [...state, action.task]
    case 'UPDATE TASK':
      return state.map( task => {
        if (task.id === action.task.id)
          return action.task 
        return task 
      })
    case 'DELETE TASK':
      return state.filter(task => task.id !== action.id)
    default:
      return state
  }
}

export default tasks