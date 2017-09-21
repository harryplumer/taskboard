import axios from 'axios'

//getAllTasks
export const getTasks = (category_id) => {
  //thunk
  return(dispatch) => {
    axios.get(`/api/tasks`)
    .then( res => dispatch({type: 'TASKS', tasks: res.data}))
  }
}

//AddTask
export const addTask = (task) => {
  return(dispatch) => {
    axios.post(`/api/tasks`, {task})
      .then( res => dispatch({ type: 'ADD TASK', task: res.data }))
  }
}

//EditTask
export const updateTask = (task) => {
  return(dispatch) => {
    axios.put(`/api/tasks/${task.id}`, {task})
      .then(res => dispatch({type: 'UPDATE TASK', task: res.data}))
  }
}

//DeleteTask
export const deleteTask = (id) => {
  return(dispatch) => {
    axios.delete(`/api/tasks/${id}`)
      .then(res => dispatch({type: 'DELETE TASK', id}))
  }
}
