
import React, { useState, useRef } from 'react';

interface CreateTaskProps {
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

const CreateTask: React.FC<CreateTaskProps> = ({ onSubmit, onCancel }) => {
  const [step, setStep] = useState(1);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState({
    title: '',
    category: 'Điện nước',
    description: '',
    budget: '',
    location: '',
    images: [] as string[]
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      Array.from(files).forEach((file: File) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setFormData(prev => ({
            ...prev,
            images: [...prev.images, reader.result as string].slice(0, 5)
          }));
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const nextStep = () => {
    if (step === 1 && (!formData.title || !formData.budget)) return;
    if (step === 2 && !formData.location) return;
    setStep(step + 1);
  };

  return (
    <div className="p-4 flex flex-col min-h-[calc(100vh-64px)]">
      {/* Progress Bar */}
      <div className="flex gap-2 mb-8">
        {[1, 2, 3].map(i => (
          <div key={i} className={`h-1.5 flex-1 rounded-full transition-colors ${step >= i ? 'bg-blue-600' : 'bg-slate-200'}`} />
        ))}
      </div>

      <div className="flex-1">
        {step === 1 && (
          <div className="space-y-6 animate-in slide-in-from-right duration-300">
            <div>
              <h2 className="text-2xl font-bold text-slate-800 mb-2">Bạn cần sửa gì?</h2>
              <p className="text-slate-500 text-sm">Mô tả ngắn gọn vấn đề để thợ dễ hiểu.</p>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase">Tên công việc</label>
                <input 
                  autoFocus
                  placeholder="VD: Sửa bồn cầu rò nước" 
                  value={formData.title}
                  onChange={e => setFormData({...formData, title: e.target.value})}
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none transition-all text-slate-800"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase">Chi phí mong muốn (VND)</label>
                <input 
                  placeholder="VD: 100k - 200k hoặc 150.000" 
                  value={formData.budget}
                  onChange={e => setFormData({...formData, budget: e.target.value})}
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none transition-all text-slate-800"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase">Ảnh hiện trạng (Tối đa 5 ảnh)</label>
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                  <button 
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="flex-shrink-0 w-24 h-24 border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center gap-1 text-slate-400 hover:border-blue-400 hover:text-blue-500 transition-colors bg-white"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>
                    <span className="text-[10px] font-bold uppercase">Thêm ảnh</span>
                  </button>
                  <input type="file" ref={fileInputRef} onChange={handleImageChange} accept="image/*" multiple className="hidden" />
                  {formData.images.map((img, idx) => (
                    <div key={idx} className="relative flex-shrink-0 w-24 h-24">
                      <img src={img} className="w-full h-full object-cover rounded-2xl border border-slate-100" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6 animate-in slide-in-from-right duration-300">
            <div>
              <h2 className="text-2xl font-bold text-slate-800 mb-2">Địa chỉ sửa chữa</h2>
              <p className="text-slate-500 text-sm">Thợ sẽ đến địa chỉ này để kiểm tra.</p>
            </div>
            
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase">Vị trí</label>
              <input 
                autoFocus
                placeholder="Số nhà, tên đường, quận..." 
                value={formData.location}
                onChange={e => setFormData({...formData, location: e.target.value})}
                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none transition-all text-slate-800"
              />
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6 animate-in slide-in-from-right duration-300">
            <div>
              <h2 className="text-2xl font-bold text-slate-800 mb-2">Thanh toán & Đăng tin</h2>
              <p className="text-slate-500 text-sm">Chi tiết các khoản phí để bắt đầu tìm thợ.</p>
            </div>
            
            <div className="bg-white rounded-[32px] p-6 border border-slate-100 shadow-sm space-y-5">
              <div className="space-y-3">
                 <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-500">Phí kết nối thợ (1 lần)</span>
                    <span className="font-bold text-slate-800">10.000đ</span>
                 </div>
                 <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-500">Tiền đặt cọc (hoàn lại)</span>
                    <span className="font-bold text-slate-800">50.000đ</span>
                 </div>
                 <div className="pt-3 border-t border-dashed border-slate-200 flex justify-between items-center">
                    <span className="font-bold text-slate-800">Tổng cộng thanh toán</span>
                    <span className="font-black text-blue-600 text-xl">60.000đ</span>
                 </div>
              </div>

              <div className="p-4 bg-blue-50 rounded-2xl">
                 <p className="text-[10px] text-blue-700 leading-relaxed italic">
                    * Tiền cọc 50k sẽ được hoàn trả vào ví Sửa Nhanh của bạn ngay sau khi thợ hoàn thành công việc và bạn đánh giá thợ.
                 </p>
              </div>
            </div>

            <div className="bg-white rounded-[32px] p-5 border border-slate-100">
               <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Tóm tắt công việc</span>
               <h3 className="font-bold text-slate-800 mt-1">{formData.title}</h3>
               <p className="text-xs text-slate-500 mt-1 line-clamp-1">{formData.location}</p>
            </div>
          </div>
        )}
      </div>

      <div className="mt-8 flex gap-3">
        {step > 1 ? (
          <button onClick={() => setStep(step - 1)} className="flex-1 py-4 text-slate-600 font-bold">Quay lại</button>
        ) : (
          <button onClick={onCancel} className="flex-1 py-4 text-slate-400 font-bold">Hủy</button>
        )}
        
        {step < 3 ? (
          <button onClick={nextStep} className="flex-[2] bg-blue-600 text-white py-4 rounded-2xl font-bold shadow-lg shadow-blue-100">Tiếp theo</button>
        ) : (
          <button onClick={() => onSubmit(formData)} className="flex-[2] bg-blue-600 text-white py-4 rounded-2xl font-bold shadow-lg shadow-blue-100">Thanh toán & Đăng</button>
        )}
      </div>
    </div>
  );
};

export default CreateTask;
