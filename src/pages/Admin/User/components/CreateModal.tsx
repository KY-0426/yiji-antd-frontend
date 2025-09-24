import { addUserUsingPost } from '@/services/backend/userController';
import { ProColumns, ProTable } from '@ant-design/pro-components';
import '@umijs/max';
import { message, Modal, Form } from 'antd';
import React, { useCallback } from 'react';

interface CreateModalProps {
  visible: boolean;
  columns: ProColumns<API.User>[];
  onSubmit: (values: API.UserAddRequest) => void;
  onCancel: () => void;
}

const MODAL_CONFIG = {
  TITLE: '创建用户',
  LOADING_TEXT: '正在添加',
  SUCCESS_TEXT: '创建成功',
  ERROR_PREFIX: '创建失败，',
} as const;

/**
 * 添加用户
 * @param fields 用户信息
 * @returns 是否成功
 */
const handleAdd = async (fields: API.UserAddRequest): Promise<boolean> => {
  const hide = message.loading(MODAL_CONFIG.LOADING_TEXT);
  try {
    await addUserUsingPost(fields);
    hide();
    message.success(MODAL_CONFIG.SUCCESS_TEXT);
    return true;
  } catch (error: any) {
    hide();
    message.error(`${MODAL_CONFIG.ERROR_PREFIX}${error.message}`);
    return false;
  }
};

/**
 * 创建用户弹窗组件
 */
const CreateModal: React.FC<CreateModalProps> = ({ visible, columns, onSubmit, onCancel }) => {
  const [form] = Form.useForm();

  const handleSubmit = useCallback(async (values: API.UserAddRequest) => {
    const success = await handleAdd(values);
    if (success) {
      onSubmit?.(values);
      form.resetFields();
    }
  }, [form, onSubmit]);

  const handleCancel = useCallback(() => {
    form.resetFields();
    onCancel?.();
  }, [form, onCancel]);

  return (
    <Modal
      destroyOnClose
      title={MODAL_CONFIG.TITLE}
      open={visible}
      footer={null}
      onCancel={handleCancel}
    >
      <ProTable
        type="form"
        columns={columns}
        form={{ form }}
        onSubmit={handleSubmit}
      />
    </Modal>
  );
};
export default CreateModal;
