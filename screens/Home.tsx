
import React, { useState } from 'react';
import { Task, ViewMode, TaskStatus } from '../types';
import StatusBadge from '../components/StatusBadge';
import ReputableServices from './ReputableServices';
import CommunityMarketplace from './CommunityMarketplace';
import NewsAndPromotions from './NewsAndPromotions';
import LargeProjects from './LargeProjects';

interface HomeProps {
  tasks: Task[];
  viewMode: ViewMode;
  onSwitchMode: (mode: ViewMode) => void;
  onTaskClick: (task: Task) => void;
  onCreateClick: () => void;
  onWalletClick: () => void;
}

const Home: React.FC<HomeProps> = ({ tasks, viewMode, onTaskClick, onCreateClick, onWalletClick }) => {
  const [customerTab, setCustomerTab] = useState<'MY_TASKS' | 'SERVICES' | 'MARKETPLACE' | 'NEWS' | 'TENDERS'>('MY_TASKS');

  // Lọc công việc cho thợ: Hiển thị việc đang tìm thợ (OPEN)
  // Lọc cho khách: Hiển thị việc của mình
  const displayTasks = viewMode === 'CUSTOMER' 
    ? tasks 
    : tasks.filter(t => t.status === TaskStatus.OPEN || t.status === TaskStatus.IN_PROGRESS);

  return (
    <div className="p-4 space-y-6 animate-in fade-in duration-500">
      {/* User Header Card */}
      <div className="flex items-center justify-between bg-white p-4 rounded-[28px] border border-slate-100 shadow-sm">
         <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg ${viewMode === 'CUSTOMER' ? 'bg-gradient-to-br from-blue-500 to-blue-700 shadow-blue-100' : 'bg-gradient-to-br from-orange-500 to-orange-700 shadow-orange-100'}`}>
               {viewMode === 'CUSTOMER' ? (
                 <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
               ) : (
                 <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
               )}
            </div>
            <div onClick={() => {}} className="cursor-pointer">
               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Chào buổi sáng,</p>
               <p className="text-base font-black text-slate-800">{viewMode === 'CUSTOMER' ? 'Anh Tuấn' : 'Thợ Hùng'}</p>
            </div>
         </div>
         <button onClick={onWalletClick} className="text-right bg-slate-50 px-3 py-2 rounded-2xl border border-slate-100 active:scale-95 transition-all">
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-tighter">Số dư ví</p>
            <p className={`text-sm font-black ${viewMode === 'CUSTOMER' ? 'text-blue-600' : 'text-orange-600'}`}>150.000đ</p>
         </button>
      </div>

      {/* Tabs Menu */}
      {viewMode === 'CUSTOMER' && (
        <div className="flex bg-white p-1.5 rounded-[24px] border border-slate-100 shadow-sm overflow-x-auto no-scrollbar gap-1">
          {[
            { id: 'MY_TASKS', label: 'Việc của tôi' },
            { id: 'TENDERS', label: 'Gói thầu lớn' },
            { id: 'SERVICES', label: 'Dịch vụ' },
            { id: 'MARKETPLACE', label: 'Thanh lý' },
            { id: 'NEWS', label: 'Tin tức' }
          ].map((tab) => (
            <button 
              key={tab.id}
              onClick={() => setCustomerTab(tab.id as any)}
              className={`flex-1 min-w-fit px-4 py-2.5 rounded-xl text-[10px] font-black uppercase transition-all ${customerTab === tab.id ? 'bg-blue-600 text-white shadow-lg shadow-blue-100' : 'text-slate-500'}`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      )}

      {/* Technician Mode Switcher (Tab giả) */}
      {viewMode === 'TECHNICIAN' && (
        <div className="flex bg-white p-1.5 rounded-[24px] border border-slate-100 shadow-sm gap-1">
            <button className="flex-1 px-4 py-2.5 rounded-xl text-[10px] font-black uppercase bg-orange-600 text-white shadow-lg shadow-orange-100">Tìm việc</button>
            <button className="flex-1 px-4 py-2.5 rounded-xl text-[10px] font-black uppercase text-slate-500">Việc đã nhận</button>
        </div>
      )}

      {/* Component Rendering */}
      {viewMode === 'CUSTOMER' && customerTab === 'SERVICES' && <ReputableServices />}
      {viewMode === 'CUSTOMER' && customerTab === 'MARKETPLACE' && <CommunityMarketplace />}
      {viewMode === 'CUSTOMER' && customerTab === 'NEWS' && <NewsAndPromotions />}
      {viewMode === 'CUSTOMER' && customerTab === 'TENDERS' && <LargeProjects />}
      
      {(customerTab === 'MY_TASKS' || viewMode === 'TECHNICIAN') && (
        <div className="space-y-6">
          {viewMode === 'CUSTOMER' && (
            <button onClick={onCreateClick} className="w-full bg-slate-900 text-white py-5 rounded-[28px] font-black flex items-center justify-center gap-3 shadow-xl active:scale-95 transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
              <span className="uppercase tracking-widest text-sm">Đăng việc mới (10k)</span>
            </button>
          )}

          <div className="space-y-4">
            <h2 className="font-black text-slate-800 text-lg flex items-center gap-2">
              <span className={`w-1.5 h-6 rounded-full ${viewMode === 'CUSTOMER' ? 'bg-blue-600' : 'bg-orange-600'}`}></span>
              {viewMode === 'CUSTOMER' ? 'Việc của bạn' : 'Việc mới quanh đây'}
            </h2>
            
            <div className="grid grid-cols-1 gap-4 pb-20">
              {displayTasks.length > 0 ? displayTasks.map((task) => (
                <div key={task.id} onClick={() => onTaskClick(task)} className="bg-white p-5 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-md transition-all active:scale-[0.98] cursor-pointer group">
                  <div className="flex justify-between items-start mb-4">
                    <StatusBadge status={task.status} />
                    <div className="text-right">
                      <p className="text-[9px] font-black text-slate-400 uppercase mb-0.5">Ngân sách</p>
                      <p className={`text-sm font-black ${viewMode === 'CUSTOMER' ? 'text-blue-600' : 'text-orange-600'}`}>{task.budget}đ</p>
                    </div>
                  </div>
                  <h3 className="font-bold text-slate-800 text-base mb-1 group-hover:text-blue-600 transition-colors">{task.title}</h3>
                  <div className="flex items-center justify-between pt-4 border-t border-slate-50 text-slate-400">
                    <span className="text-[11px] font-bold flex items-center gap-1">
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                      {task.location}
                    </span>
                    <span className="text-[10px] font-bold">{task.createdAt}</span>
                  </div>
                </div>
              )) : (
                <div className="py-20 text-center text-slate-400 text-sm font-medium bg-white rounded-[32px] border border-dashed border-slate-200">
                  <p>Chưa có công việc nào</p>
                  {viewMode === 'CUSTOMER' && <button onClick={onCreateClick} className="mt-2 text-blue-600 font-bold uppercase text-[10px]">Đăng việc ngay</button>}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
