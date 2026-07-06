import React from 'react';
import { Select, Button, Popconfirm, Tooltip } from 'antd';
import { EditOutlined, DeleteOutlined, CalendarOutlined } from '@ant-design/icons';
import type { Task, TaskStatus } from '@/types/task';
import { formatDate } from '@/helpers/format-date';

interface TaskItemProps {
  task: Task;
  onChangeStatus: (task: Task, status: TaskStatus) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

export const TaskItem: React.FC<TaskItemProps> = ({
  task,
  onChangeStatus,
  onEdit,
  onDelete,
}) => {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const hasDescription = !!task.description?.trim();
  const isOverdue = !!(task.dueDate && new Date(task.dueDate) < new Date() && task.taskStatus !== 'COMPLETED');

  const getSelectStyle = (status: TaskStatus) => {
    switch (status) {
      case 'PENDING':
        return {
          color: '#334155',
          backgroundColor: '#f1f5f9',
          border: '1px solid #cbd5e1',
          fontWeight: 700,
          borderRadius: '8px',
        };
      case 'IN_PROGRESS':
        return {
          color: '#1d4ed8',
          backgroundColor: '#dbeafe',
          border: '1px solid #93c5fd',
          fontWeight: 700,
          borderRadius: '8px',
        };
      case 'COMPLETED':
        return {
          color: '#15803d',
          backgroundColor: '#dcfce7',
          border: '1px solid #86efac',
          fontWeight: 700,
          borderRadius: '8px',
        };
      default:
        return {};
    }
  };

  const statusOptions = [
    { value: 'PENDING', label: <span className="font-bold text-slate-700">Chưa bắt đầu</span> },
    { value: 'IN_PROGRESS', label: <span className="font-bold text-blue-700">Đang làm</span> },
    { value: 'COMPLETED', label: <span className="font-bold text-green-700">Đã xong</span> },
  ];

  return (
    <div
      className="flex flex-col p-4 mb-3 bg-white border border-slate-100 rounded-xl shadow-xs transition-all duration-200 hover:shadow-md hover:border-blue-100"
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 w-full">
        {/* Title & Created At */}
        <div
          className={`flex-1 min-w-0 ${hasDescription ? 'cursor-pointer select-none' : ''}`}
          onClick={() => hasDescription && setIsExpanded(!isExpanded)}
        >
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-base font-semibold text-slate-800 wrap-break-word max-w-full">
              {task.title}
            </h3>
            {hasDescription && (
              <span className="text-[10px] text-blue-500 hover:text-blue-600 font-medium shrink-0 bg-blue-50 px-1.5 py-0.5 rounded">
                {isExpanded ? 'Thu gọn' : 'Xem chi tiết'}
              </span>
            )}
          </div>
          <div className="flex items-center text-xs text-slate-400 gap-1 mt-1">
            <CalendarOutlined className={isOverdue ? 'text-red-500' : ''} />
            <span className={isOverdue ? 'text-red-500 font-semibold' : ''}>
              Hạn chót: {task.dueDate ? formatDate(task.dueDate) : 'N/A'}
              {isOverdue && (
                <span className="bg-red-50 text-red-600 px-1.5 py-0.5 rounded ml-1 font-bold text-[9px] uppercase tracking-wider animate-pulse">
                  Quá hạn
                </span>
              )}
            </span>
          </div>
        </div>

        {/* Status Dropdown & Actions */}
        <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-4 shrink-0 mt-2 sm:mt-0">
          <Select
            value={task.taskStatus}
            onChange={(newStatus) => onChangeStatus(task, newStatus)}
            options={statusOptions}
            style={{
              width: 130,
              ...getSelectStyle(task.taskStatus),
            }}
            variant="borderless"
            styles={{
              popup: {
                root: { borderRadius: '8px' }
              }
            }}
          />

          <div className="flex items-center gap-1">
            <Tooltip title="Chỉnh sửa">
              <Button
                type="text"
                icon={<EditOutlined className="text-slate-400 hover:text-blue-500" />}
                onClick={() => onEdit(task)}
              />
            </Tooltip>

            <Tooltip title="Xóa">
              <Popconfirm
                title="Xóa công việc"
                description="Bạn có chắc chắn muốn xóa công việc này không?"
                onConfirm={() => onDelete(task.id)}
                okText="Xóa"
                cancelText="Hủy"
                okButtonProps={{ danger: true }}
              >
                <Button
                  type="text"
                  danger
                  icon={<DeleteOutlined className="text-slate-400 hover:text-red-500" />}
                />
              </Popconfirm>
            </Tooltip>
          </div>
        </div>
      </div>

      {/* Description Expanded */}
      {isExpanded && hasDescription && (
        <div className="mt-3 pt-3 border-t border-slate-100 text-sm text-slate-500 whitespace-pre-wrap leading-relaxed animate-fadeIn">
          {task.description}
        </div>
      )}
    </div>
  );
};
