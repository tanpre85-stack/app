
import React, { useState } from 'react';
import { Task } from '../types';

interface DepositConfirmationProps {
  task: Task;
  onConfirm: () => void;
  onBack: () => void;
}

const DepositConfirmation: React.FC<DepositConfirmationProps> = ({ task, onConfirm, onBack }) => {
  const [acknowledged, setAcknowledged] = useState(false);

  return (
    <div className="p-4 flex flex-col min-h-[calc(100vh-64px)] justify-center">
      <div className="text-center mb-10 space-y-4">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-amber-100 rounded-full mb-2">
           <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-amber-600"><path d="M12 2v20"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
        </div>
        <h2 className="text-3xl font-black text-slate-800">50.000 VNĐ</h2>
        <p className="text-slate-500 font-medium">Đặt cọc để kích hoạt yêu cầu</p>
      </div>

      <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-6">
        <h3 className="font-bold text-slate-800 text-lg border-b border-slate-50 pb-3">Quy định cọc</h3>
        
        <ul className="space-y-4">
          <li className="flex gap-3">
            <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
               <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-green-600"><path d="M20 6 9 17l-5-5"/></svg>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">
              <span className="font-bold text-slate-800">Hoàn cọc 100%</span> sau khi bạn xác nhận thợ đã hoàn thành công việc.
            </p>
          </li>
          <li className="flex gap-3">
            <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
               <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-red-600"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">
              <span className="font-bold text-slate-800">Mất tiền cọc</span> nếu bạn tự ý hủy việc sau khi thợ đã được chọn.
            </p>
          </li>
          <li className="flex gap-3">
            <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
               <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600"><path d="m15 11-3 3-3-3"/><path d="M12 3v11"/><path d="M5 19h14"/></svg>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">
              Tiền cọc được giữ bởi hệ thống để đảm bảo trách nhiệm của cả hai bên.
            </p>
          </li>
        </ul>

        <label className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl cursor-pointer active:bg-slate-100 transition-colors">
          <input 
            type="checkbox" 
            checked={acknowledged}
            onChange={e => setAcknowledged(e.target.checked)}
            className="w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
          />
          <span className="text-sm font-semibold text-slate-700">Tôi đã đọc và đồng ý với quy định</span>
        </label>
      </div>

      <div className="mt-10 space-y-3">
        <button 
          onClick={onConfirm}
          disabled={!acknowledged}
          className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold shadow-lg shadow-blue-100 disabled:opacity-50 disabled:shadow-none transition-all"
        >
          Xác nhận đặt cọc
        </button>
        <button 
          onClick={onBack}
          className="w-full text-slate-400 font-bold py-3"
        >
          Quay lại
        </button>
      </div>
    </div>
  );
};

export default DepositConfirmation;
