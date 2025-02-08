import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Auth from "./components/Auth";
import TodoList from "./components/TodoList";
import Analytics from "./components/Analytics";
import Home from "./components/Home";
import './App.css';
import './index.css';

export default function App() {
  const [user, setUser] = useState(null);
  const [isDark, setIsDark] = useState(false);

  const toggleDarkMode = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <Router>
      <div className="app-container">
        <div className="max-w-4xl w-full p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover-card">
          <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            Minimalist To-Do App
          </h1>
          
          <div className="flex flex-col gap-4">
            <button 
              onClick={toggleDarkMode} 
              className="btn btn-secondary w-full flex items-center justify-center gap-2"
            >
              <span>{isDark ? '☀️ Light Mode' : '🌙 Dark Mode'}</span>
            </button>

            {user && (
              <div className="flex justify-center gap-4 w-full">
                <Link to="/" className="btn btn-primary flex-1">
                  🏠 Home
                </Link>
                <Link to="/tasks" className="btn btn-primary flex-1">
                  📝 Tasks
                </Link>
                <Link to="/analytics" className="btn btn-primary flex-1">
                  📊 Analytics
                </Link>
              </div>
            )}
          </div>

          <div className="fade-in">
            <Auth user={user} setUser={setUser} />
          </div>

          <div className="mt-6">
            <Routes>
              <Route path="/" element={<Home user={user} />} />
              {user && (
                <>
                  <Route path="/tasks" element={<TodoList user={user} />} />
                  <Route path="/analytics" element={<Analytics user={user} />} />
                </>
              )}
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}
