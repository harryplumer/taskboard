import React from 'react'
import {Container, Grid, Header} from 'semantic-ui-react'
import CategoryForm from './CategoryForm'
import Category from './Category'
import {connect} from 'react-redux'
import {getCategories} from '../actions/categories'
import {getTasks} from '../actions/tasks'

class Home extends React.Component{
  
  componentDidMount(){
    this.props.dispatch(getCategories())
    this.props.dispatch(getTasks())
  }


  renderCategories = () => {
    const {categories} = this.props
    return (categories.map((cat) => {
      return(
      
        <Grid.Column width={4}> 
        <div style={{borderRadius: "6px",
                    padding: "20px", background: "#f2f3f4"}}>
          <Category key={cat.id} category={cat} />
        </div>
        </Grid.Column>
      )
    })
    )
  }


  render(){
    
    return (
      <Container>
        <Grid>
          <Grid.Row style={{textAlign: "center"}}>
            <Grid.Column width={16}>
              <Header as="h1" textAlign="center">Hank's Tasks</Header> 
              <CategoryForm />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            {this.renderCategories()}
          </Grid.Row>
        </Grid>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return { categories: state.categories, tasks: state.tasks}
}


export default connect(mapStateToProps)(Home)