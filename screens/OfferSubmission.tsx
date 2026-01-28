
import React, { useState } from 'react';
import { Task } from '../types';

interface OfferSubmissionProps {
  task: Task;
  onSubmit: (data: { price: number, arrivalTime: string, isPriority: boolean }) => void;
  onCancel: () => void;
}

const OfferSubmission: React.FC<OfferSubmissionProps> = ({ task, onSubmit, onCancel }) => {
  const [price, setPrice] = useState<string>('');
  const [time, setTime] = useState<string>('30 phút');
  const [isPriority, setIsPriority] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!price) return;
    onSubmit({ 
      price: parseInt(price), 
      arrivalTime: time,
      isPriority: isPriority
    });
  };

  return (
    <div className="p-4 space-y-8 animate-in slide-in-from-bottom-8 duration-500">
      <div className="space-y-2">
         <h2 className="text-2xl font-black text-slate-800">Gửi báo giá</h2>
         <p className="text-sm text-slate-500">Cho khách hàng biết giá dự kiến và thời gian bạn có mặt.</p>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
         <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Công việc</p>
         <h3 className="font-bold text-slate-800">{task.title}</h3>
         <div className="flex justify-between items-center mt-2 pt-2 border-t border-slate-50">
            <p className="text-xs text-slate-500">{task.location}</p>
            <div className="text-right">
              <span className="block text-[10px] font-bold text-slate-400 uppercase">Ngân sách khách</span>
              <span className="text-sm font-bold text-blue-600">{task.budget} VND</span>
            </div>
         </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-1.5">
           <label className="text-xs font-bold text-slate-500 uppercase">Báo giá của bạn (VNĐ)</label>
           <div className="relative">
              <input 
                type="number"
                placeholder="VD: 150000"
                value={price}
                onChange={e => setPrice(e.target.value)}
                autoFocus
                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-4 text-xl font-bold text-orange-600 focus:ring-2 focus:ring-orange-500 outline-none"
              />
              <span className="absolute right-4 top-5 font-bold text-slate-300">đ</span>
           </div>
        </div>

        <div className="space-y-1.5">
           <label className="text-xs font-bold text-slate-500 uppercase">Thời gian có mặt</label>
           <div className="grid grid-cols-2 gap-2">
              {['15 phút', '30 phút', '1 giờ', '2 giờ'].map(t => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTime(t)}
                  className={`py-3 rounded-xl border font-bold text-sm transition-all ${time === t ? 'bg-orange-600 border-orange-600 text-white shadow-md' : 'bg-white border-slate-200 text-slate-600'}`}
                >
                  {t}
                </button>
              ))}
           </div>
        </div>

        {/* PRO FEATURE: PRIORITY BID */}
        <div 
          onClick={() => setIsPriority(!isPriority)}
          className={`p-5 rounded-[28px] border-2 transition-all cursor-pointer flex items-center gap-4 ${isPriority ? 'bg-orange-50 border-orange-400' : 'bg-white border-slate-100 hover:border-orange-200'}`}
        >
           <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${isPriority ? 'bg-orange-600 text-white shadow-lg shadow-orange-100' : 'bg-slate-100 text-slate-400'}`}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="M20 12h2"/><path d="m19.07 19.07-1.41-1.41"/><path d="M12 22v-2"/><path d="m6.34 17.66-1.41 1.41"/><path d="M2 12h2"/><path d="m7.76 7.76 1.41 1.41"/><circle cx="12" cy="12" r="4"/></svg>
           </div>
           <div className="flex-1">
              <h4 className={`text-xs font-black uppercase tracking-tight ${isPriority ? 'text-orange-800' : 'text-slate-700'}`}>Báo giá nổi bật (+5k)</h4>
              <p className="text-[10px] text-slate-500 leading-tight">Báo giá của bạn sẽ nằm trên cùng danh sách thợ để khách hàng thấy trước.</p>
           </div>
           <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${isPriority ? 'bg-orange-600 border-orange-600' : 'border-slate-200'}`}>
              {isPriority && <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className="text-white"><polyline points="20 6 9 17l-5-5"/></svg>}
           </div>
        </div>

        <div className="bg-amber-50 border border-amber-100 p-4 rounded-2xl flex gap-3">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-600 flex-shrink-0"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
          <p className="text-xs text-amber-700 leading-relaxed">
            Hệ thống sẽ giữ <span className="font-bold text-orange-700">50.000đ</span> tiền cọc của bạn khi khách chọn báo giá này.
          </p>
        </div>

        <div className="pt-4 flex flex-col gap-2">
           <button 
            type="submit"
            className="w-full bg-orange-600 text-white py-4 rounded-2xl font-black uppercase tracking-widest text-sm shadow-xl shadow-orange-100 transition-transform active:scale-95"
           >
             Xác nhận gửi báo giá
           </button>
           <button 
            type="button"
            onClick={onCancel}
            className="w-full text-slate-400 font-bold py-3"
           >
             Hủy bỏ
           </button>
        </div>
      </form>
    </div>
  );
};

export default OfferSubmission;
