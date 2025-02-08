import { useState, useEffect } from "react";
import { db, auth } from "../firebase";
import { collection, addDoc, query, where, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";

export default function TodoList({ user }) {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    if (user) fetchTodos();
  }, [user]);

  const fetchTodos = async () => {
    const q = query(collection(db, "todos"), where("userId", "==", user.uid));
    const querySnapshot = await getDocs(q);
    setTodos(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  };

  const addTodo = async () => {
    if (!newTodo) return;
    await addDoc(collection(db, "todos"), { text: newTodo, completed: false, userId: user.uid });
    setNewTodo("");
    fetchTodos();
  };

  const toggleComplete = async (id, completed) => {
    await updateDoc(doc(db, "todos", id), { completed: !completed });
    fetchTodos();
  };

  const deleteTodo = async (id) => {
    await deleteDoc(doc(db, "todos", id));
    fetchTodos();
  };

  return user ? (
    <div className="max-w-md mx-auto mt-10">
      <input
        type="text"
        placeholder="New task..."
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        className="border px-2 py-1 w-full"
      />
      <button onClick={addTodo} className="mt-2 px-4 py-2 bg-green-500 text-white w-full">
        Add Task
      </button>
      <ul className="mt-4">
        {todos.map(todo => (
          <li key={todo.id} className="flex justify-between p-2 border-b">
            <span className={todo.completed ? "line-through" : ""}>{todo.text}</span>
            <div>
              <button onClick={() => toggleComplete(todo.id, todo.completed)} className="px-2 mx-1">
                {todo.completed ? "Undo" : "Done"}
              </button>
              <button onClick={() => deleteTodo(todo.id)} className="text-red-500">X</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  ) : (
    <p className="text-center mt-10">Please log in to manage tasks.</p>
  );
}
