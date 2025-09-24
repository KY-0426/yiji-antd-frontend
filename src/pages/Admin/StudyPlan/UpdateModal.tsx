import { updateStudyPlanUsingPost } from '@/services/backend/xuexijihuaguanlijiekou';
import { ModalForm, ProColumns, ProFormDateTimePicker, ProFormDigit, ProFormSelect, ProFormText, ProFormTextArea } from '@ant-design/pro-components';
import { message } from 'antd';
import React from 'react';

interface Props {
  oldData?: API.StudyPlan;
  visible: boolean;
  columns: ProColumns<API.StudyPlan>[];
  onSubmit: () => void;
  onCancel: () => void;
}

/**
 * 更新学习计划
 *
 * @param fields
 */
const handleUpdate = async (fields: API.StudyPlanUpdateRequest) => {
  const hide = message.loading('正在更新');
  try {
    await updateStudyPlanUsingPost(fields);
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
 * 更新学习计划模态框
 * @param props
 * @constructor
 */
const UpdateModal: React.FC<Props> = (props) => {
  const { oldData, visible, columns, onSubmit, onCancel } = props;

  return (
    <ModalForm<API.StudyPlanUpdateRequest>
      title="编辑学习计划"
      width={800}
      open={visible}
      onOpenChange={(open) => {
        if (!open) {
          onCancel?.();
        }
      }}
      onFinish={async (values: API.StudyPlanUpdateRequest) => {
        if (!oldData?.id) {
          return false;
        }
        const success = await handleUpdate({
          id: oldData.id,
          ...values,
        });
        if (success) {
          onSubmit?.();
          return true;
        }
        return false;
      }}
      initialValues={oldData}
      modalProps={{
        destroyOnClose: true,
        okText: '确认',
        cancelText: '取消',
      }}
    >
      <ProFormText
        name="planName"
        label="计划名称"
        rules={[
          {
            required: true,
            message: '计划名称为必填项',
          },
        ]}
      />
      <ProFormTextArea
        name="planDescription"
        label="计划描述"
      />
      <ProFormDigit
        name="cardSetId"
        label="卡片集ID"
        rules={[
          {
            required: true,
            message: '卡片集ID为必填项',
          },
        ]}
      />
      <ProFormDigit
        name="dailyTarget"
        label="每日目标"
        rules={[
          {
            required: true,
            message: '每日目标为必填项',
          },
        ]}
      />
      <ProFormDateTimePicker
        name="startTime"
        label="开始时间"
        rules={[
          {
            required: true,
            message: '开始时间为必填项',
          },
        ]}
      />
      <ProFormDateTimePicker
        name="endTime"
        label="结束时间"
        rules={[
          {
            required: true,
            message: '结束时间为必填项',
          },
        ]}
      />
      <ProFormSelect
        name="status"
        label="状态"
        options={[
          { label: '未开始', value: 0 },
          { label: '进行中', value: 1 },
          { label: '已完成', value: 2 },
          { label: '已暂停', value: 3 },
        ]}
      />
    </ModalForm>
  );
};

export default UpdateModal;