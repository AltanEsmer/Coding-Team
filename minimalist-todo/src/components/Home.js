import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Home({ user }) {
  const features = [
    { 
      icon: "📝", 
      title: "Smart Task Management", 
      description: "Create, edit, and organize tasks with priority levels (High, Medium, Low)" 
    },
    { 
      icon: "🎤", 
      title: "Voice Input", 
      description: "Add tasks hands-free with voice recognition support" 
    },
    { 
      icon: "🎯", 
      title: "Priority System", 
      description: "Color-coded tasks with smart prioritization and sorting" 
    },
    { 
      icon: "📊", 
      title: "Analytics", 
      description: "Track your productivity with detailed insights and charts" 
    },
    { 
      icon: "🌙", 
      title: "Dark Mode", 
      description: "Easy on the eyes with automatic dark mode support" 
    },
    { 
      icon: "🔄", 
      title: "Real-time Sync", 
      description: "Your tasks sync across all devices instantly" 
    }
  ];

  return (
    <div className="space-y-12 w-full max-w-4xl">
      {/* Hero Section */}
      <section className="text-center space-y-6">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold"
        >
          Welcome to Your Smart Task Manager
        </motion.h2>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Boost your productivity with our intelligent task management system featuring voice input and smart prioritization.
        </p>
        {!user && (
          <div className="flex justify-center gap-4">
            <Link to="/login" className="btn btn-primary">
              Get Started
            </Link>
            <a href="#features" className="btn btn-secondary">
              Learn More
            </a>
          </div>
        )}
      </section>

      {/* Features Section */}
      <section id="features" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="text-4xl mb-4">{feature.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
          </motion.div>
        ))}
      </section>

      {/* About Developer Section */}
      <section className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-md">
        <h2 className="text-2xl font-bold mb-6">About the Developer</h2>
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="w-48 h-48 rounded-full overflow-hidden shadow-lg">
            <img 
              src={require("../images/profile_icon.jpeg")} 
              alt="Developer" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="space-y-4 flex-1">
            <h3 className="text-xl font-semibold">Altan Esmer</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Full-stack developer passionate about creating intuitive and efficient web applications. 
              Specialized in React, Firebase, and modern web technologies.
            </p>
            <div className="space-y-2">
              <h4 className="font-semibold">Skills & Technologies:</h4>
              <div className="flex flex-wrap gap-2">
                {["React", "Firebase", "Tailwind CSS", "JavaScript", "Web APIs"].map((skill) => (
                  <span 
                    key={skill}
                    className="px-3 py-1 bg-blue-100 dark:bg-blue-900 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex gap-4 pt-4">
              <a 
                href="https://github.com/AltanEsmer" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn btn-secondary"
              >
                GitHub
              </a>
              <a 
                href="https://instagram.com/in/mr_altan25" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn btn-secondary"
              >
                Instagram
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Project Details Section */}
      <section className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-md">
        <h2 className="text-2xl font-bold mb-6">About This Project</h2>
        <div className="space-y-4">
          <p className="text-gray-600 dark:text-gray-300">
            This minimalist to-do app was created with a focus on efficiency and user experience. 
            Built using modern web technologies including:
          </p>
          <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2">
            <li>React for the user interface</li>
            <li>Firebase for real-time data synchronization</li>
            <li>Tailwind CSS for modern styling</li>
            <li>Chart.js for analytics visualization</li>
            <li>Web Speech API for voice input</li>
            <li>Framer Motion for smooth animations</li>
          </ul>
          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-3">Latest Features</h3>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2">
              <li>Voice command support for hands-free task creation</li>
              <li>Smart task prioritization with color coding</li>
              <li>Real-time task sorting by priority</li>
              <li>Interactive analytics dashboard</li>
              <li>Dark mode for comfortable viewing</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Active Users", value: "1,000+" },
          { label: "Tasks Completed", value: "50,000+" },
          { label: "Countries", value: "20+" },
          { label: "Satisfaction", value: "99%" }
        ].map((stat) => (
          <div key={stat.label} className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <div className="text-2xl font-bold text-blue-500">{stat.value}</div>
            <div className="text-sm text-gray-600 dark:text-gray-300">{stat.label}</div>
          </div>
        ))}
      </section>

      {/* Contact Section */}
      <section className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-md text-center">
        <h2 className="text-2xl font-bold mb-4">Get in Touch</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Have questions, suggestions, or want to collaborate? Feel free to reach out!
        </p>
        <div className="flex justify-center gap-4">
          <a 
            href="mailto:your.email@example.com" 
            className="btn btn-primary inline-flex items-center gap-2"
          >
            <span>📧</span> Email Me
          </a>
          <a 
            href="https://github.com/yourusername/project-repo" 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn btn-secondary inline-flex items-center gap-2"
          >
            <span>💻</span> View Source
          </a>
        </div>
      </section>
    </div>
  );
} 