
import React, { useState } from 'react';
import { ViewMode } from '../types';

interface ProfileProps {
  viewMode: ViewMode;
  onBack: () => void;
  onWalletClick: () => void;
}

const Profile: React.FC<ProfileProps> = ({ viewMode, onBack, onWalletClick }) => {
  const [isVerified, setIsVerified] = useState(viewMode !== 'CUSTOMER');
  const [isPro, setIsPro] = useState(viewMode === 'TECHNICIAN');

  return (
    <div className="p-4 space-y-6 animate-in fade-in duration-500 pb-10">
      <div className="flex items-center gap-2 mb-2">
        <button onClick={onBack} className="p-2 -ml-2 text-slate-400 hover:text-slate-800 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        </button>
        <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Thiết lập tài khoản</span>
      </div>

      {/* Premium Wallet Card */}
      <button 
        onClick={onWalletClick}
        className={`w-full text-left relative overflow-hidden rounded-[36px] p-7 text-white shadow-2xl space-y-6 active:scale-[0.98] transition-all group ${viewMode === 'CUSTOMER' ? 'bg-gradient-to-br from-slate-800 to-slate-950' : 'bg-gradient-to-br from-orange-600 to-orange-900'}`}
      >
         {/* Decoration */}
         <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl -mr-10 -mt-10 group-hover:bg-white/20 transition-all" />
         
         <div className="relative flex justify-between items-center">
            <div className="flex items-center gap-2">
               <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-white"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>
               </div>
               <span className="text-[10px] font-black uppercase tracking-widest text-white/80">Ví Sửa Nhanh</span>
            </div>
            <span className="text-[10px] font-black text-white/40 uppercase">Ver 2.5</span>
         </div>
         
         <div className="relative flex justify-between items-end">
            <div className="space-y-1">
               <p className="text-4xl font-black tracking-tighter">150.000<span className="text-lg ml-1 font-bold text-white/60">đ</span></p>
               <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.5)]" />
                  <p className="text-[9px] text-green-400 font-bold uppercase tracking-tight">Tài khoản khả dụng</p>
               </div>
            </div>
            <div className="bg-white/10 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest backdrop-blur-md">Quản lý &rarr;</div>
         </div>
      </button>

      {/* Identity Card */}
      <div className="bg-white rounded-[32px] p-5 border border-slate-100 shadow-sm flex items-center gap-4">
        <div className="relative">
           <div className={`w-16 h-16 rounded-[24px] flex items-center justify-center text-slate-300 border border-slate-100 ${viewMode === 'TECHNICIAN' ? 'bg-orange-50' : 'bg-slate-50'}`}>
              {viewMode === 'TECHNICIAN' ? (
                 <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-orange-500"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
              ) : (
                 <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              )}
           </div>
           {isVerified && (
             <div className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-4 border-white flex items-center justify-center text-white shadow-sm ${viewMode === 'TECHNICIAN' ? 'bg-orange-600' : 'bg-blue-600'}`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17l-5-5"/></svg>
             </div>
           )}
        </div>
        <div className="flex-1 min-w-0">
           <div className="flex items-center gap-1.5">
              <h2 className="text-lg font-black text-slate-800 truncate">{viewMode === 'TECHNICIAN' ? 'Thợ Hùng' : 'Anh Tuấn'}</h2>
              {isPro && <span className="text-[8px] font-black px-1.5 py-0.5 bg-orange-100 text-orange-600 rounded-lg uppercase tracking-tighter">Gold Partner</span>}
           </div>
           <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">{viewMode === 'TECHNICIAN' ? 'Điện nước • Gia dụng' : 'Hàng xóm tin cậy'}</p>
        </div>
      </div>

      {/* TECHNICIAN PRO TOOLS */}
      {viewMode === 'TECHNICIAN' && (
        <div className="bg-orange-600 rounded-[36px] p-6 text-white space-y-4 shadow-xl shadow-orange-100 overflow-hidden relative">
           <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10" />
           <div className="relative space-y-1">
              <h3 className="text-base font-black uppercase tracking-tight">Nâng cấp thợ chuyên nghiệp</h3>
              <p className="text-[10px] text-orange-100 leading-tight">Mở khóa tính năng báo giá VIP, mua vật tư giá sỉ và nhận việc ưu tiên.</p>
           </div>
           <button className="relative w-full bg-white text-orange-600 py-3.5 rounded-2xl font-black text-xs uppercase tracking-widest active:scale-95 transition-all">
              Chỉ 99k / Tháng
           </button>
        </div>
      )}

      {/* Skill Badges for Technician */}
      {viewMode === 'TECHNICIAN' && (
        <div className="space-y-4">
           <h3 className="text-xs font-black text-slate-800 uppercase tracking-widest flex items-center gap-2">
              <span className="w-1 h-4 bg-orange-600 rounded-full"></span>
              Chứng chỉ & Kỹ năng
           </h3>
           <div className="flex gap-2 overflow-x-auto no-scrollbar scrollbar-hide">
              {[
                { label: 'Điện dân dụng', verified: true },
                { label: 'Lắp đặt điều hòa', verified: true },
                { label: 'Thông tắc bồn cầu', verified: false },
                { label: 'Sửa đồ gỗ', verified: false },
              ].map((skill, i) => (
                <div key={i} className={`flex-shrink-0 px-4 py-3 rounded-2xl border flex items-center gap-2 ${skill.verified ? 'bg-white border-slate-100 shadow-sm' : 'bg-slate-50 border-dashed border-slate-200 opacity-60'}`}>
                   <span className="text-[11px] font-bold text-slate-700">{skill.label}</span>
                   {skill.verified ? (
                     <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="#f97316" stroke="#fff" strokeWidth="2" className="rounded-full"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                   ) : (
                     <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-slate-300"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
                   )}
                </div>
              ))}
           </div>
        </div>
      )}

      {/* Modern Pricing Grid */}
      <div className="bg-white rounded-[36px] p-6 border border-slate-100 shadow-sm space-y-5">
         <h3 className="text-xs font-black text-slate-800 uppercase tracking-widest flex items-center gap-2">
            <span className={`w-1 h-4 rounded-full ${viewMode === 'CUSTOMER' ? 'bg-blue-600' : 'bg-orange-600'}`}></span>
            Biểu phí minh bạch
         </h3>
         <div className="grid grid-cols-1 gap-3">
            {[
              { label: 'Đăng việc lẻ', cost: '10k', sub: 'Thanh toán khi đăng tin', color: 'text-blue-600' },
              { label: 'Gửi báo giá lẻ', cost: '10k', sub: 'Chỉ thu khi có khách chọn', color: 'text-orange-600' },
              { label: 'Gói thầu VIP', cost: '5k/ngày', sub: 'Tiếp cận thầu chuyên nghiệp', color: 'text-amber-600' },
              { label: 'Mục thanh lý', cost: 'FREE', sub: 'Hỗ trợ cộng đồng hàng xóm', color: 'text-green-600' }
            ].map((item, idx) => (
              <div key={idx} className="flex justify-between items-center p-4 bg-slate-50 rounded-2xl border border-slate-100/50">
                 <div className="space-y-0.5">
                    <p className="text-xs font-black text-slate-700">{item.label}</p>
                    <p className="text-[10px] text-slate-400 font-medium">{item.sub}</p>
                 </div>
                 <span className={`text-sm font-black ${item.color}`}>{item.cost}</span>
              </div>
            ))}
         </div>
      </div>
    </div>
  );
};

export default Profile;
