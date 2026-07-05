import { useState } from 'react';
import { Layout, Button, Spin } from 'antd';
import { PlusOutlined, CheckSquareOutlined } from '@ant-design/icons';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { Task } from '@/types/task';
import { TaskList } from '@/components/TaskList';
import { TaskFormModal } from '@/components/TaskFormModal';
import { useTasks } from '@/hooks/useTasks';

const { Header, Content, Footer } = Layout;

const queryClient = new QueryClient();

function TodoApp() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | undefined>(undefined);

  const { data: tasks = [], isLoading, error } = useTasks();

  return (
    <Layout className="min-h-screen bg-slate-50/50" style={{ minHeight: '100vh' }}>
      {/* Header */}
      <Header className="flex items-center justify-between px-6 bg-white border-b border-slate-100 h-16 shrink-0">
        <div className="flex items-center gap-2">
          <CheckSquareOutlined className="text-2xl text-blue-600" />
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
          <div className="bg-white border border-slate-100 rounded-2xl p-5 md:p-6 shadow-sm min-h-[250px] flex flex-col justify-start">
            {isLoading ? (
              <div className="grow flex flex-col items-center justify-center py-16 gap-3">
                <Spin size="large" />
                <span className="text-slate-400 text-sm">Đang tải danh sách công việc từ backend...</span>
              </div>
            ) : error ? (
              <div className="grow flex flex-col items-center justify-center py-16 text-center">
                <span className="text-red-500 font-semibold mb-1">Không thể kết nối đến máy chủ!</span>
                <span className="text-slate-400 text-xs">Vui lòng kiểm tra lại trạng thái Backend hoặc file cấu hình .env</span>
              </div>
            ) : (
              <TaskList
                tasks={tasks}
                onChangeStatus={() => { }}
                onEdit={(task) => {
                  setEditingTask(task);
                  setIsModalOpen(true);
                }}
                onDelete={() => { }}
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
        onSubmit={() => setIsModalOpen(false)}
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
