import React from 'react';
import { Select, Button, Popconfirm, Tooltip } from 'antd';
import { EditOutlined, DeleteOutlined, CalendarOutlined } from '@ant-design/icons';
import type { Task, TaskStatus } from '@/types/task';
import { formatDate } from '@/helpers/forma-date';

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
  // Hàm tạo inline style động cho dropdown trạng thái
  const getSelectStyle = (status: TaskStatus) => {
    switch (status) {
      case 'PENDING':
        return {
          color: '#334155', // slate-700
          backgroundColor: '#f1f5f9', // slate-100
          border: '1px solid #cbd5e1', // slate-300
          fontWeight: 700,
          borderRadius: '8px',
        };
      case 'IN_PROGRESS':
        return {
          color: '#1d4ed8', // blue-700
          backgroundColor: '#dbeafe', // blue-100
          border: '1px solid #93c5fd', // blue-300
          fontWeight: 700,
          borderRadius: '8px',
        };
      case 'COMPLETED':
        return {
          color: '#15803d', // green-700
          backgroundColor: '#dcfce7', // green-100
          border: '1px solid #86efac', // green-300
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
      className="flex items-center justify-between p-4 mb-3 bg-white border border-slate-100 rounded-xl shadow-xs transition-all duration-200 hover:shadow-md hover:border-blue-100"
    >
      {/* Title & Created At */}
      <div className="flex-1 min-w-0 pr-4">
        <h3 className="text-base font-semibold text-slate-800 truncate">
          {task.title}
        </h3>
        <div className="flex items-center text-xs text-slate-400 gap-1 mt-1">
          <CalendarOutlined />
          <span>Tạo lúc: {formatDate(task.createdAt)}</span>
        </div>
      </div>

      {/* Status Dropdown & Actions */}
      <div className="flex items-center gap-4 shrink-0">
        <Select
          value={task.taskStatus}
          onChange={(newStatus) => onChangeStatus(task, newStatus)}
          options={statusOptions}
          style={{
            width: 140,
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
  );
};
