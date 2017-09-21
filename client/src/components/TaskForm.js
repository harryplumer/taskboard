import React from 'react';
import {connect} from 'react-redux'
import {addTask, updateTask} from '../actions/tasks'
import {Modal, Form, Button, Icon} from 'semantic-ui-react'

class TaskForm extends React.Component{

state = {task: {title: "", due_date: "", color: "None", description: ""}, 
              day: "", month: "", year: "", editing: false, modalOpen: false}

handleChange = (propertyName) => (event) => {
  let newVal 
  
  if (propertyName === "day" || propertyName === "month" || propertyName === "year")
    this.setState({[propertyName]: event.target.value})
  else {
    if (propertyName === "color")
      newVal = event.target.innerText
    else
      newVal = event.target.value
    const oldTask  = this.state.task
    const newTask = {
      ...oldTask,
      [propertyName]: newVal
    };
    this.setState({ task: newTask })
  }
}

  handleSubmit = (e) => {
    e.preventDefault()
    const {dispatch} = this.props
    let {task} = this.state
    const {year, month, day} = this.state
    task.due_date = `${year}-${month}-${day}`
    task.category = this.props.category
    if (this.state.editing === false)
      dispatch(addTask(task))
    else
      dispatch(updateTask(task))   
    
    this.setState({task: {title: "", due_date: "", color: "", category: "", description: ""}, 
                  month: "", day: "", year: "", modalOpen: false})
  }

  handleOpen = () => {
  if (this.props.editing){
    let {task} = this.props 
    let dateStr = task.due_date.split("-")
    let year = dateStr[0]
    let month = dateStr[1]
    let day = dateStr[2]
    this.setState({task: this.props.task, editing: true, year, month, day, })
  }
    this.setState({ modalOpen: true })
  }

 

  render(){
    const {task} = this.state 
    const {editing} = this.props
    const colorOptions = [
      { key: 'None', text: "None", value: "None"},
      { key: 'Yellow', text: 'Yellow', value: 'Yellow' },
      { key: 'Green', text: 'Green', value: 'Green' },
      { key: 'Red', text: 'Pink', value: 'Pink'},
      { key: 'Pink', text: 'Pink', value: 'Pink'}
    ]
    return(
      <Modal
      trigger={editing ?  
              <span style={{cursor: 'pointer'}} onClick={this.handleOpen}>
              <Icon name='edit' size='small' />
              </span> :
              <span style={{cursor: 'pointer'}} onClick={this.handleOpen}>
              <Icon name='add' size='large' />
              </span>  }
      open={this.state.modalOpen}
      >
        <Modal.Header>
          {editing ? "Edit Task" : "Add A Task"}
        </Modal.Header>
        <Modal.Content>
          <Form onSubmit={this.handleSubmit}>
            <Form.Group>
              <Form.Input
                required
                label="Title"
                value={task.title}
                onChange={this.handleChange("title")}
                width={10}
              />
              <Form.Input
                required
                label="Month"
                value={this.state.month}
                onChange={this.handleChange("month")}
                width={2}
              />
              <Form.Input
              required
                label="Day"
                value={this.state.day}
                onChange={this.handleChange("day")}
                width={2}
              />
              <Form.Input
              required
                label="Year"
                value={this.state.year}
                onChange={this.handleChange("year")}
                width={2}
              />
            </Form.Group>
            <Form.Group>
            <Form.Select 
              label='Color' 
              options={colorOptions}
              value={task.color}
              onChange={this.handleChange("color")}
              width={8}
            />
            </Form.Group>
          <Form.TextArea label="Description" 
            value={task.description}
            onChange={this.handleChange("description")} 
            placeholder="Add a description..." 
          />
          <Form.Button color='green' inverted>
          {editing ? "Save" : "Submit"}
        </Form.Button>
        </Form>
        <Button color='red' inverted onClick={() => {this.setState({modalOpen: false})}}>
          Cancel
        </Button>
      </Modal.Content>
    </Modal>
    )
  }
}

const mapStateToProps = (state) => {
  return{categories: state.categories}
}

export default connect(mapStateToProps)(TaskForm)