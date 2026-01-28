
import React from 'react';
import { ViewMode } from '../types';

interface LoginProps {
  onLogin: (role: ViewMode) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  return (
    <div className="p-6 flex flex-col items-center justify-center min-h-screen bg-slate-50">
      <div className="text-center mb-10 space-y-2">
        <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white font-black italic text-2xl mx-auto shadow-lg shadow-blue-200">SN</div>
        <h1 className="text-2xl font-black text-slate-800">Sửa Nhanh</h1>
        <p className="text-sm text-slate-500 font-medium italic">Nền tảng sửa chữa tin cậy cho hàng xóm</p>
      </div>

      <div className="w-full space-y-4">
        <button onClick={() => onLogin('CUSTOMER')} className="w-full bg-white p-5 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-4 active:scale-[0.98] transition-all">
          <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          </div>
          <div className="text-left">
            <h3 className="font-black text-slate-800">Anh Tuấn</h3>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-tight">Vai trò: Khách hàng</p>
          </div>
        </button>

        <button onClick={() => onLogin('TECHNICIAN')} className="w-full bg-white p-5 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-4 active:scale-[0.98] transition-all">
          <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-600">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
          </div>
          <div className="text-left">
            <h3 className="font-black text-slate-800">Thợ Hùng</h3>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-tight">Vai trò: Người thợ</p>
          </div>
        </button>

        <button onClick={() => onLogin('ADMIN')} className="w-full bg-slate-800 p-5 rounded-3xl border border-slate-700 shadow-xl flex items-center gap-4 active:scale-[0.98] transition-all">
          <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-white">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
          </div>
          <div className="text-left text-white">
            <h3 className="font-black">Admin SN</h3>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-tight">Vai trò: Quản trị viên</p>
          </div>
        </button>
      </div>
    </div>
  );
};

export default Login;
