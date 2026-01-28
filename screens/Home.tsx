
import React, { useState } from 'react';
import { Task, ViewMode, TaskStatus } from '../types.ts';
import StatusBadge from '../components/StatusBadge.tsx';
import ReputableServices from './ReputableServices.tsx';
import CommunityMarketplace from './CommunityMarketplace.tsx';
import NewsAndPromotions from './NewsAndPromotions.tsx';
import LargeProjects from './LargeProjects.tsx';

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

  const displayTasks = viewMode === 'CUSTOMER' 
    ? tasks 
    : tasks.filter(t => t.status === TaskStatus.OPEN || t.status === TaskStatus.IN_PROGRESS);

  return (
    <div className="p-4 space-y-6">
      {/* Thẻ thông tin người dùng */}
      <div className="flex items-center justify-between bg-white p-4 rounded-[28px] border border-slate-100 shadow-sm">
         <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg ${viewMode === 'CUSTOMER' ? 'bg-blue-600' : 'bg-orange-600'}`}>
               {viewMode === 'CUSTOMER' ? 'K' : 'T'}
            </div>
            <div>
               <p className="text-[10px] font-black text-slate-400 uppercase">Chào buổi sáng,</p>
               <p className="text-base font-black text-slate-800">{viewMode === 'CUSTOMER' ? 'Anh Tuấn' : 'Thợ Hùng'}</p>
            </div>
         </div>
         <button onClick={onWalletClick} className="text-right bg-slate-50 px-3 py-2 rounded-2xl border border-slate-100">
            <p className="text-[9px] font-black text-slate-400 uppercase">Số dư ví</p>
            <p className={`text-sm font-black ${viewMode === 'CUSTOMER' ? 'text-blue-600' : 'text-orange-600'}`}>150.000đ</p>
         </button>
      </div>

      {/* Tabs điều hướng */}
      {viewMode === 'CUSTOMER' && (
        <div className="flex bg-white p-1 rounded-[24px] border border-slate-100 shadow-sm overflow-x-auto no-scrollbar gap-1">
          {['MY_TASKS', 'TENDERS', 'SERVICES', 'MARKETPLACE', 'NEWS'].map((tab) => (
            <button 
              key={tab}
              onClick={() => setCustomerTab(tab as any)}
              className={`px-4 py-2.5 rounded-xl text-[10px] font-black uppercase whitespace-nowrap ${customerTab === tab ? 'bg-blue-600 text-white shadow-md' : 'text-slate-500'}`}
            >
              {tab === 'MY_TASKS' ? 'Việc của tôi' : tab === 'TENDERS' ? 'Gói thầu' : tab === 'SERVICES' ? 'Dịch vụ' : tab === 'MARKETPLACE' ? 'Thanh lý' : 'Tin tức'}
            </button>
          ))}
        </div>
      )}

      {/* Nội dung tương ứng tab */}
      {viewMode === 'CUSTOMER' && customerTab === 'SERVICES' && <ReputableServices />}
      {viewMode === 'CUSTOMER' && customerTab === 'MARKETPLACE' && <CommunityMarketplace />}
      {viewMode === 'CUSTOMER' && customerTab === 'NEWS' && <NewsAndPromotions />}
      {viewMode === 'CUSTOMER' && customerTab === 'TENDERS' && <LargeProjects />}
      
      {(customerTab === 'MY_TASKS' || viewMode === 'TECHNICIAN') && (
        <div className="space-y-6">
          {viewMode === 'CUSTOMER' && (
            <button onClick={onCreateClick} className="w-full bg-slate-900 text-white py-5 rounded-[28px] font-black uppercase tracking-widest text-sm shadow-xl active:scale-95 transition-all">
              Đăng việc mới (10k)
            </button>
          )}

          <div className="space-y-4">
            <h2 className="font-black text-slate-800 text-lg flex items-center gap-2">
              <span className={`w-1.5 h-6 rounded-full ${viewMode === 'CUSTOMER' ? 'bg-blue-600' : 'bg-orange-600'}`}></span>
              {viewMode === 'CUSTOMER' ? 'Việc của bạn' : 'Việc mới quanh đây'}
            </h2>
            
            <div className="grid grid-cols-1 gap-4 pb-20">
              {displayTasks.map((task) => (
                <div key={task.id} onClick={() => onTaskClick(task)} className="bg-white p-5 rounded-[32px] border border-slate-100 shadow-sm active:scale-[0.98] cursor-pointer">
                  <div className="flex justify-between items-start mb-4">
                    <StatusBadge status={task.status} />
                    <p className={`text-sm font-black ${viewMode === 'CUSTOMER' ? 'text-blue-600' : 'text-orange-600'}`}>{task.budget}đ</p>
                  </div>
                  <h3 className="font-bold text-slate-800 text-base">{task.title}</h3>
                  <div className="flex justify-between pt-4 border-t border-slate-50 text-slate-400 text-[11px] font-bold">
                    <span>{task.location}</span>
                    <span>{task.createdAt}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
