
import React from 'react';
import { Task } from '../types';

interface InProgressProps {
  task: Task;
  onComplete: () => void;
  onBack: () => void;
}

const InProgress: React.FC<InProgressProps> = ({ task, onComplete, onBack }) => {
  return (
    <div className="p-4 space-y-6 animate-in fade-in duration-500 pb-24">
       <div className="flex items-center gap-2 mb-2">
          <button onClick={onBack} className="p-2 -ml-2 text-slate-400">
             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          </button>
          <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Đang triển khai</span>
       </div>

       <div className="bg-green-600 rounded-[36px] p-7 text-white shadow-xl shadow-green-100 space-y-5 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -ml-10 -mt-10" />
          <div className="w-16 h-16 bg-white/20 rounded-full mx-auto flex items-center justify-center backdrop-blur-md shadow-inner">
             <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="animate-pulse"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
          </div>
          <div>
            <h2 className="text-xl font-black uppercase tracking-tight">Thợ đang chuẩn bị đến</h2>
            <p className="text-xs text-green-100 font-medium mt-1">Thông tin liên lạc đã được mở cho hàng xóm và thợ.</p>
          </div>
       </div>

       <div className="bg-white rounded-[36px] p-6 border border-slate-100 shadow-sm space-y-6">
          <div className="flex items-center justify-between bg-slate-50 p-4 rounded-[28px] border border-slate-100">
             <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center text-blue-600 font-black text-xl border border-slate-100">
                  {task.technician?.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-black text-slate-800 text-base">{task.technician?.name}</h3>
                  <div className="flex items-center gap-1.5 text-[10px] text-amber-500 font-black uppercase tracking-tighter mt-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                    {task.technician?.rating} • {task.technician?.completedTasks} VIỆC
                  </div>
                </div>
             </div>
             <a href={`tel:${task.technician?.phone}`} className="w-14 h-14 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-100 active:scale-90 transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
             </a>
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div className="p-4 bg-blue-50/50 rounded-2xl border border-blue-100/50">
                <p className="text-[9px] font-black text-blue-400 uppercase tracking-widest mb-1">Dự chi thợ báo</p>
                <p className="font-black text-blue-700 text-lg leading-none">{task.selectedOffer?.price.toLocaleString('vi-VN')}đ</p>
             </div>
             <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Thời gian hẹn</p>
                <p className="font-black text-slate-800 text-lg leading-none">{task.selectedOffer?.arrivalTime}</p>
             </div>
          </div>
       </div>

       {/* Safety Check Box */}
       <div className="bg-white rounded-[36px] p-6 border border-slate-100 shadow-sm space-y-4">
          <h4 className="font-black text-slate-800 text-xs uppercase tracking-widest flex items-center gap-2">
             <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-amber-500"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
             Nhắc nhở an toàn
          </h4>
          <ul className="space-y-3">
             {[
               'Thanh toán trực tiếp cho thợ sau khi xong việc.',
               'Chỉ xác nhận hoàn thành khi đã kiểm tra lỗi triệt để.',
               'Yêu cầu thợ báo giá lại nếu phát sinh linh kiện mới.'
             ].map((tip, i) => (
               <li key={i} className="flex gap-3 text-[11px] text-slate-500 font-medium leading-relaxed">
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-200 mt-1.5 flex-shrink-0" />
                  {tip}
               </li>
             ))}
          </ul>
       </div>

       {/* Fixed Bottom CTA */}
       <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/90 backdrop-blur-xl border-t border-slate-100 max-w-md mx-auto z-50">
          <button 
            onClick={onComplete}
            className="w-full bg-slate-900 text-white py-5 rounded-[28px] font-black uppercase tracking-widest text-sm shadow-xl shadow-slate-200 active:scale-95 transition-all"
          >
            Xác nhận đã sửa xong
          </button>
       </div>
    </div>
  );
};

export default InProgress;
