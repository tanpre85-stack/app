
import React, { useState } from 'react';
import { Task } from '../types';

interface CompletionRatingProps {
  task: Task;
  onFinish: (rating: number) => void;
}

const CompletionRating: React.FC<CompletionRatingProps> = ({ task, onFinish }) => {
  const [rating, setRating] = useState(0);

  return (
    <div className="p-4 flex flex-col min-h-[calc(100vh-64px)] justify-center text-center space-y-8 animate-in slide-in-from-bottom-12 duration-500">
       <div className="space-y-3">
          <div className="w-20 h-20 bg-green-100 rounded-full mx-auto flex items-center justify-center text-green-600 mb-2">
             <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
          </div>
          <h2 className="text-2xl font-black text-slate-800">Hoàn thành việc!</h2>
          <p className="text-slate-500 px-8">Hãy đánh giá dịch vụ của thợ để hệ thống hoàn tất các thủ tục tài chính.</p>
       </div>

       <div className="bg-white rounded-[40px] p-8 border border-slate-100 shadow-sm space-y-8">
          <div className="flex justify-center gap-2">
            {[1, 2, 3, 4, 5].map(star => (
              <button key={star} onClick={() => setRating(star)} className="active:scale-125 transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 24 24" fill={rating >= star ? '#f59e0b' : 'none'} stroke={rating >= star ? '#f59e0b' : '#e2e8f0'} strokeWidth="1.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
              </button>
            ))}
          </div>

          <div className="pt-6 border-t border-slate-50 space-y-4">
             <div className="flex items-center gap-3 text-left">
                <div className="w-10 h-10 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 font-black text-xs">50K</div>
                <div>
                   <h4 className="text-xs font-black text-slate-800 uppercase tracking-tighter">Hoàn trả tiền cọc</h4>
                   <p className="text-[10px] text-slate-500">Tiền cọc sẽ được cộng lại vào ví Sửa Nhanh của bạn ngay lập tức.</p>
                </div>
             </div>
             
             {/* Info for Technician in their perspective (Logic handled via ViewMode usually) */}
             <div className="bg-slate-50 p-4 rounded-2xl text-left border border-slate-100">
                <p className="text-[10px] text-slate-500 italic leading-snug">
                   <span className="font-black text-slate-700 uppercase block mb-1">Ghi chú cho thợ:</span>
                   Phí dịch vụ 10.000đ sẽ được khấu trừ từ tiền cọc sau khi công việc hoàn thành thành công.
                </p>
             </div>
          </div>
       </div>

       <button 
          onClick={() => onFinish(rating)}
          disabled={rating === 0}
          className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold shadow-lg disabled:opacity-50 transition-all"
       >
          Xác nhận & Đóng việc
       </button>
    </div>
  );
};

export default CompletionRating;
