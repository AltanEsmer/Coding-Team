import { useState, useEffect } from "react";
import { db, auth } from "../firebase";
import { collection, addDoc, query, where, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";

export default function TodoList({ user }) {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [priority, setPriority] = useState("medium");
  const [voiceSupported, setVoiceSupported] = useState(false);
  const [voiceError, setVoiceError] = useState(null);

  // Check browser support for Speech Recognition
  useEffect(() => {
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      setVoiceSupported(true);
    } else {
      setVoiceError("Voice input is not supported in your browser. Try Chrome or Edge.");
    }
  }, []);

  // Voice Recognition Setup with error handling
  const setupVoiceRecognition = () => {
    try {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        console.log('Voice recognition started');
        setVoiceError(null);
      };

      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setVoiceError(`Error: ${event.error}`);
        setIsRecording(false);
      };

      recognition.onend = () => {
        console.log('Voice recognition ended');
        setIsRecording(false);
      };

      recognition.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map(result => result[0])
          .map(result => result.transcript)
          .join('');
        
        console.log('Transcript:', transcript);
        setNewTodo(transcript);
      };

      return recognition;
    } catch (error) {
      console.error('Error setting up voice recognition:', error);
      setVoiceError('Failed to initialize voice recognition');
      return null;
    }
  };

  const recognition = voiceSupported ? setupVoiceRecognition() : null;

  // Handle voice input with feedback
  const startVoiceInput = () => {
    if (!recognition) {
      setVoiceError('Voice recognition not available');
      return;
    }

    try {
      recognition.start();
      setIsRecording(true);
      setVoiceError(null);
    } catch (error) {
      console.error('Error starting voice recognition:', error);
      setVoiceError('Failed to start voice recognition');
      setIsRecording(false);
    }
  };

  const stopVoiceInput = () => {
    if (recognition) {
      recognition.stop();
      setIsRecording(false);
    }
  };

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
        priority: priority,
        createdAt: new Date()
      });
      setNewTodo("");
      setPriority("medium");
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

  // Sort todos by priority
  const sortByPriority = () => {
    const priorityOrder = { high: 1, medium: 2, low: 3 };
    const sortedTodos = [...todos].sort((a, b) => 
      priorityOrder[a.priority] - priorityOrder[b.priority]
    );
    setTodos(sortedTodos);
  };

  // Get priority color
  const getPriorityColor = (priority) => {
    const colors = {
      high: 'bg-red-100 dark:bg-red-900',
      medium: 'bg-yellow-100 dark:bg-yellow-900',
      low: 'bg-green-100 dark:bg-green-900'
    };
    return colors[priority] || colors.medium;
  };

  return user ? (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add a new task..."
            className="input-field flex-grow"
          />
          {voiceSupported && (
            <button
              type="button"
              onClick={isRecording ? stopVoiceInput : startVoiceInput}
              className={`btn ${isRecording ? 'btn-danger animate-pulse' : 'btn-secondary'}`}
              title={isRecording ? 'Stop Recording' : 'Start Voice Input'}
            >
              {isRecording ? '🛑' : '🎤'}
            </button>
          )}
        </div>

        {/* Voice Status and Error Messages */}
        {isRecording && (
          <div className="text-green-500 dark:text-green-400 text-sm">
            🎤 Listening... Speak now
          </div>
        )}
        {voiceError && (
          <div className="text-red-500 dark:text-red-400 text-sm">
            ⚠️ {voiceError}
          </div>
        )}

        <div className="flex gap-4 items-center">
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="input-field w-40"
          >
            <option value="high">High Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="low">Low Priority</option>
          </select>

          <button type="submit" className="btn btn-primary flex-grow">
            Add Task
          </button>
        </div>
      </form>

      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Your Tasks</h2>
        <button
          onClick={sortByPriority}
          className="btn btn-secondary"
          title="Sort by Priority"
        >
          Sort by Priority
        </button>
      </div>

      <div className="space-y-2">
        {todos.map((todo) => (
          <div
            key={todo.id}
            className={`todo-item ${todo.completed ? 'completed' : ''} 
                       ${getPriorityColor(todo.priority)} transition-all duration-200`}
          >
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
                className="custom-checkbox"
              />
              <span>{todo.text}</span>
              <span className="text-sm px-2 py-1 rounded-full bg-opacity-50">
                {todo.priority}
              </span>
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
    </div>
  ) : (
    <p className="text-center mt-10">Please log in to manage tasks.</p>
  );
}
