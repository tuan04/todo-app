import React, { useEffect } from 'react';
import { Modal, Form, Input, Select } from 'antd';
import type { Task, TaskStatus } from '@/types/task';

interface TaskFormModalProps {
  open: boolean;
  onCancel: () => void;
  onSubmit: (values: { title: string; description: string; taskStatus: TaskStatus }) => void;
  initialValues?: Task;
  confirmLoading?: boolean;
}

export const TaskFormModal: React.FC<TaskFormModalProps> = ({
  open,
  onCancel,
  onSubmit,
  initialValues,
  confirmLoading,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (open) {
      if (initialValues) {
        form.setFieldsValue({
          title: initialValues.title,
          description: initialValues.description || '',
          taskStatus: initialValues.taskStatus,
        });
      } else {
        form.resetFields();
        form.setFieldsValue({
          title: '',
          description: '',
          taskStatus: 'PENDING',
        });
      }
    }
  }, [open, initialValues, form]);

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        onSubmit(values);
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
      });
  };

  return (
    <Modal
      open={open}
      title={initialValues ? 'Chỉnh sửa công việc' : 'Thêm công việc mới'}
      okText={initialValues ? 'Cập nhật' : 'Thêm mới'}
      cancelText="Hủy"
      onCancel={onCancel}
      onOk={handleOk}
      confirmLoading={confirmLoading}
      destroyOnHidden
    >
      <Form
        form={form}
        layout="vertical"
        name="taskForm"
      >
        <Form.Item
          name="title"
          label="Tiêu đề công việc"
          rules={[
            { required: true, message: 'Vui lòng nhập tiêu đề công việc!' },
            { max: 50, message: 'Tiêu đề không được vượt quá 50 ký tự!' }
          ]}
        >
          <Input placeholder="Ví dụ: Hoàn thành báo cáo tiến độ..." />
        </Form.Item>

        <Form.Item name="description" label="Mô tả chi tiết">
          <Input.TextArea placeholder="Mô tả chi tiết các bước cần làm..." rows={4} />
        </Form.Item>

        <Form.Item name="taskStatus" label="Trạng thái">
          <Select>
            <Select.Option value="PENDING">Chưa bắt đầu (Pending)</Select.Option>
            <Select.Option value="IN_PROGRESS">Đang thực hiện (In Progress)</Select.Option>
            <Select.Option value="COMPLETED">Đã hoàn thành (Completed)</Select.Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};
