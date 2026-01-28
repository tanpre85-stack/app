
import React, { useState } from 'react';
import { MarketplaceItem } from '../types';

const MOCK_MARKETPLACE: MarketplaceItem[] = [
  { 
    id: 'm1', 
    title: 'Tặng tủ quần áo cũ còn tốt', 
    price: 'FREE', 
    type: 'GIFT', 
    location: 'Quận 1, TP.HCM', 
    image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=400&auto=format&fit=crop&q=60',
    ownerName: 'Chị Lan',
    createdAt: '2 giờ trước',
    description: 'Tủ gỗ ép 2 cánh, còn chắc chắn, chỉ hơi xước nhẹ ở góc. Tự vận chuyển.'
  },
  { 
    id: 'm2', 
    title: 'Thanh lý bàn làm việc IKEA', 
    price: 350000, 
    type: 'LIQUIDATION', 
    location: 'Quận 3, TP.HCM', 
    image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=400&auto=format&fit=crop&q=60',
    ownerName: 'Anh Bình',
    createdAt: '5 giờ trước',
    description: 'Bàn Linnmon trắng, chân đen. Mới 90%.'
  },
  { 
    id: 'm3', 
    title: 'Tặng bộ bát đĩa gốm sứ', 
    price: 'FREE', 
    type: 'GIFT', 
    location: 'Quận Bình Thạnh, TP.HCM', 
    image: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=400&auto=format&fit=crop&q=60',
    ownerName: 'Cô Ba',
    createdAt: '1 ngày trước',
    description: 'Dọn nhà thừa ra bộ bát đĩa khoảng 10 món. Tặng cho ai cần.'
  },
  { 
    id: 'm4', 
    title: 'Thanh lý máy pha cafe cầm tay', 
    price: 150000, 
    type: 'LIQUIDATION', 
    location: 'Quận 7, TP.HCM', 
    image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=400&auto=format&fit=crop&q=60',
    ownerName: 'Anh Tuấn',
    createdAt: '3 giờ trước',
    description: 'Wacaco Nanopresso còn hộp, dùng vài lần.'
  },
];

const CommunityMarketplace: React.FC = () => {
  const [filter, setFilter] = useState<'ALL' | 'GIFT' | 'LIQUIDATION'>('ALL');

  const filteredItems = filter === 'ALL' 
    ? MOCK_MARKETPLACE 
    : MOCK_MARKETPLACE.filter(item => item.type === filter);

  return (
    <div className="space-y-6 animate-in slide-in-from-right duration-500">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h3 className="text-lg font-black text-slate-800">Cộng đồng láng giềng</h3>
          <p className="text-xs text-slate-500 font-medium">Giao lưu đồ dùng không dùng tới.</p>
        </div>
        <button className="bg-blue-50 text-blue-600 px-4 py-2 rounded-2xl text-xs font-black uppercase shadow-sm active:scale-95 transition-all">
          Đăng tin
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2">
        <button 
          onClick={() => setFilter('ALL')}
          className={`flex-1 py-3 rounded-2xl text-[11px] font-black uppercase transition-all ${filter === 'ALL' ? 'bg-slate-800 text-white shadow-md' : 'bg-white border border-slate-200 text-slate-500'}`}
        >
          Tất cả
        </button>
        <button 
          onClick={() => setFilter('GIFT')}
          className={`flex-1 py-3 rounded-2xl text-[11px] font-black uppercase transition-all ${filter === 'GIFT' ? 'bg-orange-500 text-white shadow-md' : 'bg-white border border-slate-200 text-slate-500'}`}
        >
          🎁 Cho tặng
        </button>
        <button 
          onClick={() => setFilter('LIQUIDATION')}
          className={`flex-1 py-3 rounded-2xl text-[11px] font-black uppercase transition-all ${filter === 'LIQUIDATION' ? 'bg-green-600 text-white shadow-md' : 'bg-white border border-slate-200 text-slate-500'}`}
        >
          💰 Thanh lý
        </button>
      </div>

      {/* Items Grid */}
      <div className="grid grid-cols-2 gap-4">
        {filteredItems.map(item => (
          <div key={item.id} className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm active:scale-[0.98] transition-all flex flex-col">
            <div className="relative h-40">
              <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
              <div className={`absolute top-2 left-2 px-2 py-1 rounded-lg text-[9px] font-black uppercase text-white shadow-sm ${item.type === 'GIFT' ? 'bg-orange-500' : 'bg-green-600'}`}>
                {item.type === 'GIFT' ? 'Miễn phí' : 'Thanh lý'}
              </div>
            </div>
            
            <div className="p-3 flex flex-col flex-1 justify-between gap-2">
              <div>
                <h4 className="font-bold text-slate-800 text-xs line-clamp-2 leading-snug">{item.title}</h4>
                <p className="text-blue-600 font-black text-xs mt-1">
                  {item.price === 'FREE' ? 'Miễn phí' : `${item.price.toLocaleString('vi-VN')}đ`}
                </p>
              </div>
              
              <div className="pt-2 border-t border-slate-50 space-y-1">
                <div className="flex items-center gap-1 text-slate-400">
                  <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                  <span className="text-[9px] font-medium truncate">{item.location.split(',')[0]}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-bold text-slate-300 uppercase">{item.createdAt}</span>
                  <span className="text-[9px] font-black text-slate-400">@{item.ownerName}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="py-20 text-center">
           <p className="text-slate-400 text-sm font-medium">Chưa có tin đăng nào.</p>
        </div>
      )}

      {/* Safety Banner */}
      <div className="p-5 bg-orange-50 border border-orange-100 rounded-3xl space-y-2">
        <div className="flex items-center gap-2 text-orange-700">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
          <h4 className="font-bold text-xs uppercase">Mẹo giao dịch an toàn</h4>
        </div>
        <p className="text-[10px] text-orange-600 leading-relaxed">
          Nên giao lưu đồ tại nơi công cộng hoặc khu vực có camera. Sửa Nhanh không can thiệp vào các giao dịch cộng đồng này.
        </p>
      </div>
    </div>
  );
};

export default CommunityMarketplace;
