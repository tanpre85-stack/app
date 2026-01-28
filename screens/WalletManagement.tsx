
import React, { useState } from 'react';
import { Transaction, BankAccount } from '../types';

interface WalletManagementProps {
  onBack: () => void;
}

const WalletManagement: React.FC<WalletManagementProps> = ({ onBack }) => {
  const [balance, setBalance] = useState(150000);
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [showBankModal, setShowBankModal] = useState(false);
  
  const [linkedBank, setLinkedBank] = useState<BankAccount | null>({
    bankName: 'Vietcombank',
    accountNumber: '**** **** 1234',
    accountName: 'NGUYEN VAN TUAN',
    logo: 'https://vcb-api.com/logo.png' // Giả lập
  });

  const [transactions] = useState<Transaction[]>([
    { id: 'tx1', type: 'REFUND', amount: 50000, status: 'SUCCESS', date: 'Hôm nay, 14:20', description: 'Hoàn tiền cọc việc #1024' },
    { id: 'tx2', type: 'PAYMENT', amount: 10000, status: 'SUCCESS', date: 'Hôm qua, 09:15', description: 'Phí đăng tin sửa vòi nước' },
    { id: 'tx3', type: 'DEPOSIT', amount: 200000, status: 'SUCCESS', date: '02/06/2024', description: 'Nạp tiền từ ngân hàng liên kết' },
  ]);

  return (
    <div className="p-4 space-y-6 animate-in slide-in-from-right duration-500 pb-20">
      <div className="flex items-center gap-2 mb-2">
        <button onClick={onBack} className="p-2 -ml-2 text-slate-400 hover:text-slate-800">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        </button>
        <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Quản lý ví & Ngân hàng</span>
      </div>

      {/* Main Balance Display */}
      <div className="bg-white rounded-[40px] p-8 border border-slate-100 shadow-sm text-center space-y-2">
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Số dư khả dụng</p>
        <h2 className="text-4xl font-black text-slate-800">{balance.toLocaleString('vi-VN')}đ</h2>
        <div className="pt-6 grid grid-cols-2 gap-3">
          <button 
            onClick={() => setShowDepositModal(true)}
            className="flex flex-col items-center gap-2 p-4 bg-blue-50 text-blue-600 rounded-3xl active:scale-95 transition-all"
          >
            <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-lg shadow-blue-100">
               <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14"/><path d="M5 12h14"/></svg>
            </div>
            <span className="text-xs font-black uppercase">Nạp tiền</span>
          </button>
          <button 
            onClick={() => setShowWithdrawModal(true)}
            className="flex flex-col items-center gap-2 p-4 bg-slate-50 text-slate-600 rounded-3xl active:scale-95 transition-all"
          >
            <div className="w-10 h-10 bg-slate-800 text-white rounded-full flex items-center justify-center shadow-lg shadow-slate-100">
               <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19V5"/><path d="m5 12 7-7 7 7"/></svg>
            </div>
            <span className="text-xs font-black uppercase">Rút tiền</span>
          </button>
        </div>
      </div>

      {/* Linked Bank Section */}
      <div className="space-y-3">
        <h3 className="text-xs font-black text-slate-800 uppercase tracking-widest pl-1">Ngân hàng liên kết</h3>
        {linkedBank ? (
          <div className="bg-white p-5 rounded-[32px] border border-slate-100 shadow-sm flex items-center justify-between group active:bg-slate-50 transition-colors cursor-pointer" onClick={() => setShowBankModal(true)}>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-green-600 font-black text-xs border border-slate-100">
                VCB
              </div>
              <div>
                <h4 className="font-black text-slate-800 text-sm uppercase">{linkedBank.bankName}</h4>
                <p className="text-xs text-slate-400 font-bold">{linkedBank.accountNumber}</p>
              </div>
            </div>
            <div className="text-blue-600 font-bold text-xs uppercase">Thay đổi</div>
          </div>
        ) : (
          <button 
            onClick={() => setShowBankModal(true)}
            className="w-full bg-white p-6 rounded-[32px] border-2 border-dashed border-slate-200 text-slate-400 font-black text-xs uppercase flex items-center justify-center gap-2 hover:border-blue-400 hover:text-blue-600 transition-all"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
            Liên kết tài khoản ngân hàng
          </button>
        )}
      </div>

      {/* Transaction History */}
      <div className="space-y-4">
        <h3 className="text-xs font-black text-slate-800 uppercase tracking-widest pl-1">Lịch sử giao dịch</h3>
        <div className="space-y-3">
          {transactions.map(tx => (
            <div key={tx.id} className="bg-white p-4 rounded-[28px] border border-slate-100 shadow-sm flex items-center gap-4">
               <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${tx.type === 'DEPOSIT' || tx.type === 'REFUND' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                  {tx.type === 'DEPOSIT' || tx.type === 'REFUND' ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m12 5 7 7-7 7"/><path d="M5 12h14"/></svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
                  )}
               </div>
               <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-slate-800 truncate">{tx.description}</h4>
                  <p className="text-[10px] text-slate-400 font-medium">{tx.date}</p>
               </div>
               <div className="text-right">
                  <p className={`text-sm font-black ${tx.type === 'DEPOSIT' || tx.type === 'REFUND' ? 'text-green-600' : 'text-slate-800'}`}>
                    {tx.type === 'DEPOSIT' || tx.type === 'REFUND' ? '+' : '-'}{tx.amount.toLocaleString('vi-VN')}đ
                  </p>
                  <p className="text-[9px] font-black text-slate-300 uppercase tracking-tighter">Thành công</p>
               </div>
            </div>
          ))}
        </div>
      </div>

      {/* Security Tip */}
      <div className="bg-slate-900 rounded-[32px] p-6 text-white space-y-3 flex items-start gap-4 shadow-xl">
         <div className="w-10 h-10 bg-blue-500/20 rounded-2xl flex items-center justify-center text-blue-400 flex-shrink-0 backdrop-blur-md">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
         </div>
         <div>
            <h4 className="text-[11px] font-black uppercase tracking-widest text-blue-300">Bảo mật đa tầng</h4>
            <p className="text-[10px] text-slate-400 leading-relaxed mt-1">Mọi giao dịch nạp rút đều được bảo vệ bởi công nghệ mã hóa AES-256 và yêu cầu xác thực sinh trắc học hoặc OTP.</p>
         </div>
      </div>

      {/* Modals Simulation */}
      {showDepositModal && (
        <div className="fixed inset-0 z-[100] flex items-end justify-center bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
           <div className="w-full max-w-md bg-white rounded-t-[40px] p-8 space-y-6 animate-in slide-in-from-bottom duration-500">
              <div className="flex justify-between items-center">
                 <h3 className="text-xl font-black text-slate-800">Nạp tiền vào ví</h3>
                 <button onClick={() => setShowDepositModal(false)} className="p-2 bg-slate-50 rounded-full text-slate-400">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                 </button>
              </div>
              <div className="grid grid-cols-3 gap-2">
                 {[50000, 100000, 200000, 500000, 1000000, 'Số khác'].map((amt, i) => (
                   <button key={i} className={`p-4 rounded-2xl border font-bold text-xs flex items-center justify-center transition-all ${amt === 100000 ? 'bg-blue-600 border-blue-600 text-white shadow-lg' : 'bg-white border-slate-100 text-slate-600 active:bg-slate-50'}`}>
                      {typeof amt === 'number' ? `${amt / 1000}K` : amt}
                   </button>
                 ))}
              </div>
              <div className="space-y-3 pt-4">
                 <div className="flex justify-between items-center text-xs text-slate-400 font-bold uppercase tracking-tight">Thanh toán qua</div>
                 <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                       <div className="w-8 h-8 bg-white border border-slate-100 rounded-lg flex items-center justify-center font-black text-[8px]">VCB</div>
                       <span className="text-sm font-bold text-slate-700">Vietcombank (...1234)</span>
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-slate-300"><path d="m9 18 6-6-6-6"/></svg>
                 </div>
              </div>
              <button 
                onClick={() => {
                  alert('Giả lập: Đã nạp thành công 100.000đ');
                  setBalance(balance + 100000);
                  setShowDepositModal(false);
                }}
                className="w-full bg-blue-600 text-white py-5 rounded-[24px] font-black uppercase tracking-widest text-sm shadow-xl shadow-blue-100 active:scale-95 transition-all"
              >
                 Xác nhận nạp tiền
              </button>
           </div>
        </div>
      )}
    </div>
  );
};

export default WalletManagement;
