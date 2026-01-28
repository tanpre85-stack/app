
import React, { useState } from 'react';
import { Task, ViewMode, TaskStatus } from '../types';
import StatusBadge from '../components/StatusBadge';

interface AdminDashboardProps {
  tasks: Task[];
  onTaskClick: (task: Task) => void;
  onSwitchMode: (mode: ViewMode) => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ tasks, onTaskClick }) => {
  const [filter, setFilter] = useState<TaskStatus | 'ALL'>('ALL');

  const filteredTasks = filter === 'ALL' 
    ? tasks 
    : tasks.filter(t => t.status === filter);

  const stats = {
    total: tasks.length,
    inProgress: tasks.filter(t => t.status === TaskStatus.IN_PROGRESS).length,
    disputed: tasks.filter(t => t.status === TaskStatus.DISPUTED).length
  };

  return (
    <div className="p-4 space-y-6 animate-in fade-in duration-300">
      <div className="flex flex-col gap-1">
        <h2 className="text-2xl font-black text-slate-800">Quản trị hệ thống</h2>
        <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Admin Dashboard</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-white p-3 rounded-3xl border border-slate-100 shadow-sm text-center">
          <p className="text-[10px] font-bold text-slate-400 uppercase">Tổng việc</p>
          <p className="text-xl font-black text-slate-800">{stats.total}</p>
        </div>
        <div className="bg-white p-3 rounded-3xl border border-slate-100 shadow-sm text-center">
          <p className="text-[10px] font-bold text-slate-400 uppercase">Đang sửa</p>
          <p className="text-xl font-black text-green-600">{stats.inProgress}</p>
        </div>
        <div className="bg-white p-3 rounded-3xl border border-red-100 shadow-sm text-center">
          <p className="text-[10px] font-bold text-red-400 uppercase">Khiếu nại</p>
          <p className="text-xl font-black text-red-600">{stats.disputed}</p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {(['ALL', ...Object.values(TaskStatus)] as const).map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-bold transition-all ${filter === s ? 'bg-slate-800 text-white shadow-md' : 'bg-white border border-slate-200 text-slate-500'}`}
          >
            {s === 'ALL' ? 'Tất cả' : s}
          </button>
        ))}
      </div>

      {/* Task List */}
      <div className="space-y-4">
        {filteredTasks.map((task) => (
          <div 
            key={task.id}
            onClick={() => onTaskClick(task)}
            className={`bg-white p-5 rounded-3xl border transition-all active:scale-[0.98] ${task.status === TaskStatus.DISPUTED ? 'border-red-200 bg-red-50/20' : 'border-slate-100 shadow-sm'}`}
          >
            <div className="flex justify-between items-start mb-3">
              <StatusBadge status={task.status} />
              <div className="text-right">
                <span className="block text-[10px] text-slate-400 font-bold uppercase">ID: #{task.id}</span>
              </div>
            </div>
            
            <h3 className="font-bold text-slate-800 mb-1 leading-tight">{task.title}</h3>
            
            <div className="grid grid-cols-2 gap-4 mt-3 pt-3 border-t border-slate-50">
               <div className="space-y-1">
                  <p className="text-[9px] font-bold text-slate-400 uppercase">Khách hàng</p>
                  <p className="text-xs font-bold text-slate-700">{task.customerName}</p>
               </div>
               <div className="space-y-1">
                  <p className="text-[9px] font-bold text-slate-400 uppercase">Thợ đảm nhận</p>
                  <p className="text-xs font-bold text-slate-700">{task.technician?.name || '---'}</p>
               </div>
            </div>
            
            <div className="mt-4 flex items-center justify-between text-[11px] font-medium text-slate-500">
               <span className="flex items-center gap-1">
                 <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                 {task.location}
               </span>
               <span className="text-blue-600 font-black">Cọc: 50k</span>
            </div>
          </div>
        ))}

        {filteredTasks.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-slate-400 text-sm font-medium">Không tìm thấy công việc nào.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
