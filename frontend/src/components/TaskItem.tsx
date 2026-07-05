import React from 'react';
import { Checkbox, Tag, Button, Popconfirm, Tooltip } from 'antd';
import { EditOutlined, DeleteOutlined, CalendarOutlined } from '@ant-design/icons';
import type { Task } from '@/types/task';
import { formatDate } from '@/helpers/forma-date';

interface TaskItemProps {
  task: Task;
  onToggleStatus: (task: Task) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

export const TaskItem: React.FC<TaskItemProps> = ({
  task,
  onToggleStatus,
  onEdit,
  onDelete,
}) => {
  const isCompleted = task.taskStatus === 'COMPLETED';

  const getStatusTag = (status: Task['taskStatus']) => {
    switch (status) {
      case 'PENDING':
        return <Tag color="default">Chưa bắt đầu</Tag>;
      case 'IN_PROGRESS':
        return <Tag color="processing">Đang làm</Tag>;
      case 'COMPLETED':
        return <Tag color="success">Đã xong</Tag>;
      default:
        return null;
    }
  };

  return (
    <div
      className={`flex items-start justify-between p-4 mb-3 bg-white border border-slate-100 rounded-xl shadow-xs transition-all duration-200 hover:shadow-md hover:border-blue-100 ${isCompleted ? 'bg-slate-50/70 border-slate-100' : ''
        }`}
    >
      <div className="flex items-start flex-1 gap-3 min-w-0">
        <div className="pt-0.5">
          <Checkbox
            checked={isCompleted}
            onChange={() => onToggleStatus(task)}
            className="scale-110"
          />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <h3
              className={`text-base font-semibold text-slate-800 wrap-break-word ${isCompleted ? 'line-through text-slate-400 font-medium' : ''
                }`}
            >
              {task.title}
            </h3>
            {getStatusTag(task.taskStatus)}
          </div>

          {task.description && (
            <p
              className={`text-sm text-slate-500 mb-2 whitespace-pre-wrap ${isCompleted ? 'text-slate-400/80 line-through' : ''
                }`}
            >
              {task.description}
            </p>
          )}

          <div className="flex items-center text-xs text-slate-400 gap-1">
            <CalendarOutlined />
            <span>Tạo lúc: {formatDate(task.createdAt)}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-1.5 ml-4 shrink-0">
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
  );
};
