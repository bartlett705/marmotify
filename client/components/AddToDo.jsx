import React from 'react';

class AddToDo extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="add-container">
        <form name='newToDo'>
          <input type="text" name="title" placeholder="title"/>
          <input type="text" name="tag" placeholder="tag"/>
          <input className="flatpickr" name ="dueDate" type="text" defaultValue={moment().add(2, 'days').format()}/>
        </form>
        <button onClick={() => this.props.handleSubmit(document.forms.newToDo)}>Add</button>
      </div>
    );
  }
}

export default AddToDo;
