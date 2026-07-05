import React, { useState, useMemo } from 'react';
import { Input, Radio, Empty } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import type { Task, TaskStatus } from '@/types/task';
import { TaskItem } from '@/components/TaskItem';

interface TaskListProps {
  tasks: Task[];
  onChangeStatus: (task: Task, status: TaskStatus) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

export const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onChangeStatus,
  onEdit,
  onDelete,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<TaskStatus | 'ALL'>('ALL');

  // Lọc danh sách công việc dựa trên ô tìm kiếm và bộ lọc trạng thái
  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesSearch =
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (task.description && task.description.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesStatus = statusFilter === 'ALL' || task.taskStatus === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [tasks, searchQuery, statusFilter]);

  return (
    <div>
      {/* Bộ lọc và Tìm kiếm */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="grow">
          <Input
            placeholder="Tìm kiếm công việc theo tiêu đề hoặc mô tả..."
            prefix={<SearchOutlined className="text-slate-400" />}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            allowClear
            className="h-10 rounded-lg"
          />
        </div>
        <div className="shrink-0">
          <Radio.Group
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            optionType="button"
            buttonStyle="solid"
            className="h-10 flex"
          >
            <Radio.Button value="ALL" className="h-10 flex items-center justify-center min-w-[70px]">
              Tất cả ({tasks.length})
            </Radio.Button>
            <Radio.Button value="PENDING" className="h-10 flex items-center justify-center min-w-[70px]">
              Chưa bắt đầu ({tasks.filter((t) => t.taskStatus === 'PENDING').length})
            </Radio.Button>
            <Radio.Button value="IN_PROGRESS" className="h-10 flex items-center justify-center min-w-[70px]">
              Đang làm ({tasks.filter((t) => t.taskStatus === 'IN_PROGRESS').length})
            </Radio.Button>
            <Radio.Button value="COMPLETED" className="h-10 flex items-center justify-center min-w-[70px]">
              Đã xong ({tasks.filter((t) => t.taskStatus === 'COMPLETED').length})
            </Radio.Button>
          </Radio.Group>
        </div>
      </div>

      {/* Hiển thị danh sách */}
      {filteredTasks.length > 0 ? (
        <div className="max-h-[60vh] overflow-y-auto pr-1">
          {filteredTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onChangeStatus={onChangeStatus}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white border border-slate-100 rounded-2xl py-16 shadow-xs">
          <Empty
            description={
              <span className="text-slate-400">
                {searchQuery || statusFilter !== 'ALL'
                  ? 'Không tìm thấy công việc nào khớp với bộ lọc!'
                  : 'Chưa có công việc nào. Hãy thêm công việc mới nhé!'}
              </span>
            }
          />
        </div>
      )}
    </div>
  );
};
