import React, { Component } from 'react'
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
// import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import PropTypes from 'prop-types';


class Dialogue extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputVal: props.data['listItems'][props.index].taskName,
      startDate: moment(this.props.date)
    }
    this.handleChange = this.handleChange.bind(this);
    this.onChange = this.onChange.bind(this);
    this.saveData = this.saveData.bind(this);
  }
  handleChange(date) {
    this.setState({
      startDate: date
    });
  }
  onChange(e) {
    this.setState({
      inputVal:e.target.value
    });
  }
  saveData() {
    let listData = JSON.parse(JSON.stringify(this.props.data));
    const taskHead = listData.taskHead;
    const listId = listData.listItems[this.props.index].listId;
    const taskName = this.state.inputVal;
    
    listData.listItems[this.props.index].taskName = this.state.inputVal;
    this.props.mutate({variables: { taskHead, listId, taskName  }}).then(({data}) => {
      this.props.updateList(listData, this.props.itemIdx);
    }).catch((error) => {
      console.log(`There is an error. ${error}`)
    });
  }
  render() {
    return(
    <div className="task-dialog-container">
      {this.props.showDialogue && 
      <div className="model-wrapper" >
            <h1> Task title </h1>
            <div className="text-wrapper">
            <textarea 
                  value={this.state.inputVal}
                  onChange={this.onChange} rows="5"/>
            {/* {<span className="calender">
              <DatePicker
              selected={this.state.startDate}
              onChange={this.handleChange} />
              <i className="font-icons icon-calendar" />
              Due Date
            </span>} */}
            </div>
            <div className="button-wrapper">
              <button type="button" className="cancel-dialogue" onClick={this.props.hideModel}>Cancel</button>
              <button type="button" className="save-dialogue" onClick={this.saveData}>Save</button>
            </div>
          </div>
        }
    </div>
    )
  }
}

Dialogue.propTypes = {
  showDialogue:PropTypes.bool.isRequired,
  mutate: PropTypes.func.isRequired,
  hideModel:PropTypes.func.isRequired,
  data:PropTypes.object.isRequired
}

const UPDATE_TASK_BOARD = gql`
  mutation AddUpdateBoard($taskHead: String!, $listId:String, $taskName: String!) {
    AddupdateTaskBoard(taskHead: $taskHead, listItems: { listId: $listId, taskName: $taskName }) {
      taskId
      taskHead
      listItems {
        listId
        taskName
      }
    }
  }
`;

const UpdateItemWithMutation = graphql(UPDATE_TASK_BOARD)(Dialogue);


export default UpdateItemWithMutation; 