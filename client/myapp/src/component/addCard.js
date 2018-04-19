import React, { Component } from 'react';
import {addNewTaskHelper} from '../component/helper';
import PropTypes from 'prop-types';
import {partial} from '../lib/utils';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';


class AddtoCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    }
    this.onChange = this.onChange.bind(this);
    this.addNewTask = this.addNewTask.bind(this);
  }
  onChange (e) {
    this.setState({value: e.target.value});
  }
  addNewTask (e, callback) {
    e.preventDefault();
    this.setState({
      value:''
    });
    // const isAddMutation = true;
    const { taskHead } = this.props.task;
    const task = {
      taskHead:taskHead, 
      // id: newListId, 
      taskName:this.state.value, 
      isAddMutation: 'ADD_VALUE'
    }
    this.props.mutate({variables: { 
      taskHead:task.taskHead, 
      taskName: task.taskName, 
      isAddMutation: task.isAddMutation  
    }}).then(({data}) => {
      callback();
    }).catch((error) => {
      console.log(`There is an error. ${error}`)
    });
  }
  render() {
    const getIndex = this.props.list.findIndex((list) => list.taskId === this.props.task.taskId);
    const addUpdatedTask = addNewTaskHelper(this.props.task, this.state.value, getIndex);
    const handleAdd =  partial(this.props.handleAdd, addUpdatedTask);
    return(
      <div className={"" + (this.props.isActive ? 'add-card-popup' : '')}>
        {!this.props.isActive && <a href="javscript:void(0)" className="add-card" onClick={this.props.onClick}>Add a card...</a>}
        {this.props.isActive && 
        <form method="POST">
          <textarea 
            onChange={this.onChange}
            value={this.state.value} />
          <button type="button" className="add-button" 
            onClick={(e) => { this.addNewTask(e, handleAdd) }}>Add</button>
          <button type="button" className="cancel-button" onClick={this.props.onClick} >Cancel</button>
        </form>}
      </div>
    )
  }
}

AddtoCard.propTypes = {
  handleAdd:PropTypes.func.isRequired,
  mutate: PropTypes.func.isRequired,
  textVal:PropTypes.string.isRequired
}

const ADD_TASK_BOARD = gql`
  mutation AddUpdateBoard($taskHead: String!, $taskName: String!, $isAddMutation: String!) {
    AddupdateTaskBoard(
      taskHead: $taskHead, 
      isAddMutation: $isAddMutation,
      listItems: { 
          taskName: $taskName  
      }){
        taskId
        taskHead
        listItems {
          listId
          taskName
        }
      }
  }
`;

const AddItemWithMutation = graphql(ADD_TASK_BOARD)(AddtoCard);

export default AddItemWithMutation;