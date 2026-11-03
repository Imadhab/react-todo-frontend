import axios from "axios";
import {useEffect , useState} from "react";
import "./App.css"

type TodoItem = {
    id : string;
    description: string;
    status: string;
}

function Todo(){
    const [todos, setTodos] = useState<TodoItem[]>([]);
    const [description, setDescription] = useState("");

    function getTodos(){
        axios.get("/api/todo")
            .then((response) =>{
                console.log(response.data);
                setTodos(response.data);
            });
    }
    useEffect(() => {
        getTodos();
    }, []);

    function addTodo(){
        axios.post("/api/todo", {
            description: description,
            status: "OPEN"
        }).then(()=>{
            getTodos();
            setDescription("");
        });
    }
    function deleteTodo(id:string){
        axios.delete(`/api/todo/${id}`)
            .then(() => {
                getTodos();
            });
    }
    return (
        <div className="todo-container">
            <h1> My Todo List</h1>
            <div className="todo-form">
                <input
                    type="text"
                    placeholder="Enter a Text"
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                />
                <button onClick={addTodo}>Add Todo</button>
            </div>

            <div className="todo-list">
                {todos.map((todo) => (
                    <p className="todo-item" key={todo.id}>
                        <span>{todo.description}</span>
                        <span>{todo.status}</span>
                        <button onClick={() => deleteTodo(todo.id)}>
                            Delete
                        </button>
                    </p>
                ))}
            </div>
        </div>

    );

}

export default Todo;