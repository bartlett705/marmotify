const mongoose = require('mongoose');
const moment = require('moment');
mongoose.connect('mongodb://localhost/marmotify');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'data be hosed, broh:'));
db.once('open', () => {
  console.log('Connected with MongoDB');
});

const todoSchema = mongoose.Schema({
  title: { type: String, required: true },
  body: String,
  tag: String,
  completed: { type: Number, default: 0 },
  addedDate: { type: Date, default: moment().format() },
  dueDate: { type: Date, default: moment().add(2, 'days').format() },
});
const ToDo = mongoose.model('ToDo', todoSchema);

const retrieveToDos = (callback) => ToDo.find({}, null,
  { sort: { dueDate: 1 } }, callback);
const validateAndCommitPost = todoObj => ToDo.create(todoObj);
const toggleComplete = (todoId) => {
  const query = { _id: todoId };
  const doc = {
    '$bit': {
      'completed': {
        'xor': 1,
      },
    },
  };
  const options = {
    new: true,
  };
  return ToDo.findOneAndUpdate(query, doc, options);
}
module.exports = { db, ToDo, toggleComplete, retrieveToDos, validateAndCommitPost };
