import { useState } from 'react';
import { Layout, Button, Typography } from 'antd';
import { PlusOutlined, CheckSquareOutlined } from '@ant-design/icons';
import type { Task, TaskStatus } from '@/types/task';
import { TaskList } from '@/components/TaskList';
import { TaskFormModal } from '@/components/TaskFormModal';

const { Header, Content, Footer } = Layout;
const { Title, Paragraph } = Typography;

const DUMMY_TASKS: Task[] = [
  {
    id: '1',
    title: 'Tìm hiểu cấu trúc Ant Design',
    description: 'Xây dựng giao diện cho dự án todo-app bằng các component của Antd.',
    taskStatus: 'COMPLETED',
    createdAt: new Date(Date.now() - 3600000 * 24 * 2).toISOString(),
  },
  {
    id: '2',
    title: 'Thiết lập Spring Boot Entity & Config',
    description: 'Sửa lỗi cấu hình Entity Task, Repository và cài đặt H2/PostgreSQL Driver.',
    taskStatus: 'IN_PROGRESS',
    createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
  },
  {
    id: '3',
    title: 'Kết nối API Frontend và Backend',
    description: 'Thay thế API mock bằng Axios thực tế khi Backend Spring Boot sẵn sàng chạy.',
    taskStatus: 'PENDING',
    createdAt: new Date().toISOString(),
  },
];

export default function App() {
  const [tasks, setTasks] = useState<Task[]>(DUMMY_TASKS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | undefined>(undefined);

  // Xử lý khi nhấn nút Lưu/Thêm trong Modal
  const handleFormSubmit = (values: { title: string; description: string; taskStatus: TaskStatus }) => {
    if (editingTask) {
      setTasks(
        tasks.map((t) =>
          t.id === editingTask.id
            ? { ...t, title: values.title, description: values.description, taskStatus: values.taskStatus }
            : t
        )
      );
      setEditingTask(undefined);
    } else {
      const newTask: Task = {
        id: Math.random().toString(36).substring(2, 9),
        title: values.title,
        description: values.description,
        taskStatus: values.taskStatus,
        createdAt: new Date().toISOString(),
      };
      setTasks([newTask, ...tasks]);
    }
    setIsModalOpen(false);
  };

  // Xử lý khi click Checkbox hoàn thành/chưa hoàn thành
  const handleToggleStatus = (task: Task) => {
    const newStatus: TaskStatus = task.taskStatus === 'COMPLETED' ? 'PENDING' : 'COMPLETED';
    setTasks(
      tasks.map((t) =>
        t.id === task.id ? { ...t, taskStatus: newStatus } : t
      )
    );
  };

  // Xử lý xóa công việc
  const handleDeleteTask = (id: string) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  return (
    <Layout className="min-h-screen bg-slate-50/50">
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
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-2">
            <div>
              <Title level={2} className="text-slate-800">
                Quản lý công việc
              </Title>
              <Paragraph className="text-slate-500 text-sm">
                Theo dõi, thêm mới và quản lý tiến độ các đầu việc hàng ngày.
              </Paragraph>
            </div>
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
          <div className="bg-white border border-slate-100 rounded-2xl p-5 md:p-6 shadow-sm">
            <TaskList
              tasks={tasks}
              onToggleStatus={handleToggleStatus}
              onEdit={(task) => {
                setEditingTask(task);
                setIsModalOpen(true);
              }}
              onDelete={handleDeleteTask}
            />
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
      />
    </Layout>
  );
}
