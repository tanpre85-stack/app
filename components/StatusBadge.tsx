
import React from 'react';
import { TaskStatus } from '../types';

const StatusBadge = ({ status }: { status: TaskStatus }) => {
  const labels = {
    [TaskStatus.OPEN]: 'Đang tìm thợ',
    [TaskStatus.PENDING_CUSTOMER_DEPOSIT]: 'Chờ cọc',
    [TaskStatus.WAITING_FOR_TECH_DEPOSIT]: 'Đợi thợ cọc',
    [TaskStatus.IN_PROGRESS]: 'Đang sửa',
    [TaskStatus.COMPLETED]: 'Hoàn thành',
    [TaskStatus.DISPUTED]: 'Khiếu nại',
  };
  return (
    <span className="px-2 py-1 bg-blue-50 text-blue-600 rounded-full text-[10px] font-black uppercase">
      {labels[status]}
    </span>
  );
};
export default StatusBadge;
