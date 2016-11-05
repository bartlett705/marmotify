import React from 'react';
import io from 'socket.io-client';
import ToDo from './ToDo';
import AddToDoBox from './AddToDo';

class ToDoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [
        {
          title: 'Fill out Scratch Project Form',
          dueDate: 'Nov 4',
          tag: 'CS admin',
          complete: 0,
        },
        {
          title: 'Fill out Scratch Project Form',
          dueDate: 'Nov 4',
          tag: 'CS admin',
          complete: 0,
        },
      ],
    }
  }
  componentWillMount() {
    console.log('Trying to connect socket...');
    this.socket = io.connect();
    this.socket.on('connect', () => {
      console.log('Guest Socket Id: ', this.socket.id);
      this.initSocket();
    });
  }
  handleSubmit(form, e) {
    const title = form.title.value;
    const tag = form.tag.value;
    const dueDate = form.dueDate.value;
    const newToDoObj = {
      title,
      tag,
      dueDate,
    };
    console.log('Emitting addToDo: ', newToDoObj);
    this.socket.emit('addToDo', newToDoObj);
    form.title.value = "";
    form.tag.value = "";
    form.dueDate.value = moment().add(2, 'days').format();
  }
  initSocket() {
    this.socket.on('newData', (newTodoObjs) => {
      console.log('New Data rec\'d:', newTodoObjs);
      this.setState({ todos: newTodoObjs })
    });
  }
  toggleComplete(todoId) {
    this.socket.emit('toggleComplete', todoId);
  }
  render() {
    const todos = this.state.todos.filter(todoObj => todoObj.completed === 0);
    const dones = this.state.todos.filter(todoObj => todoObj.completed === 1);
    const todoElements = todos.map((todoObj, idx) => <ToDo key={idx} todoObj={todoObj} toggleComplete={this.toggleComplete.bind(this)}/>);
    const doneElements = dones.map((todoObj, idx) => <ToDo key={-idx} todoObj={todoObj} toggleComplete={this.toggleComplete.bind(this)}/>);
    return (
      <div className="todo-list-container">
        <AddToDoBox handleSubmit={this.handleSubmit.bind(this)} />
        <ol className="todo-list">
          {todoElements}
        </ol>
        <h3>Done-Zo</h3>
        <ol className="done-list">
          {doneElements}
        </ol>
      </div>
    );
  }
}

export default ToDoList;
