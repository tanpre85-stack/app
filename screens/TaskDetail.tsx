
import React from 'react';
import { Task, ViewMode, TaskStatus, Offer } from '../types';
import StatusBadge from '../components/StatusBadge';

interface TaskDetailProps {
  task: Task;
  viewMode: ViewMode;
  onOfferSelect?: (offer: Offer) => void;
  onMakeOfferClick?: () => void;
  onBack: () => void;
  onSimulateTechDeposit?: () => void;
}

const TaskDetail: React.FC<TaskDetailProps> = ({ 
  task, 
  viewMode, 
  onOfferSelect, 
  onMakeOfferClick, 
  onBack,
  onSimulateTechDeposit
}) => {
  const mockOffers: Offer[] = [
    { id: 'o1', techId: 't1', techName: 'Anh Hùng (Điện)', price: 150000, arrivalTime: '30 phút', techRating: 4.8 },
    { id: 'o2', techId: 't2', techName: 'Chú Ba Sửa Ống', price: 120000, arrivalTime: '1 giờ', techRating: 4.5 },
  ];

  return (
    <div className="flex flex-col min-h-[calc(100vh-64px)]">
      <div className="p-4 bg-white border-b border-slate-100 flex items-center justify-between sticky top-[57px] z-10">
        <button onClick={onBack} className="p-2 -ml-2 text-slate-500">
           <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        </button>
        <StatusBadge status={task.status} />
        <div className="w-6" />
      </div>

      <div className="p-4 space-y-6">
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{task.category}</span>
            <span className="text-xs text-slate-400">{task.createdAt}</span>
          </div>
          <h2 className="text-xl font-bold text-slate-800 leading-tight">{task.title}</h2>
          
          {/* Photos Section */}
          {task.images && task.images.length > 0 && (
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide py-2">
              {task.images.map((img, idx) => (
                <img 
                  key={idx} 
                  src={img} 
                  alt={`Status ${idx}`} 
                  className="w-32 h-32 flex-shrink-0 object-cover rounded-2xl border border-slate-50" 
                />
              ))}
            </div>
          )}

          <p className="text-sm text-slate-600 leading-relaxed">{task.description}</p>
          
          <div className="pt-4 border-t border-slate-50 space-y-3">
             <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-slate-600">
                   <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                   <span className="text-sm font-medium">{task.location}</span>
                </div>
                <div className="text-right">
                   <p className="text-[10px] font-bold text-slate-400 uppercase">Ngân sách mong muốn</p>
                   <p className="text-sm font-bold text-blue-600">{task.budget} VND</p>
                </div>
             </div>
             <div className="flex items-center gap-2 text-amber-600">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                <span className="text-sm font-bold">Tiền cọc: 50.000 VNĐ</span>
             </div>
          </div>
        </div>

        {/* ADMIN ACTIONS */}
        {viewMode === 'ADMIN' && (
           <div className="bg-slate-800 p-6 rounded-3xl space-y-4 text-white shadow-xl">
              <h3 className="font-bold text-lg">Bảng điều khiển Quản trị</h3>
              <div className="space-y-2">
                 <p className="text-[10px] font-bold text-slate-400 uppercase">Thông tin các bên</p>
                 <div className="bg-white/5 p-3 rounded-xl space-y-2">
                    <p className="text-xs">Khách: <span className="font-bold">{task.customerName}</span></p>
                    <p className="text-xs">Thợ: <span className="font-bold">{task.technician?.name || 'Chưa chọn'}</span></p>
                 </div>
              </div>
              
              {task.status === TaskStatus.DISPUTED ? (
                <div className="grid grid-cols-1 gap-2 pt-2">
                  <button className="w-full py-4 bg-green-600 rounded-xl font-bold text-sm active:scale-95 transition-transform">
                    Hoàn cọc cho Khách
                  </button>
                  <button className="w-full py-4 bg-blue-600 rounded-xl font-bold text-sm active:scale-95 transition-transform">
                    Trả cọc cho Thợ
                  </button>
                </div>
              ) : (
                <button className="w-full py-3 bg-white/10 rounded-xl font-bold text-sm text-slate-300">
                  Chỉ được xử lý khi có Khiếu nại
                </button>
              )}
           </div>
        )}

        {task.status === TaskStatus.OPEN && viewMode === 'CUSTOMER' && (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
             <h3 className="font-bold text-slate-800 pl-1">Báo giá từ thợ ({mockOffers.length})</h3>
             {mockOffers.map(offer => (
               <div key={offer.id} className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col gap-4">
                 <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                       <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold">
                         {offer.techName.charAt(0)}
                       </div>
                       <div>
                         <p className="font-bold text-slate-800 text-sm">{offer.techName}</p>
                         <div className="flex items-center gap-1 text-xs text-amber-500 font-bold">
                           <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                           {offer.techRating}
                         </div>
                       </div>
                    </div>
                    <div className="text-right">
                       <p className="font-black text-blue-600">{offer.price.toLocaleString('vi-VN')}đ</p>
                       <p className="text-[10px] text-slate-400 font-bold uppercase">Ước tính</p>
                    </div>
                 </div>
                 
                 <div className="flex items-center gap-2 text-slate-500 bg-slate-50 p-2 rounded-xl">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                    <span className="text-xs">Đến sau: <span className="font-bold text-slate-700">{offer.arrivalTime}</span></span>
                 </div>

                 <button 
                  onClick={() => onOfferSelect?.(offer)}
                  className="w-full py-3 bg-blue-50 text-blue-700 font-bold rounded-xl active:bg-blue-600 active:text-white transition-all"
                 >
                   Chọn thợ này
                 </button>
               </div>
             ))}
          </div>
        )}

        {task.status === TaskStatus.OPEN && viewMode === 'TECHNICIAN' && (
           <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-slate-100 max-w-md mx-auto z-20">
              <button 
                onClick={onMakeOfferClick}
                className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold shadow-lg"
              >
                Gửi báo giá ngay
              </button>
           </div>
        )}

        {task.status === TaskStatus.WAITING_FOR_TECH_DEPOSIT && (
          <div className="p-6 bg-amber-50 border border-amber-100 rounded-3xl space-y-6 text-center animate-in zoom-in duration-300">
             <div className="w-16 h-16 bg-white rounded-full mx-auto flex items-center justify-center text-amber-500 shadow-sm relative">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-spin-slow"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
             </div>
             <div className="space-y-2">
                <h3 className="text-xl font-black text-amber-800">Đang chờ thợ xác nhận</h3>
                <p className="text-sm text-amber-700 leading-relaxed px-4">
                  Thợ <span className="font-bold">{task.selectedOffer?.techName}</span> cần đặt cọc 50.000đ để bắt đầu công việc. 
                </p>
             </div>
             <button 
                onClick={onSimulateTechDeposit}
                className="text-[10px] font-bold text-amber-400 uppercase tracking-widest pt-4"
              >
                (Giả lập: Thợ đã cọc)
              </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskDetail;
