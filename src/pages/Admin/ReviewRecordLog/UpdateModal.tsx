import { updateReviewRecordLogUsingPost } from '@/services/backend/fuxijilurizhiguanlijiekou';
import { ModalForm, ProFormDigit, ProFormSelect, ProFormTextArea, ProFormDateTimePicker } from '@ant-design/pro-components';
import { message } from 'antd';
import React from 'react';

interface Props {
  oldData?: API.ReviewRecordLog;
  visible: boolean;
  onSubmit: () => void;
  onCancel: () => void;
}

/**
 * 更新复习记录
 *
 * @param fields
 */
const handleUpdate = async (fields: API.ReviewRecordLogUpdateRequest) => {
  const hide = message.loading('正在更新');
  try {
    await updateReviewRecordLogUsingPost(fields);
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
 * 更新复习记录模态框
 * @param props
 * @constructor
 */
const UpdateModal: React.FC<Props> = (props) => {
  const { oldData, visible, onSubmit, onCancel } = props;

  return (
    <ModalForm<API.ReviewRecordLogUpdateRequest>
      title="编辑复习记录"
      open={visible}
      onOpenChange={(open) => {
        if (!open) {
          onCancel?.();
        }
      }}
      onFinish={async (values: API.ReviewRecordLogUpdateRequest) => {
        if (!oldData?.id) {
          return false;
        }
        const success = await handleUpdate({
          id: oldData.id,
          ...values,
        });
        if (success) {
          onSubmit?.();
        }
        return success;
      }}
      initialValues={oldData}
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
        readonly
      />
      <ProFormDigit
        name="cardId"
        label="卡片ID"
        readonly
      />
      <ProFormDigit
        name="cardSetId"
        label="卡片集ID"
        readonly
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

export default UpdateModal;