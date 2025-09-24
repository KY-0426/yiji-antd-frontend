import { updateCardUsingPost } from '@/services/backend/kapianguanlijiekou';
import { ProColumns, ProTable } from '@ant-design/pro-components';
import '@umijs/max';
import { message, Modal, Form } from 'antd';
import React, { useCallback, useEffect } from 'react';

interface UpdateModalProps {
  oldData?: API.Card;
  visible: boolean;
  columns: ProColumns<API.Card>[];
  onSubmit: (values: API.CardUpdateRequest) => void;
  onCancel: () => void;
}

const MODAL_CONFIG = {
  TITLE: '更新卡片',
  LOADING_TEXT: '正在更新',
  SUCCESS_TEXT: '更新成功',
  ERROR_PREFIX: '更新失败，',
} as const;

/**
 * 更新卡片
 * @param fields 卡片更新信息
 * @returns 是否成功
 */
const handleUpdate = async (fields: API.CardUpdateRequest): Promise<boolean> => {
  const hide = message.loading(MODAL_CONFIG.LOADING_TEXT);
  try {
    await updateCardUsingPost({
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
 * 更新卡片弹窗组件
 */
const UpdateModal: React.FC<UpdateModalProps> = ({ oldData, visible, columns, onSubmit, onCancel }) => {
  const [form] = Form.useForm();

  // 设置表单初始值
  useEffect(() => {
    if (visible && oldData) {
      const initialValues = {
        ...oldData,
        tags: (() => {
          try {
            return oldData.tags ? JSON.parse(oldData.tags) : [];
          } catch {
            return [];
          }
        })(),
      };
      form.setFieldsValue(initialValues);
    }
  }, [visible, oldData, form]);

  const handleSubmit = useCallback(async (values: API.CardUpdateRequest) => {
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
        form={{ form }}
        onSubmit={handleSubmit}
      />
    </Modal>
  );
};

export default UpdateModal;