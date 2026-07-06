import React, { useEffect } from 'react';
import { Modal, Form, Input, Select, DatePicker, TimePicker } from 'antd';
import dayjs from 'dayjs';
import type { Task, TaskStatus } from '@/types/task';

interface TaskFormModalProps {
  open: boolean;
  onCancel: () => void;
  onSubmit: (values: { title: string; description: string; taskStatus: TaskStatus; dueDate?: string | null }) => void;
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
        const d = initialValues.dueDate ? dayjs(initialValues.dueDate) : null;
        form.setFieldsValue({
          title: initialValues.title,
          description: initialValues.description || '',
          taskStatus: initialValues.taskStatus,
          dueDate: d,
          dueTime: d,
        });
      } else {
        form.resetFields();
        form.setFieldsValue({
          title: '',
          description: '',
          taskStatus: 'PENDING',
          dueDate: null,
          dueTime: null,
        });
      }
    }
  }, [open, initialValues, form]);

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        let finalDueDate = null;
        if (values.dueDate && values.dueTime) {
          const dateStr = values.dueDate.format('YYYY-MM-DD');
          const timeStr = values.dueTime.format('HH:mm:ss');
          finalDueDate = `${dateStr}T${timeStr}`;
        }
        onSubmit({
          title: values.title,
          description: values.description,
          taskStatus: values.taskStatus,
          dueDate: finalDueDate,
        });
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
      destroyOnClose
    >
      <Form
        form={form}
        layout="vertical"
        name="taskForm"
      >
        <Form.Item
          name="title"
          label="Tên công việc"
          rules={[
            { required: true, message: 'Vui lòng nhập tên công việc!' },
            { max: 50, message: 'Yêu cầu không vượt quá 50 ký tự!' }
          ]}
        >
          <Input placeholder="Ví dụ: Hoàn thành báo cáo tiến độ..." />
        </Form.Item>

        <Form.Item name="description" label="Mô tả chi tiết">
          <Input.TextArea placeholder="Mô tả chi tiết các bước cần làm..." rows={4} />
        </Form.Item>

        <div className="flex gap-4">
          <Form.Item
            name="dueDate"
            label="Ngày hạn"
            rules={[{ required: true, message: 'Vui lòng chọn ngày!' }]}
            className="flex-1"
          >
            <DatePicker 
              format="YYYY-MM-DD" 
              className="w-full" 
              disabledDate={(current) => current && current < dayjs().startOf('day')}
            />
          </Form.Item>

          <Form.Item
            name="dueTime"
            label="Giờ hạn"
            rules={[
              { required: true, message: 'Vui lòng chọn giờ!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  const dueDate = getFieldValue('dueDate');
                  if (dueDate && value) {
                    const selected = dayjs(dueDate.format('YYYY-MM-DD') + 'T' + value.format('HH:mm:ss'));
                    if (selected.isBefore(dayjs())) {
                      return Promise.reject(new Error('Giờ hạn chót phải ở tương lai!'));
                    }
                  }
                  return Promise.resolve();
                },
              }),
            ]}
            className="w-[140px]"
          >
            <TimePicker format="HH:mm" className="w-full" />
          </Form.Item>
        </div>

        <Form.Item name="taskStatus" label="Trạng thái">
          <Select disabled={!initialValues}>
            <Select.Option value="PENDING">Chưa bắt đầu (Pending)</Select.Option>
            <Select.Option value="IN_PROGRESS">Đang thực hiện (In Progress)</Select.Option>
            <Select.Option value="COMPLETED">Đã hoàn thành (Completed)</Select.Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};
