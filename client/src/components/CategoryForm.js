import React from 'react';
import { connect } from 'react-redux';
import {Modal, Form, Button, Icon} from 'semantic-ui-react'
import {updateCategory, addCategory} from '../actions/categories'

class CategoryForm extends React.Component{

state = {category: {name: ""}, editing: false, modalOpen: false}

  handleChange = (e) => {
    const newName = e.target.value
    this.setState({ category: {...this.state.category, name: newName }})
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const {dispatch} = this.props
    const {category} = this.state
    if (this.state.editing === false)
      dispatch(addCategory(category))    
    else
      dispatch(updateCategory(category))
    this.setState({category: {name: "", id: 0}, modalOpen: false})
  }

  handleOpen = () => {
    if (this.props.editing)
      this.setState({category: this.props.category, editing: true})
    
    this.setState({ modalOpen: true })
  }

  render(){
    const {category} = this.state 
    const {editing} = this.props
    return(
      <Modal
      trigger={editing ?  <span style={{cursor: 'pointer'}} onClick={this.handleOpen}>
              <Icon name='edit' size='large' />
              </span> :
      <Button primary onClick={this.handleOpen}>Add New Category</Button>  }
      open={this.state.modalOpen}
      >
        <Modal.Header>
          {editing ? "Edit Category" : "Add Category"}
        </Modal.Header>
        <Modal.Content>
          <Form onSubmit={this.handleSubmit}>
            <Form.Input
              required
              label="Name"
              value={category.name}
              onChange={this.handleChange}
              width={16}
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


export default connect()(CategoryForm)