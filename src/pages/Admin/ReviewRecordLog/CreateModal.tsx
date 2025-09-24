import { addReviewRecordLogUsingPost } from '@/services/backend/fuxijilurizhiguanlijiekou';
import { ModalForm, ProFormDigit, ProFormSelect, ProFormTextArea, ProFormDateTimePicker } from '@ant-design/pro-components';
import { message } from 'antd';
import React from 'react';

interface Props {
  visible: boolean;
  onSubmit: () => void;
  onCancel: () => void;
}

/**
 * 添加复习记录
 *
 * @param fields
 */
const handleAdd = async (fields: API.ReviewRecordLogAddRequest) => {
  const hide = message.loading('正在添加');
  try {
    await addReviewRecordLogUsingPost(fields);
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
 * 创建复习记录模态框
 * @param props
 * @constructor
 */
const CreateModal: React.FC<Props> = (props) => {
  const { visible, onSubmit, onCancel } = props;

  return (
    <ModalForm<API.ReviewRecordLogAddRequest>
      title="新建复习记录"
      open={visible}
      onOpenChange={(open) => {
        if (!open) {
          onCancel?.();
        }
      }}
      onFinish={async (values: API.ReviewRecordLogAddRequest) => {
        const success = await handleAdd(values);
        if (success) {
          onSubmit?.();
        }
        return success;
      }}
      modalProps={{
        destroyOnClose: true,
        width: 800,
        okText: '确认',
        cancelText: '取消',
      }}
      layout="horizontal"
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 18 }}
    >
      <ProFormDigit
        name="userId"
        label="用户ID"
        rules={[
          {
            required: true,
            message: '用户ID为必填项',
          },
        ]}
      />
      <ProFormDigit
        name="cardId"
        label="卡片ID"
        rules={[
          {
            required: true,
            message: '卡片ID为必填项',
          },
        ]}
      />
      <ProFormDigit
        name="cardSetId"
        label="卡片集ID"
      />
      <ProFormDateTimePicker
        name="reviewTime"
        label="复习时间"
        rules={[
          {
            required: true,
            message: '复习时间为必填项',
          },
        ]}
      />
      <ProFormSelect
        name="reviewResult"
        label="复习结果"
        options={[
          { label: '错误', value: 0 },
          { label: '正确', value: 1 },
          { label: '困难', value: 2 },
          { label: '简单', value: 3 },
        ]}
      />
      <ProFormDigit
        name="memoryStrength"
        label="记忆强度"
        fieldProps={{
          min: 0,
          max: 1,
          step: 0.01,
        }}
      />
      <ProFormTextArea
        name="reviewNote"
        label="复习备注"
      />
    </ModalForm>
  );
};

export default CreateModal;