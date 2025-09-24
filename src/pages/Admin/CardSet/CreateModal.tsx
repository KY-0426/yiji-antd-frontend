import { addCardSetUsingPost } from '@/services/backend/kapianjiguanlijiekou';
import { ProColumns, ProTable } from '@ant-design/pro-components';
import { message, Modal } from 'antd';
import React from 'react';

interface Props {
  visible: boolean;
  columns: ProColumns<API.CardSet>[];
  onSubmit: () => void;
  onCancel: () => void;
}

/**
 * 添加卡片集
 *
 * @param fields
 */
const handleAdd = async (fields: API.CardSetAddRequest) => {
  const hide = message.loading('正在添加');
  try {
    await addCardSetUsingPost(fields);
    hide();
    message.success('创建成功');
    return true;
  } catch (error: any) {
    hide();
    message.error('创建失败，' + error.message);
    return false;
  }
};

/**
 * 创建卡片集模态框
 * @param props
 * @constructor
 */
const CreateModal: React.FC<Props> = (props) => {
  const { visible, columns, onSubmit, onCancel } = props;

  return (
    <Modal
      destroyOnClose
      title={'新建卡片集'}
      open={visible}
      footer={null}
      width={800}
      onCancel={() => {
        onCancel?.();
      }}
    >
      <ProTable<API.CardSet, API.CardSetAddRequest>
        onSubmit={async (values: API.CardSetAddRequest) => {
          const success = await handleAdd({
          ...values,
          tags: values.tags || undefined,
        });
          if (success) {
            onSubmit?.();
          }
        }}
        rowKey="id"
        type="form"
        columns={columns.filter((column) => !column.hideInForm)}
        form={{
          labelCol: { span: 6 },
          wrapperCol: { span: 18 },
        }}
      />
    </Modal>
  );
};

export default CreateModal;