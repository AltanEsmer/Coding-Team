import { useState, useEffect } from "react";
import { db, auth } from "../firebase";
import { collection, addDoc, query, where, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";

export default function TodoList({ user }) {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) fetchTodos();
  }, [user]);

  const fetchTodos = async () => {
    const q = query(collection(db, "todos"), where("userId", "==", user.uid));
    const querySnapshot = await getDocs(q);
    setTodos(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  };

  const addTodo = async (e) => {
    e.preventDefault();
    if (!newTodo.trim()) return;
    
    try {
      await addDoc(collection(db, "todos"), {
        text: newTodo,
        completed: false,
        userId: user.uid,
        createdAt: new Date()
      });
      setNewTodo("");
      fetchTodos();
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const toggleComplete = async (id, completed) => {
    await updateDoc(doc(db, "todos", id), { completed: !completed });
    fetchTodos();
  };

  const deleteTodo = async (id) => {
    await deleteDoc(doc(db, "todos", id));
    fetchTodos();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addTodo(e);
  };

  const toggleTodo = async (id) => {
    const todo = todos.find(t => t.id === id);
    if (todo) {
      await toggleComplete(id, todo.completed);
    }
  };

  return user ? (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new task..."
          className="input-field flex-grow"
        />
        <button type="submit" className="btn btn-primary">
          Add
        </button>
      </form>

      {isLoading ? (
        <div className="flex justify-center">
          <div className="loading-spinner" />
        </div>
      ) : (
        <div className="space-y-2">
          {todos.map((todo) => (
            <div
              key={todo.id}
              className={`todo-item ${todo.completed ? 'completed' : ''}`}
            >
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id)}
                  className="custom-checkbox"
                />
                <span>{todo.text}</span>
              </div>
              <button
                onClick={() => deleteTodo(todo.id)}
                className="btn btn-danger"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  ) : (
    <p className="text-center mt-10">Please log in to manage tasks.</p>
  );
}
