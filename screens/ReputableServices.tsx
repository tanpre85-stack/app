
import React, { useState } from 'react';
import { Service } from '../types';

const MOCK_SERVICES: Service[] = [
  { id: 's1', name: 'Vệ sinh máy lạnh (Trelo)', category: 'Máy lạnh/Máy giặt', price: '150.000', provider: 'SN Standard', rating: 4.9, reviews: 1240 },
  { id: 's2', name: 'Vệ sinh máy giặt cửa trên', category: 'Máy lạnh/Máy giặt', price: '250.000', provider: 'SN Standard', rating: 4.8, reviews: 850 },
  { id: 's3', name: 'Giặt hấp Sofa nỉ/da', category: 'Giặt Sofa', price: '350.000', provider: 'CleanPro', rating: 5.0, reviews: 120 },
  { id: 's4', name: 'Giặt là ký kg (Giao nhận)', category: 'Giặt là', price: '15.000/kg', provider: 'LaundryHub', rating: 4.7, reviews: 3400 },
  { id: 's5', name: 'Vệ sinh rèm cửa', category: 'Khác', price: '200.000', provider: 'CleanPro', rating: 4.6, reviews: 88 },
  { id: 's6', name: 'Khử khuẩn đệm ngủ', category: 'Giặt Sofa', price: '300.000', provider: 'SafeHome', rating: 4.9, reviews: 215 },
];

const CATEGORIES = ['Tất cả', 'Máy lạnh/Máy giặt', 'Giặt Sofa', 'Giặt là', 'Khác'];

const ReputableServices: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('Tất cả');

  const filteredServices = activeCategory === 'Tất cả' 
    ? MOCK_SERVICES 
    : MOCK_SERVICES.filter(s => s.category === activeCategory);

  return (
    <div className="space-y-6 animate-in slide-in-from-right duration-500">
      <div className="space-y-2">
        <h3 className="text-lg font-black text-slate-800">Dịch vụ chuẩn SN</h3>
        <p className="text-xs text-slate-500 font-medium">Các gói dịch vụ được định giá sẵn từ đối tác uy tín.</p>
      </div>

      {/* Category Filter */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`flex-shrink-0 px-4 py-2 rounded-full text-[11px] font-bold uppercase tracking-wider transition-all ${activeCategory === cat ? 'bg-blue-600 text-white shadow-md' : 'bg-white border border-slate-200 text-slate-500'}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Service List */}
      <div className="grid grid-cols-1 gap-4">
        {filteredServices.map(service => (
          <div key={service.id} className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4 active:scale-[0.98] transition-all">
            <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-blue-600 flex-shrink-0">
               {service.category === 'Máy lạnh/Máy giặt' && <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="M20 12h2"/><path d="m19.07 19.07-1.41-1.41"/><path d="M12 22v-2"/><path d="m6.34 17.66-1.41 1.41"/><path d="M2 12h2"/><path d="m7.76 7.76 1.41 1.41"/><circle cx="12" cy="12" r="4"/></svg>}
               {service.category === 'Giặt Sofa' && <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 9V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v3"/><rect x="2" y="9" width="20" height="8" rx="2"/><path d="M4 17v2a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-2"/></svg>}
               {service.category === 'Giặt là' && <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>}
               {service.category === 'Khác' && <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>}
            </div>
            
            <div className="flex-1 min-w-0">
               <div className="flex items-center gap-1 mb-0.5">
                  <span className="text-[9px] font-bold px-1.5 py-0.5 bg-blue-50 text-blue-600 rounded uppercase">{service.provider}</span>
                  <div className="flex items-center gap-0.5 text-amber-500">
                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                    <span className="text-[10px] font-bold">{service.rating}</span>
                  </div>
               </div>
               <h4 className="font-bold text-slate-800 text-sm truncate">{service.name}</h4>
               <p className="text-blue-600 font-black text-sm mt-0.5">{service.price} VNĐ</p>
            </div>

            <button className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-active:text-blue-600 transition-colors">
               <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
            </button>
          </div>
        ))}
      </div>

      <div className="p-5 bg-slate-800 rounded-3xl text-white space-y-3 shadow-xl">
         <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-blue-400">
               <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            </div>
            <h4 className="font-bold text-sm">Cam kết từ Sửa Nhanh</h4>
         </div>
         <p className="text-[11px] text-slate-400 leading-relaxed">
            Các dịch vụ này được kiểm soát chất lượng nghiêm ngặt bởi đội ngũ quản trị SN. Giá cả niêm yết rõ ràng, không phát sinh chi phí ẩn.
         </p>
         <div className="pt-2">
            <button className="text-xs font-bold text-blue-400">Xem thêm chính sách bảo hành &rarr;</button>
         </div>
      </div>
    </div>
  );
};

export default ReputableServices;
