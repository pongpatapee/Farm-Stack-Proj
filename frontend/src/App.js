import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import TodoView from "./components/TodoListView";

function App() {

  const [todoList, setTodoList] = useState([{}]);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');

  //read all todos when page starts
  useEffect(() => {
    axios.get('http://localhost:8000/api/todo')
    .then(res => {
      setTodoList(res.data)
    })
  });

  const addTodoHandler = () => {
    axios.post('http://localhost:8000/api/todo', {'title': title, 'description': desc})
    .then(res => {
      console.log(res);
    })
  }

  return (
    <div
      className="App list-group-item justify-content-center align-items-center mx-auto"
      style={{
        width: "400px",
        backgroundColor: "white",
        marginTop: "15px",
      }}
    >
      <h1
        className="card text-white bg-primary mb-1"
        styleName="max-width: 20rem;"
      >
        Task Manager
      </h1>
      <h6 className="card text-white bg-primary mb-3">
        FASTAPI - React - MongoDB
      </h6>
      <div className="card-body">
        <h5 className="card text-white bg-dark mb-3">Add Your Task</h5>
      </div>
      <span className="card-text">
        <input
          type="text"
          className="mb-2 form-control titleIn"
          placeholder="title"
          onChange={e => setTitle(e.target.value)}
        />
        <input
          type="text"
          className="mb-2 form-control desIn"
          placeholder="description"
          onChange={e => setDesc(e.target.value)}
        />
        <button
          className="btn btn-outline-primary mx-2 mb-3"
          style={{ borderRadius: "50px", "font-weight": "bold" }}
          onClick={addTodoHandler}
        >
          Add Task
        </button>
      </span>

      <h5 className="card text-white bg-dark mb-3">Your Tasks</h5>

      <div className="todo-items">
        <TodoView todoList={todoList} />
      </div>
    </div>
  );
}

export default App;
