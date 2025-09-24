import { updateCardSetUsingPost } from '@/services/backend/kapianjiguanlijiekou';
import { ProColumns, ProTable } from '@ant-design/pro-components';
import { message, Modal } from 'antd';
import React, { useEffect, useRef } from 'react';

interface Props {
  oldData?: API.CardSet;
  visible: boolean;
  columns: ProColumns<API.CardSet>[];
  onSubmit: () => void;
  onCancel: () => void;
}

/**
 * 更新卡片集
 *
 * @param fields
 */
const handleUpdate = async (fields: API.CardSetUpdateRequest) => {
  const hide = message.loading('正在更新');
  try {
    await updateCardSetUsingPost(fields);
    hide();
    message.success('更新成功');
    return true;
  } catch (error: any) {
    hide();
    message.error('更新失败，' + error.message);
    return false;
  }
};

/**
 * 更新卡片集模态框
 * @param props
 * @constructor
 */
const UpdateModal: React.FC<Props> = (props) => {
  const { oldData, visible, columns, onSubmit, onCancel } = props;
  const formRef = useRef<any>();

  useEffect(() => {
    if (formRef && visible && oldData) {
      formRef.current?.setFieldsValue({
        ...oldData,
        tags: oldData?.tagList || [],
      });
    }
  }, [visible, oldData]);

  const handleSubmit = async (values: API.CardSetUpdateRequest) => {
    if (!oldData?.id) {
      return;
    }
    const success = await handleUpdate({
      id: oldData.id,
      ...values,
      tags: values.tags || undefined,
    });
    if (success) {
      onSubmit?.();
    }
  };

  const handleCancel = () => {
    onCancel?.();
  };

  return (
    <Modal
      destroyOnClose
      title={'编辑卡片集'}
      open={visible}
      footer={null}
      width={800}
      onCancel={handleCancel}
    >
      <ProTable<API.CardSet, API.CardSetUpdateRequest>
        onSubmit={handleSubmit}
        formRef={formRef}
        rowKey="id"
        type="form"
        columns={columns.filter((column) => !column.hideInForm)}
        form={{
          labelCol: { span: 6 },
          wrapperCol: { span: 18 },
          initialValues: {
            ...oldData,
            tags: oldData?.tags ? JSON.parse(oldData.tags) : [],
          },
        }}
      />
    </Modal>
  );
};

export default UpdateModal;