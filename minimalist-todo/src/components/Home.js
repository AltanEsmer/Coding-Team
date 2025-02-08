import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Home({ user }) {
  const features = [
    { icon: "📝", title: "Task Management", description: "Create, edit, and organize your tasks efficiently" },
    { icon: "📊", title: "Analytics", description: "Track your productivity with detailed insights" },
    { icon: "🌙", title: "Dark Mode", description: "Easy on the eyes with dark mode support" },
    { icon: "🔄", title: "Real-time Sync", description: "Your tasks sync across all devices instantly" }
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
          Welcome to Your Personal Task Manager
        </motion.h2>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Stay organized and boost your productivity with our minimalist approach to task management.
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
      <section id="features" className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

      {/* About Section */}
      <section className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-md">
        <h2 className="text-2xl font-bold mb-6">About This Project</h2>
        <div className="space-y-4">
          <p className="text-gray-600 dark:text-gray-300">
            This minimalist to-do app was created with a focus on simplicity and efficiency. 
            Built using modern web technologies including:
          </p>
          <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2">
            <li>React for the user interface</li>
            <li>Firebase for real-time data synchronization</li>
            <li>Tailwind CSS for modern styling</li>
            <li>Chart.js for analytics visualization</li>
          </ul>
          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-3">Why Choose Our App?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              We believe in keeping things simple yet powerful. Our app provides just the right features 
              you need to stay organized without overwhelming you with unnecessary complexity.
            </p>
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
          Have questions or suggestions? We'd love to hear from you!
        </p>
        <a 
          href="mailto:contact@minimalisttodo.app" 
          className="btn btn-primary inline-flex items-center gap-2"
        >
          <span>📧</span> Contact Us
        </a>
      </section>
    </div>
  );
} 