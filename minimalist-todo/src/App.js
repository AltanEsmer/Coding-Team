import { useState } from "react";
import Auth from "./components/Auth";
import TodoList from "./components/TodoList";

export default function App() {
  const [user, setUser] = useState(null);

  return (
    <div className="min-h-screen flex flex-col items-center p-4">
      <h1 className="text-2xl font-bold">Minimalist To-Do App</h1>
      <Auth user={user} setUser={setUser} />
      <TodoList user={user} />
    </div>
  );
}
