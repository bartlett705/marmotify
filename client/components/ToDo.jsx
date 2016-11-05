import React from 'react';

class ToDo extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    // const todoItemClass = this.props.todoObj.completed ? 'todo-item done-item' : 'todo-item';
    // const checkBoxState = this.props.todoObj.completed ? 'checked' : '';
    return (
      <li className='todo-item'>
         <span className='todo-tag'>{this.props.todoObj.tag}</span>
         <span className='todo-title' onClick={() => this.props.toggleComplete(this.props.todoObj._id)}>{this.props.todoObj.title}</span>
         <span className='todo-due'>{moment(this.props.todoObj.dueDate).fromNow()}</span>
         <span className='todo-added'>{moment(this.props.todoObj.addedDate).fromNow()}</span>
      </li>
      )
    }
  }
export default ToDo;
