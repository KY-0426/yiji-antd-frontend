import { addUserCardSetUsingPost } from '@/services/backend/yonghukapianjiguanxiguanlijiekou';
import { ModalForm, ProFormDigit, ProFormSelect, ProFormText } from '@ant-design/pro-components';
import { message } from 'antd';
import React from 'react';

interface Props {
  open: boolean;
  onCancel: () => void;
  onSubmit: (values: API.UserCardSetAddRequest) => void;
}

/**
 * 添加节点
 * @param fields
 */
const handleAdd = async (fields: API.UserCardSetAddRequest) => {
  const hide = message.loading('正在添加');
  try {
    await addUserCardSetUsingPost({
      ...fields,
    });
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
 * 创建用户卡片集关系弹窗
 * @param props
 * @constructor
 */
const CreateModal: React.FC<Props> = (props) => {
  const { open, onCancel, onSubmit } = props;



  return (
    <ModalForm<API.UserCardSetAddRequest>
      title="创建用户卡片集关系"
      open={open}
      onOpenChange={(visible) => {
        if (!visible) {
          onCancel?.();
        }
      }}
      onFinish={async (values: API.UserCardSetAddRequest) => {
        const success = await handleAdd(values);
        if (success) {
          onSubmit?.(values);
        }
        return success;
      }}
      modalProps={{
        destroyOnClose: true,
        okText: '确认',
        cancelText: '取消',
      }}
    >
      <ProFormText
        name="cardSetId"
        label="卡片集ID"
        rules={[
          {
            required: true,
            message: '请输入卡片集ID',
          },
        ]}
      />
      <ProFormSelect
        name="relationType"
        label="关系类型"
        options={[
          { label: '收藏', value: 0 },
          { label: '学习', value: 1 },
          { label: '完成', value: 2 },
        ]}
        rules={[
          {
            required: true,
            message: '请选择关系类型',
          },
        ]}
      />
      <ProFormDigit
        name="progress"
        label="学习进度"
        min={0}
        max={100}
        fieldProps={{
          precision: 2,
          addonAfter: '%',
        }}
        rules={[
          {
            required: true,
            message: '请输入学习进度',
          },
          {
            type: 'number',
            min: 0,
            max: 100,
            message: '学习进度必须在0-100之间',
          },
        ]}
      />
    </ModalForm>
  );
};
export default CreateModal;