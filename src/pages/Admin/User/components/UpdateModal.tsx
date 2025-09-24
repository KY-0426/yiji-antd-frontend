import { updateUserUsingPost } from '@/services/backend/userController';
import { ProColumns, ProTable } from '@ant-design/pro-components';
import '@umijs/max';
import { message, Modal, Form } from 'antd';
import React, { useCallback, useEffect } from 'react';

interface UpdateModalProps {
  oldData?: API.User;
  visible: boolean;
  columns: ProColumns<API.User>[];
  onSubmit: (values: API.UserAddRequest) => void;
  onCancel: () => void;
}

const MODAL_CONFIG = {
  TITLE: '更新用户',
  LOADING_TEXT: '正在更新',
  SUCCESS_TEXT: '更新成功',
  ERROR_PREFIX: '更新失败，',
} as const;

/**
 * 更新用户
 * @param fields 用户更新信息
 * @returns 是否成功
 */
const handleUpdate = async (fields: API.UserUpdateRequest): Promise<boolean> => {
  const hide = message.loading(MODAL_CONFIG.LOADING_TEXT);
  try {
    await updateUserUsingPost(fields);
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
 * 更新用户弹窗组件
 */
const UpdateModal: React.FC<UpdateModalProps> = ({ oldData, visible, columns, onSubmit, onCancel }) => {
  const [form] = Form.useForm();

  // 当Modal打开时，设置表单初始值
  useEffect(() => {
    if (visible && oldData) {
      form.setFieldsValue(oldData);
    }
  }, [visible, oldData, form]);

  const handleSubmit = useCallback(async (values: API.UserUpdateRequest) => {
    if (!oldData?.id) return;
    
    const success = await handleUpdate({
      ...values,
      id: oldData.id,
    });
    
    if (success) {
      onSubmit?.(values);
    }
  }, [oldData?.id, onSubmit]);

  const handleCancel = useCallback(() => {
    form.resetFields();
    onCancel?.();
  }, [form, onCancel]);

  if (!oldData) {
    return null;
  }

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
        form={{
          form,
          initialValues: oldData,
        }}
        onSubmit={handleSubmit}
      />
    </Modal>
  );
};
export default UpdateModal;
