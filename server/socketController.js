const db = require('./db');

function attachListeners(socket) {
  socket.on('toggleComplete', (todoId) => {
    console.log('Got a Request to toggle todo with ID: ', todoId);
    db.toggleComplete(todoId)
    .then((data) => {
      console.log('Got some Data back from dB: ', data);
      sendLatestData(socket);
    })
    .catch(err => console.log(err));
  });
  socket.on('addToDo', (newToDoObj) => {
    console.log('Got New Todo: ', newToDoObj);
    db.validateAndCommitPost(newToDoObj)
    .then((data) => {
      console.log('Got some Data back from dB: ', data);
      sendLatestData(socket);
    })
    .catch(err => console.log(err));
  });
}
function sendLatestData(socket) {
  db.retrieveToDos((err, todos) => {
    console.log(`Emitting newData with ${todos.length} todo(s)`);
    socket.emit('newData', todos);
  });
}
const initSocket = (io) => {
  console.log('Listening for socket connections...');
  io.on('connection', (socket) => {
    // Log ID for debugging and return first set of data on new connect
    console.log('New Connection with ID: ', socket.id);
    sendLatestData(socket);
    attachListeners(socket);
  });
}
module.exports = { initSocket };
