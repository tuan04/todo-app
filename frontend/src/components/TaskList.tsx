import React from 'react';
import { Input, Radio, Empty, Pagination } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import type { Task, TaskStatus } from '@/types/task';
import { TaskItem } from '@/components/TaskItem';

interface TaskListProps {
  tasks: Task[];
  searchQuery: string;
  onSearchChange: (value: string) => void;
  statusFilter: TaskStatus | 'ALL';
  onFilterChange: (value: TaskStatus | 'ALL') => void;
  currentPage: number;
  onPageChange: (page: number) => void;
  totalElements: number;
  pageSize: number;
  onChangeStatus: (task: Task, status: TaskStatus) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

export const TaskList: React.FC<TaskListProps> = ({
  tasks,
  searchQuery,
  onSearchChange,
  statusFilter,
  onFilterChange,
  currentPage,
  onPageChange,
  totalElements,
  pageSize,
  onChangeStatus,
  onEdit,
  onDelete,
}) => {
  const [localSearch, setLocalSearch] = React.useState(searchQuery);

  React.useEffect(() => {
    setLocalSearch(searchQuery);
  }, [searchQuery]);

  return (
    <div>
      {/* Bộ lọc và Tìm kiếm */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="grow">
          <Input
            placeholder="Tìm kiếm công việc theo tiêu đề .."
            prefix={<SearchOutlined className="text-slate-400" />}
            value={localSearch}
            onChange={(e) => {
              const val = e.target.value;
              setLocalSearch(val);
              if (val === '') {
                onSearchChange('');
              }
            }}
            onPressEnter={() => onSearchChange(localSearch)}
            allowClear
            className="h-10 rounded-lg"
          />
        </div>
        <div className="shrink-0">
          <Radio.Group
            value={statusFilter}
            onChange={(e) => onFilterChange(e.target.value)}
            optionType="button"
            buttonStyle="solid"
            className="h-10 flex"
          >
            <Radio.Button value="ALL" className="h-10 flex items-center justify-center min-w-[70px]">
              Tất cả {statusFilter === 'ALL' ? `(${totalElements})` : ''}
            </Radio.Button>
            <Radio.Button value="PENDING" className="h-10 flex items-center justify-center min-w-[70px]">
              Chưa bắt đầu {statusFilter === 'PENDING' ? `(${totalElements})` : ''}
            </Radio.Button>
            <Radio.Button value="IN_PROGRESS" className="h-10 flex items-center justify-center min-w-[70px]">
              Đang làm {statusFilter === 'IN_PROGRESS' ? `(${totalElements})` : ''}
            </Radio.Button>
            <Radio.Button value="COMPLETED" className="h-10 flex items-center justify-center min-w-[70px]">
              Đã xong {statusFilter === 'COMPLETED' ? `(${totalElements})` : ''}
            </Radio.Button>
          </Radio.Group>
        </div>
      </div>

      {/* Hiển thị danh sách */}
      {tasks.length > 0 ? (
        <>
          <div className="max-h-[60vh] overflow-y-auto pr-1">
            {tasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onChangeStatus={onChangeStatus}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
          </div>

          {/* Phân trang */}
          {totalElements > pageSize && (
            <div className="flex justify-end mt-6">
              <Pagination
                current={currentPage}
                pageSize={pageSize}
                total={totalElements}
                onChange={onPageChange}
                showSizeChanger={false}
              />
            </div>
          )}
        </>
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
