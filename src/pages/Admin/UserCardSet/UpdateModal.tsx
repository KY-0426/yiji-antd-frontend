import { updateUserCardSetUsingPost } from '@/services/backend/yonghukapianjiguanxiguanlijiekou';
import { ModalForm, ProFormDigit, ProFormSelect, ProFormText } from '@ant-design/pro-components';
import { message } from 'antd';
import React from 'react';

interface Props {
  open: boolean;
  onCancel: () => void;
  onSubmit: (values: API.UserCardSetUpdateRequest) => void;
  values: API.UserCardSet;
}

/**
 * 更新节点
 *
 * @param fields
 */
const handleUpdate = async (fields: API.UserCardSetUpdateRequest) => {
  const hide = message.loading('正在配置');
  try {
    await updateUserCardSetUsingPost({
      id: fields.id,
      ...fields,
    });
    hide();
    message.success('配置成功');
    return true;
  } catch (error: any) {
    hide();
    message.error('配置失败，' + error.message);
    return false;
  }
};

/**
 * 更新用户卡片集关系弹窗
 * @param props
 * @constructor
 */
const UpdateModal: React.FC<Props> = (props) => {
  const { open, onCancel, onSubmit, values } = props;



  return (
    <ModalForm<API.UserCardSetUpdateRequest>
      title="更新用户卡片集关系"
      open={open}
      onOpenChange={(visible) => {
        if (!visible) {
          onCancel?.();
        }
      }}
      onFinish={async (formValues: API.UserCardSetUpdateRequest) => {
        const success = await handleUpdate({ ...formValues, id: values.id });
        if (success) {
          onSubmit?.({ ...formValues, id: values.id });
        }
        return success;
      }}
      initialValues={values}
      modalProps={{
        destroyOnClose: true,
        okText: '确认',
        cancelText: '取消',
      }}
    >
      <ProFormText
        name="userId"
        label="用户ID"
        readonly
      />
      <ProFormText
        name="cardSetId"
        label="卡片集ID"
        readonly
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
export default UpdateModal;