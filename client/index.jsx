import ReactDOM from 'react-dom';
import React from 'react';
import ToDoList from './components/ToDoList.jsx';

require("./scss/style.scss");
ReactDOM.render(<ToDoList />, document.getElementById('App'));
