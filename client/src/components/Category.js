import React from 'react';
import { connect } from 'react-redux';
import {Header, Card, Icon} from 'semantic-ui-react'
import {deleteCategory} from '../actions/categories'
import CategoryForm from './CategoryForm'
import TaskForm from './TaskForm'
import Task from './Task'

class Category extends React.Component{
  
  render(){
    const {tasks} = this.props
    const {category} = this.props
    return(
      <div style={{textAlign: "center"}}>
        <div style={{textAlign: "left"}}>
          <TaskForm category={category.id} editing={false} />
          <CategoryForm category={category} editing={true} />
          <span style={{cursor: 'pointer'}} onClick={ () => this.props.dispatch(deleteCategory(category.id)) }>
              <Icon name='remove' size='large' />
          </span>
        </div>
        <Header as="h2" textAlign="center">{category.name}</Header>
        
        <Card.Group style={{marginTop: "10px"}}>
          {tasks.map(task => <Task key={task.id} task={task} />)}
        </Card.Group>
      </div>
    )
  }

} 

const mapStateToProps = (state, props) => {
  let tasks = state.tasks.filter( t => t.category.id === props.category.id)
  return { tasks }
}

export default connect(mapStateToProps)(Category)