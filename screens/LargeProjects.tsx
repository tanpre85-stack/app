
import React, { useState } from 'react';
import { TenderItem } from '../types';

const MOCK_TENDERS: TenderItem[] = [
  {
    id: 't1',
    title: 'Thi công nội thất căn hộ 3 phòng ngủ (95m2)',
    category: 'INTERIOR',
    estimatedBudget: '250 - 400 triệu',
    location: 'Quận 2, TP.HCM',
    duration: '45 ngày',
    description: 'Cần đơn vị thầu thi công trọn gói nội thất phong cách Minimalist. Đã có bản vẽ 3D chi tiết.',
    posterName: 'Anh Hoàng',
    isVerified: true,
    createdAt: '1 ngày trước'
  },
  {
    id: 't2',
    title: 'Sửa chữa & Cải tạo nhà phố 2 tầng cũ',
    category: 'RENOVATION',
    estimatedBudget: '500 - 800 triệu',
    location: 'Quận Tân Bình, TP.HCM',
    duration: '60 ngày',
    description: 'Cải tạo toàn bộ mặt tiền, thay mái, đi lại hệ thống điện nước và sơn sửa nội thất.',
    posterName: 'Chị Mai',
    isVerified: true,
    createdAt: '3 giờ trước'
  }
];

const LargeProjects: React.FC = () => {
  const [filter, setFilter] = useState<'ALL' | TenderItem['category']>('ALL');

  const getCategoryLabel = (cat: TenderItem['category']) => {
    switch(cat) {
      case 'CONSTRUCTION': return 'Xây dựng';
      case 'INTERIOR': return 'Nội thất';
      case 'RENOVATION': return 'Cải tạo';
      case 'MAINTENANCE': return 'Bảo trì lớn';
      default: return 'Khác';
    }
  };

  return (
    <div className="space-y-6 animate-in slide-in-from-right duration-500 pb-10">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h3 className="text-xl font-black text-slate-800 uppercase tracking-tight">Đấu thầu Dự án</h3>
          <p className="text-xs text-slate-500 font-bold italic tracking-wide">Kết nối thầu chuyên nghiệp quy mô lớn.</p>
        </div>
        <button className="bg-slate-900 text-white px-5 py-3 rounded-2xl text-[10px] font-black uppercase shadow-xl shadow-slate-200 active:scale-95 transition-all">
          Đăng thầu
        </button>
      </div>

      {/* Improved Pricing Banner */}
      <div className="bg-gradient-to-r from-amber-500 to-amber-600 p-5 rounded-[32px] text-white shadow-lg shadow-amber-100 flex items-center gap-4">
         <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md border border-white/20 shadow-inner">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M6 3h12l4 6-10 13L2 9z"/><path d="M11 3 8 9l4 13 4-13-3-6"/><path d="M2 9h20"/></svg>
         </div>
         <div className="flex-1">
            <h4 className="text-xs font-black uppercase tracking-widest mb-0.5">Tin Thầu Tiêu Điểm</h4>
            <p className="text-[10px] font-medium text-amber-50 opacity-90 leading-tight">Chỉ 5.000đ/ngày để đưa dự án của bạn lên vị trí ưu tiên hàng đầu.</p>
         </div>
      </div>

      {/* Modern Filter Chips */}
      <div className="flex gap-2 overflow-x-auto scrollbar-hide no-scrollbar pb-1">
        {(['ALL', 'CONSTRUCTION', 'INTERIOR', 'RENOVATION', 'MAINTENANCE'] as const).map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`flex-shrink-0 px-4 py-2.5 rounded-xl text-[10px] font-black uppercase transition-all whitespace-nowrap ${filter === f ? 'bg-blue-600 text-white shadow-lg shadow-blue-100' : 'bg-white border border-slate-100 text-slate-500'}`}
          >
            {f === 'ALL' ? 'Tất cả' : getCategoryLabel(f)}
          </button>
        ))}
      </div>

      {/* Tender List with VIP Styling */}
      <div className="space-y-5">
        {MOCK_TENDERS.map(item => (
          <div key={item.id} className="bg-white rounded-[36px] p-6 border border-slate-100 shadow-sm relative group active:scale-[0.98] transition-all overflow-hidden">
             {/* VIP Glow */}
             <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl -mr-10 -mt-10" />
             
             <div className="relative">
                <div className="flex justify-between items-start mb-4">
                   <div className="flex items-center gap-2">
                      <span className="text-[9px] font-black px-2.5 py-1 bg-slate-900 text-white rounded-full uppercase tracking-tighter shadow-sm">
                         {getCategoryLabel(item.category)}
                      </span>
                      <div className="flex items-center gap-1 text-[9px] font-black text-blue-600 uppercase">
                         <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17l-5-5"/></svg>
                         VIP
                      </div>
                   </div>
                   <span className="text-[10px] font-bold text-slate-300 italic">Gia hạn sau 48h</span>
                </div>

                <h4 className="font-bold text-slate-800 text-base mb-2 group-hover:text-blue-600 transition-colors leading-tight">{item.title}</h4>
                <p className="text-xs text-slate-400 font-black uppercase tracking-widest mb-4">Ngân sách: <span className="text-blue-600">{item.estimatedBudget}</span></p>
                
                <div className="flex items-center justify-between pt-5 border-t border-slate-50">
                   <div className="flex items-center gap-1.5 text-slate-400">
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                      <span className="text-[10px] font-bold">{item.location}</span>
                   </div>
                   <button className="bg-slate-50 text-slate-800 px-5 py-2.5 rounded-xl text-[10px] font-black uppercase border border-slate-100 hover:bg-slate-900 hover:text-white transition-all">Gửi hồ sơ</button>
                </div>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LargeProjects;
