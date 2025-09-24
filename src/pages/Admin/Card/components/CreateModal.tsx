import { addCardUsingPost } from '@/services/backend/kapianguanlijiekou';
import { ProColumns, ProTable } from '@ant-design/pro-components';
import '@umijs/max';
import { message, Modal, Form } from 'antd';
import React, { useCallback } from 'react';

interface CreateModalProps {
  visible: boolean;
  columns: ProColumns<API.Card>[];
  onSubmit: (values: API.CardAddRequest) => void;
  onCancel: () => void;
}

const MODAL_CONFIG = {
  TITLE: '创建卡片',
  LOADING_TEXT: '正在添加',
  SUCCESS_TEXT: '创建成功',
  ERROR_PREFIX: '创建失败，',
} as const;

/**
 * 添加卡片
 * @param fields 卡片信息
 * @returns 是否成功
 */
const handleAdd = async (fields: API.CardAddRequest): Promise<boolean> => {
  const hide = message.loading(MODAL_CONFIG.LOADING_TEXT);
  try {
    await addCardUsingPost({
      ...fields,
      tags: fields.tags || undefined,
    });
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
 * 创建卡片弹窗组件
 */
const CreateModal: React.FC<CreateModalProps> = ({ visible, columns, onSubmit, onCancel }) => {
  const [form] = Form.useForm();

  const handleSubmit = useCallback(async (values: API.CardAddRequest) => {
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