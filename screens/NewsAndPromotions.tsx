
import React, { useState } from 'react';
import { NewsItem } from '../types';

const MOCK_NEWS: NewsItem[] = [
  {
    id: 'n1',
    title: 'Khuyến mãi: Giảm 20% dịch vụ Vệ sinh máy lạnh',
    excerpt: 'Chào đón mùa hè rực rỡ, Sửa Nhanh ưu đãi giảm ngay 20% cho tất cả đơn hàng vệ sinh máy lạnh từ ngày 15/06 đến 30/06.',
    type: 'PROMO',
    image: 'https://images.unsplash.com/photo-1621905252507-b354bcadcabc?w=600&auto=format&fit=crop&q=60',
    date: '10/06/2024',
    badge: 'HOT'
  },
  {
    id: 'n2',
    title: 'Mẹo bảo quản thiết bị điện mùa mưa bão',
    excerpt: 'Làm thế nào để đảm bảo an toàn cho các thiết bị điện tử trong nhà khi mùa mưa bão đang đến gần? Xem ngay các lưu ý quan trọng.',
    type: 'TIPS',
    image: 'https://images.unsplash.com/photo-1516550893923-42d28e5677af?w=600&auto=format&fit=crop&q=60',
    date: '08/06/2024'
  },
  {
    id: 'n3',
    title: 'Cập nhật tính năng: Xác thực căn cước công dân cho thợ',
    excerpt: 'Để tăng cường bảo mật và tin cậy, Sửa Nhanh chính thức ra mắt tính năng xác thực danh tính thợ bằng CCCD.',
    type: 'NEWS',
    image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600&auto=format&fit=crop&q=60',
    date: '05/06/2024'
  },
  {
    id: 'n4',
    title: 'Ưu đãi Hoàn Tiền 10k khi giới thiệu hàng xóm',
    excerpt: 'Chia sẻ Sửa Nhanh cho bạn bè và hàng xóm, nhận ngay 10.000đ vào ví khi người được giới thiệu hoàn thành đơn hàng đầu tiên.',
    type: 'PROMO',
    image: 'https://images.unsplash.com/photo-1556742044-3c52d6e88c02?w=600&auto=format&fit=crop&q=60',
    date: '01/06/2024',
    badge: 'NEW'
  }
];

const NewsAndPromotions: React.FC = () => {
  const [filter, setFilter] = useState<'ALL' | 'PROMO' | 'NEWS' | 'TIPS'>('ALL');

  const filteredNews = filter === 'ALL' 
    ? MOCK_NEWS 
    : MOCK_NEWS.filter(item => item.type === filter);

  const getBadgeColor = (type: string) => {
    switch (type) {
      case 'PROMO': return 'bg-red-500';
      case 'NEWS': return 'bg-blue-600';
      case 'TIPS': return 'bg-green-600';
      default: return 'bg-slate-500';
    }
  };

  const getBadgeText = (type: string) => {
    switch (type) {
      case 'PROMO': return 'Ưu đãi';
      case 'NEWS': return 'Tin tức';
      case 'TIPS': return 'Mẹo vặt';
      default: return 'Khác';
    }
  };

  return (
    <div className="space-y-6 animate-in slide-in-from-right duration-500 pb-10">
      <div className="space-y-1">
        <h3 className="text-lg font-black text-slate-800">Tin tức & Khuyến mãi</h3>
        <p className="text-xs text-slate-500 font-medium">Cập nhật những thông báo mới nhất từ Sửa Nhanh.</p>
      </div>

      {/* Filter Chips */}
      <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
        {(['ALL', 'PROMO', 'NEWS', 'TIPS'] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`flex-shrink-0 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-wider transition-all ${filter === f ? 'bg-slate-800 text-white' : 'bg-white border border-slate-200 text-slate-500'}`}
          >
            {f === 'ALL' ? 'Tất cả' : getBadgeText(f)}
          </button>
        ))}
      </div>

      {/* News List */}
      <div className="space-y-6">
        {filteredNews.map(item => (
          <div key={item.id} className="bg-white rounded-[32px] overflow-hidden border border-slate-100 shadow-sm active:scale-[0.98] transition-transform">
            <div className="relative h-44 overflow-hidden">
               <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
               <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-[9px] font-black uppercase text-white shadow-sm ${getBadgeColor(item.type)}`}>
                  {getBadgeText(item.type)}
               </div>
               {item.badge && (
                 <div className="absolute top-4 right-4 px-2 py-1 rounded-lg text-[9px] font-black uppercase bg-amber-400 text-amber-900 shadow-sm animate-pulse">
                    {item.badge}
                 </div>
               )}
            </div>
            
            <div className="p-5 space-y-3">
               <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{item.date}</span>
                  <div className="flex gap-1">
                     <div className="w-1 h-1 rounded-full bg-slate-200" />
                     <div className="w-1 h-1 rounded-full bg-slate-200" />
                     <div className="w-1 h-1 rounded-full bg-slate-200" />
                  </div>
               </div>
               
               <h4 className="font-bold text-slate-800 text-base leading-tight">
                  {item.title}
               </h4>
               
               <p className="text-sm text-slate-500 line-clamp-3 leading-relaxed">
                  {item.excerpt}
               </p>
               
               <div className="pt-2">
                  <button className="text-xs font-black text-blue-600 uppercase tracking-wider flex items-center gap-1">
                    Xem chi tiết
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                  </button>
               </div>
            </div>
          </div>
        ))}
        
        {filteredNews.length === 0 && (
          <div className="py-20 text-center">
             <p className="text-slate-400 text-sm font-medium">Hiện tại chưa có tin mới.</p>
          </div>
        )}
      </div>

      {/* Newsletter Subscription Card */}
      <div className="bg-blue-600 rounded-[32px] p-6 text-white space-y-4 shadow-xl shadow-blue-100">
         <div className="space-y-1 text-center">
            <h4 className="font-black text-lg">Không bỏ lỡ ưu đãi nào!</h4>
            <p className="text-[11px] text-blue-100">Nhận thông báo trực tiếp khi có khuyến mãi sốc quanh bạn.</p>
         </div>
         <div className="relative">
            <input 
              type="email" 
              placeholder="Email hoặc số điện thoại"
              className="w-full bg-white/10 border border-white/20 rounded-2xl px-4 py-4 text-sm placeholder:text-white/50 outline-none focus:ring-2 focus:ring-white/40 transition-all"
            />
            <button className="absolute right-2 top-2 bottom-2 bg-white text-blue-600 px-4 rounded-xl font-bold text-xs active:scale-95 transition-transform">
               Đăng ký
            </button>
         </div>
      </div>
    </div>
  );
};

export default NewsAndPromotions;
