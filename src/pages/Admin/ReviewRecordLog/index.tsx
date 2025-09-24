import CreateModal from './CreateModal';
import UpdateModal from './UpdateModal';
import {
  deleteReviewRecordLogUsingPost,
  listReviewRecordLogByPageUsingPost,
} from '@/services/backend/fuxijilurizhiguanlijiekou';
import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Badge, Button, message, Popconfirm, Space, Typography } from 'antd';
import React, { useRef, useState } from 'react';

const { Text } = Typography;

/**
 * 复习记录管理页面
 */
const ReviewRecordLogAdminPage: React.FC = () => {
  const [createModalVisible, setCreateModalVisible] = useState<boolean>(false);
  const [updateModalVisible, setUpdateModalVisible] = useState<boolean>(false);
  const [currentRow, setCurrentRow] = useState<API.ReviewRecordLog>();
  const actionRef = useRef<ActionType>();

  /**
   * 删除节点
   *
   * @param row
   */
  const handleDelete = async (row: API.ReviewRecordLog) => {
    const hide = message.loading('正在删除');
    if (!row) return true;
    try {
      await deleteReviewRecordLogUsingPost({
        id: row.id as any,
      });
      hide();
      message.success('删除成功');
      actionRef?.current?.reload();
      return true;
    } catch (error: any) {
      hide();
      message.error('删除失败，' + error.message);
      return false;
    }
  };

  /**
   * 编辑节点
   *
   * @param row
   */
  const handleEdit = (row: API.ReviewRecordLog) => {
    setCurrentRow(row);
    setUpdateModalVisible(true);
  };

  /**
   * 表格列配置
   */
  const columns: ProColumns<API.ReviewRecordLog>[] = [
    {
      title: 'ID',
      dataIndex: 'id',
      valueType: 'text',
      hideInForm: true,
      width: 80,
    },
    {
      title: '用户ID',
      dataIndex: 'userId',
      valueType: 'digit',
      width: 100,
      formItemProps: {
        rules: [
          {
            required: true,
            message: '用户ID为必填项',
          },
        ],
      },
    },
    {
      title: '卡片ID',
      dataIndex: 'cardId',
      valueType: 'digit',
      width: 100,
      formItemProps: {
        rules: [
          {
            required: true,
            message: '卡片ID为必填项',
          },
        ],
      },
    },
    {
      title: '卡片集ID',
      dataIndex: 'cardSetId',
      valueType: 'digit',
      width: 100,
    },
    {
      title: '复习时间',
      dataIndex: 'reviewTime',
      valueType: 'dateTime',
      width: 150,
      formItemProps: {
        rules: [
          {
            required: true,
            message: '复习时间为必填项',
          },
        ],
      },
    },
    {
      title: '复习结果',
      dataIndex: 'reviewResult',
      valueType: 'select',
      valueEnum: {
        0: { text: '错误', status: 'Error' },
        1: { text: '正确', status: 'Success' },
        2: { text: '困难', status: 'Warning' },
        3: { text: '简单', status: 'Processing' },
      },
      width: 100,
      render: (_, record) => {
        const resultMap = {
          0: { text: '错误', color: 'error' },
          1: { text: '正确', color: 'success' },
          2: { text: '困难', color: 'warning' },
          3: { text: '简单', color: 'processing' },
        };
        const result = resultMap[record.reviewResult as keyof typeof resultMap];
        return result ? <Badge status={result.color as any} text={result.text} /> : '-';
      },
    },
    {
      title: '记忆强度',
      dataIndex: 'memoryStrength',
      valueType: 'digit',
      width: 100,
      hideInSearch: true,
      render: (_, record) => {
        const strength = record.memoryStrength;
        if (strength === undefined || strength === null) return '-';
        return `${(strength * 100).toFixed(1)}%`;
      },
    },
    {
      title: '间隔天数',
      dataIndex: 'intervalDays',
      valueType: 'digit',
      width: 100,
      hideInSearch: true,
      hideInForm: true,
    },
    {
      title: '下次间隔天数',
      dataIndex: 'nextIntervalDays',
      valueType: 'digit',
      width: 120,
      hideInSearch: true,
      hideInForm: true,
    },
    {
      title: '复习备注',
      dataIndex: 'reviewNote',
      valueType: 'textarea',
      ellipsis: true,
      width: 200,
      hideInSearch: true,
      render: (_, record) => (
        <Text style={{ maxWidth: 200 }} ellipsis={{ tooltip: record.reviewNote }}>
          {record.reviewNote || '-'}
        </Text>
      ),
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      valueType: 'dateTime',
      hideInSearch: true,
      hideInForm: true,
      width: 150,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      fixed: 'right',
      width: 120,
      render: (_, record) => (
        <Space>
          <Button
            type="link"
            size="small"
            onClick={() => handleEdit(record)}
          >
            编辑
          </Button>
          <Popconfirm
            title="确定要删除这条复习记录吗？"
            onConfirm={() => handleDelete(record)}
            okText="确定"
            cancelText="取消"
          >
            <Button type="link" size="small" danger>
              删除
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  /**
   * 处理请求
   */
  const handleRequest = async (params: any, sort: any, filter: any) => {
    const sortField = Object.keys(sort)?.[0];
    const sortOrder = sort?.[sortField] ?? undefined;

    const { data, code } = await listReviewRecordLogByPageUsingPost({
      ...params,
      sortField,
      sortOrder,
      ...filter,
    } as API.ReviewRecordLogQueryRequest);

    return {
      success: code === 0,
      data: data?.records || [],
      total: Number(data?.total) || 0,
    };
  };

  /**
   * 创建成功回调
   */
  const handleCreateSuccess = () => {
    setCreateModalVisible(false);
    actionRef.current?.reload();
  };

  /**
   * 更新成功回调
   */
  const handleUpdateSuccess = () => {
    setUpdateModalVisible(false);
    setCurrentRow(undefined);
    actionRef.current?.reload();
  };

  /**
   * 创建取消回调
   */
  const handleCreateCancel = () => {
    setCreateModalVisible(false);
  };

  /**
   * 更新取消回调
   */
  const handleUpdateCancel = () => {
    setUpdateModalVisible(false);
    setCurrentRow(undefined);
  };

  return (
    <div>
      <ProTable<API.ReviewRecordLog>
        headerTitle="复习记录管理"
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              setCreateModalVisible(true);
            }}
          >
            <PlusOutlined /> 新建
          </Button>,
        ]}
        request={handleRequest}
        columns={columns}
        scroll={{ x: 1600 }}
      />
      <CreateModal
        visible={createModalVisible}
        onSubmit={handleCreateSuccess}
        onCancel={handleCreateCancel}
      />
      <UpdateModal
        visible={updateModalVisible}
        oldData={currentRow}
        onSubmit={handleUpdateSuccess}
        onCancel={handleUpdateCancel}
      />
    </div>
  );
};

export default ReviewRecordLogAdminPage;