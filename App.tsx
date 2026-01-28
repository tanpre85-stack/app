
import React, { useState } from 'react';
import { TaskStatus, Task, ViewMode, Offer } from './types';
import Header from './components/Header';
import Home from './screens/Home';
import Login from './screens/Login';
import CreateTask from './screens/CreateTask';
import TaskDetail from './screens/TaskDetail';
import Profile from './screens/Profile';
import WalletManagement from './screens/WalletManagement';
import OfferSubmission from './screens/OfferSubmission';
import InProgress from './screens/InProgress';
import CompletionRating from './screens/CompletionRating';

type Screen = 'HOME' | 'LOGIN' | 'CREATE_TASK' | 'TASK_DETAIL' | 'PROFILE' | 'WALLET' | 'OFFER_SUBMIT' | 'IN_PROGRESS' | 'RATING';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<ViewMode>('CUSTOMER');
  const [currentScreen, setCurrentScreen] = useState<Screen>('HOME');
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Sửa vòi nước bồn rửa bát',
      description: 'Vòi nước bị rò rỉ mạnh ở khớp nối, cần thợ qua xử lý gấp trong sáng nay.',
      category: 'Điện nước',
      location: 'Quận 1, TP.HCM',
      budget: '150.000',
      status: TaskStatus.OPEN,
      depositAmount: 50000,
      customerName: 'Anh Tuấn',
      createdAt: '10:30 AM',
      images: ['https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400']
    }
  ]);

  const handleLogin = (role: ViewMode) => {
    setViewMode(role);
    setIsAuthenticated(true);
    setCurrentScreen('HOME');
  };

  const handleCreateTask = (data: any) => {
    const newTask: Task = {
      id: Math.random().toString(36).substr(2, 9),
      ...data,
      status: TaskStatus.OPEN,
      depositAmount: 50000,
      customerName: 'Anh Tuấn',
      createdAt: 'Vừa xong',
    };
    setTasks([newTask, ...tasks]);
    setCurrentScreen('HOME');
  };

  if (!isAuthenticated) return <Login onLogin={handleLogin} />;

  const renderScreen = () => {
    switch (currentScreen) {
      case 'HOME':
        return (
          <Home 
            tasks={tasks} 
            viewMode={viewMode} 
            onSwitchMode={setViewMode} 
            onTaskClick={(task) => {
              setSelectedTask(task);
              if (task.status === TaskStatus.IN_PROGRESS) setCurrentScreen('IN_PROGRESS');
              else setCurrentScreen('TASK_DETAIL');
            }}
            onCreateClick={() => setCurrentScreen('CREATE_TASK')}
            onWalletClick={() => setCurrentScreen('WALLET')}
          />
        );
      case 'CREATE_TASK':
        return <CreateTask onSubmit={handleCreateTask} onCancel={() => setCurrentScreen('HOME')} />;
      case 'TASK_DETAIL':
        return selectedTask ? (
          <TaskDetail 
            task={selectedTask} 
            viewMode={viewMode} 
            onBack={() => setCurrentScreen('HOME')}
            onMakeOfferClick={() => setCurrentScreen('OFFER_SUBMIT')}
          />
        ) : null;
      case 'PROFILE':
        return <Profile viewMode={viewMode} onBack={() => setCurrentScreen('HOME')} onWalletClick={() => setCurrentScreen('WALLET')} />;
      case 'WALLET':
        return <WalletManagement onBack={() => setCurrentScreen('HOME')} />;
      case 'OFFER_SUBMIT':
        return selectedTask ? (
          <OfferSubmission 
            task={selectedTask} 
            onCancel={() => setCurrentScreen('TASK_DETAIL')}
            onSubmit={() => { alert('Đã gửi báo giá!'); setCurrentScreen('HOME'); }}
          />
        ) : null;
      case 'IN_PROGRESS':
        return selectedTask ? (
          <InProgress 
            task={selectedTask} 
            onBack={() => setCurrentScreen('HOME')}
            onComplete={() => setCurrentScreen('RATING')}
          />
        ) : null;
      case 'RATING':
        return selectedTask ? (
          <CompletionRating 
            task={selectedTask} 
            onFinish={() => setCurrentScreen('HOME')}
          />
        ) : null;
      default:
        return <Home tasks={tasks} viewMode={viewMode} onSwitchMode={setViewMode} onTaskClick={()=>{}} onCreateClick={()=>{}} onWalletClick={()=>{}} />;
    }
  };

  return (
    <div className="max-w-md mx-auto min-h-screen bg-slate-50 shadow-2xl relative font-sans">
      <Header 
        onLogout={() => setIsAuthenticated(false)} 
        onProfileClick={() => setCurrentScreen('PROFILE')} 
      />
      <main className="pb-4">
        {renderScreen()}
      </main>
    </div>
  );
};

export default App;
