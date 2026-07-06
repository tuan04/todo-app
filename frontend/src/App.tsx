import { useState } from 'react';
import { Layout, Button, Spin, message } from 'antd';
import { PlusOutlined, CheckSquareOutlined, DisconnectOutlined } from '@ant-design/icons';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { Task, TaskStatus } from '@/types/task';
import { TaskList } from '@/components/TaskList';
import { TaskFormModal } from '@/components/TaskFormModal';
import { useTasks, useCreateTask, useUpdateTask, useDeleteTask } from '@/hooks/useTasks';
import { getErrorMessage } from '@/services/api';

const { Header, Content, Footer } = Layout;

const queryClient = new QueryClient();

function TodoApp() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | undefined>(undefined);

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<TaskStatus | 'ALL'>('ALL');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  // Fetch dữ liệu
  const { data: taskPage, isLoading, error, refetch } = useTasks(currentPage - 1, pageSize, searchQuery, statusFilter);
  const tasks = taskPage?.content || [];
  const totalElements = taskPage?.totalElements || 0;

  const createTaskMutation = useCreateTask();
  const updateTaskMutation = useUpdateTask();
  const deleteTaskMutation = useDeleteTask();

  // Xử lý Thêm mới / Cập nhật
  const handleFormSubmit = (values: { title: string; description: string; taskStatus: TaskStatus }) => {
    if (editingTask) {
      updateTaskMutation.mutate(
        {
          id: editingTask.id,
          taskData: {
            title: values.title,
            description: values.description,
            taskStatus: values.taskStatus,
          },
        },
        {
          onSuccess: () => {
            setIsModalOpen(false);
            setEditingTask(undefined);
            message.success('Cập nhật công việc thành công!');
          },
          onError: (err) => {
            message.error(getErrorMessage(err, 'Cập nhật công việc thất bại. Vui lòng kiểm tra lại!'));
          },
        }
      );
    } else {
      createTaskMutation.mutate(
        {
          title: values.title,
          description: values.description,
        },
        {
          onSuccess: () => {
            setIsModalOpen(false);
            setCurrentPage(1); // Quay lại trang 1 để xem công việc mới nhất
            message.success('Thêm công việc mới thành công!');
          },
          onError: (err) => {
            message.error(getErrorMessage(err, 'Thêm công việc thất bại. Vui lòng kiểm tra lại!'));
          },
        }
      );
    }
  };

  return (
    <Layout className="min-h-screen bg-slate-50/50" style={{ minHeight: '100vh' }}>
      {/* Header */}
      <Header className="flex items-center justify-between px-6 bg-white border-b border-slate-100 h-16 shrink-0">
        <div className="flex items-center gap-2">
          <CheckSquareOutlined className="text-2xl bg-blue-400" />
          <span className="text-2xl font-bold text-blue-600 tracking-tight">Todo App</span>
        </div>
      </Header>

      {/* Main Content */}
      <Content className="p-4 sm:p-6 md:p-8 grow flex justify-center">
        <div className="w-full max-w-4xl flex flex-col gap-6">

          {/* Dashboard Intro */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-end gap-4 mt-2">
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => {
                setEditingTask(undefined);
                setIsModalOpen(true);
              }}
              className="h-10 bg-blue-600 hover:bg-blue-500 rounded-lg text-sm font-medium shrink-0 shadow-sm"
            >
              Thêm công việc mới
            </Button>
          </div>

          {/* Task Board Container */}
          <div className="bg-white border border-slate-100 rounded-2xl p-5 md:p-6 shadow-sm min-h-[60vh] flex flex-col justify-start">
            {isLoading ? (
              <div className="grow flex flex-col items-center justify-center py-16 gap-3">
                <Spin size="large" />
                <span className="text-slate-400 text-sm">Đang tải danh sách công việc...</span>
              </div>
            ) : error ? (
              <div className="grow flex flex-col items-center justify-center py-12 text-center px-4">
                <DisconnectOutlined className="text-5xl text-red-400 mb-4 animate-bounce" />
                <span className="text-red-500 font-semibold text-base mb-1">
                  {getErrorMessage(error, 'Không thể kết nối đến máy chủ!')}
                </span>
                <span className="text-slate-400 text-xs max-w-sm mb-4">
                  Vui lòng kiểm tra kết nối mạng.
                </span>
                <Button
                  type="primary"
                  onClick={() => refetch()}
                  className="h-9 bg-blue-600 hover:bg-blue-500 rounded-lg text-xs font-medium"
                >
                  Thử lại
                </Button>
              </div>
            ) : (
              <TaskList
                tasks={tasks}
                searchQuery={searchQuery}
                onSearchChange={(val) => {
                  setSearchQuery(val);
                  setCurrentPage(1);
                }}
                statusFilter={statusFilter}
                onFilterChange={(val) => {
                  setStatusFilter(val);
                  setCurrentPage(1);
                }}
                currentPage={currentPage}
                onPageChange={(page) => setCurrentPage(page)}
                totalElements={totalElements}
                pageSize={pageSize}
                onChangeStatus={(task, status) => {
                  updateTaskMutation.mutate({
                    id: task.id,
                    taskData: {
                      title: task.title,
                      description: task.description,
                      taskStatus: status,
                    },
                  }, {
                    onSuccess: () => {
                      message.success('Cập nhật trạng thái thành công!');
                    },
                    onError: (err) => {
                      message.error(getErrorMessage(err, 'Cập nhật trạng thái thất bại!'));
                    }
                  });
                }}
                onEdit={(task) => {
                  setEditingTask(task);
                  setIsModalOpen(true);
                }}
                onDelete={(id) => {
                  deleteTaskMutation.mutate(id, {
                    onSuccess: () => {
                      message.success('Xóa công việc thành công!');
                    },
                    onError: (err) => {
                      message.error(getErrorMessage(err, 'Xóa công việc thất bại!'));
                    },
                  });
                }}
              />
            )}
          </div>
        </div>
      </Content>

      {/* Footer */}
      <Footer className="text-center py-4 bg-white border-t border-slate-100 text-slate-400 text-xs shrink-0">
        ©2026 Todo Management System.
      </Footer>

      {/* Modal (Thêm/Sửa) */}
      <TaskFormModal
        open={isModalOpen}
        initialValues={editingTask}
        onCancel={() => setIsModalOpen(false)}
        onSubmit={handleFormSubmit}
        confirmLoading={createTaskMutation.isPending || updateTaskMutation.isPending}
      />
    </Layout>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TodoApp />
    </QueryClientProvider>
  );
}
