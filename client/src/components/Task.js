import React from 'react'
import {Card, Icon} from 'semantic-ui-react'
import TaskForm from './TaskForm'
import {connect} from 'react-redux'
import {deleteTask} from '../actions/tasks'
//import {dateFormat} from 'dateformat'

const showDate = (rawDate) => {
  var dateFormat = require('dateformat');
  return dateFormat(rawDate, "mmm d yy")
}


const Task = (props) => {
  const {task, dispatch} = props
  return(
    <Card color={task.color.toLowerCase()} style={{textAlign: "left"}}>
      <Card.Content>
      <Card.Header style={{textAlign: "left"}}>
        <TaskForm task={task} editing={true} />
        <span style={{cursor: 'pointer'}} onClick={() => dispatch(deleteTask(task.id))}>
          <Icon name='remove' size='small' />
        </span>
        <br />
        {task.title}
      </Card.Header>
      <Card.Meta>
      <Icon name='time' size='medium' />{showDate(task.due_date)}
      </Card.Meta>
      <Card.Description >{task.description}</Card.Description>
    </Card.Content>
  </Card>
  ) 
}

export default connect()(Task)
