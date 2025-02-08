import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export default function Analytics({ user }) {
  const [analyticsData, setAnalyticsData] = useState({
    completed: 0,
    pending: 0,
    dailyTasks: {},
  });

  useEffect(() => {
    if (user) {
      fetchAnalyticsData();
    }
  }, [user]);

  const fetchAnalyticsData = async () => {
    try {
      const todosRef = collection(db, 'todos');
      const q = query(todosRef, where('userId', '==', user.uid));
      const querySnapshot = await getDocs(q);

      let completed = 0;
      let pending = 0;
      let dailyTasks = {};

      querySnapshot.forEach((doc) => {
        const todo = doc.data();
        // Count completed vs pending
        todo.completed ? completed++ : pending++;

        // Group by date
        const date = new Date(todo.createdAt?.toDate()).toLocaleDateString();
        dailyTasks[date] = (dailyTasks[date] || 0) + 1;
      });

      setAnalyticsData({ completed, pending, dailyTasks });
    } catch (error) {
      console.error('Error fetching analytics:', error);
    }
  };

  const barChartData = {
    labels: Object.keys(analyticsData.dailyTasks),
    datasets: [
      {
        label: 'Tasks Created',
        data: Object.values(analyticsData.dailyTasks),
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  const pieChartData = {
    labels: ['Completed', 'Pending'],
    datasets: [
      {
        data: [analyticsData.completed, analyticsData.pending],
        backgroundColor: [
          'rgba(75, 192, 192, 0.5)',
          'rgba(255, 99, 132, 0.5)',
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(255, 99, 132, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Task Analytics',
      },
    },
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-8">
      <h2 className="text-2xl font-bold text-center mb-6">Task Analytics</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover-card">
          <h3 className="text-xl font-semibold mb-4">Task Completion Status</h3>
          <Pie data={pieChartData} options={options} />
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover-card">
          <h3 className="text-xl font-semibold mb-4">Tasks Created by Day</h3>
          <Bar data={barChartData} options={options} />
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover-card">
          <h3 className="text-xl font-semibold mb-4">Summary</h3>
          <div className="space-y-4">
            <p className="text-lg">
              Total Tasks: {analyticsData.completed + analyticsData.pending}
            </p>
            <p className="text-lg text-green-500">
              Completed Tasks: {analyticsData.completed}
            </p>
            <p className="text-lg text-red-500">
              Pending Tasks: {analyticsData.pending}
            </p>
            <p className="text-lg">
              Completion Rate: 
              {((analyticsData.completed / (analyticsData.completed + analyticsData.pending)) * 100 || 0).toFixed(1)}%
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 