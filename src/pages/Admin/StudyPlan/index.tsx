import CreateModal from './CreateModal';
import UpdateModal from './UpdateModal';
import {
  deleteStudyPlanUsingPost,
  listStudyPlanByPageUsingPost,
} from '@/services/backend/xuexijihuaguanlijiekou';
import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Badge, Button, message, Popconfirm, Progress, Space, Typography } from 'antd';
import React, { useRef, useState } from 'react';

const { Text } = Typography;

/**
 * 学习计划管理页面
 */
const StudyPlanAdminPage: React.FC = () => {
  const [createModalVisible, setCreateModalVisible] = useState<boolean>(false);
  const [updateModalVisible, setUpdateModalVisible] = useState<boolean>(false);
  const [currentRow, setCurrentRow] = useState<API.StudyPlan>();
  const actionRef = useRef<ActionType>();

  /**
   * 删除节点
   *
   * @param row
   */
  const handleDelete = async (row: API.StudyPlan) => {
    const hide = message.loading('正在删除');
    if (!row) return true;
    try {
      await deleteStudyPlanUsingPost({
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
  const handleEdit = (row: API.StudyPlan) => {
    setCurrentRow(row);
    setUpdateModalVisible(true);
  };

  /**
   * 表格列配置
   */
  const columns: ProColumns<API.StudyPlan>[] = [
    {
      title: 'ID',
      dataIndex: 'id',
      valueType: 'text',
      hideInForm: true,
      width: 80,
    },
    {
      title: '计划名称',
      dataIndex: 'planName',
      valueType: 'text',
      width: 150,
      formItemProps: {
        rules: [
          {
            required: true,
            message: '计划名称为必填项',
          },
        ],
      },
    },
    {
      title: '计划描述',
      dataIndex: 'planDescription',
      valueType: 'textarea',
      ellipsis: true,
      width: 200,
      render: (_, record) => (
        <Text style={{ maxWidth: 200 }} ellipsis={{ tooltip: record.planDescription }}>
          {record.planDescription || '-'}
        </Text>
      ),
    },
    {
      title: '卡片集ID',
      dataIndex: 'cardSetId',
      valueType: 'digit',
      width: 100,
      formItemProps: {
        rules: [
          {
            required: true,
            message: '卡片集ID为必填项',
          },
        ],
      },
    },
    {
      title: '每日目标',
      dataIndex: 'dailyTarget',
      valueType: 'digit',
      width: 80,
      formItemProps: {
        rules: [
          {
            required: true,
            message: '每日目标为必填项',
          },
        ],
      },
    },
    {
      title: '开始时间',
      dataIndex: 'startTime',
      valueType: 'dateTime',
      width: 150,
      formItemProps: {
        rules: [
          {
            required: true,
            message: '开始时间为必填项',
          },
        ],
      },
    },
    {
      title: '结束时间',
      dataIndex: 'endTime',
      valueType: 'dateTime',
      width: 150,
      formItemProps: {
        rules: [
          {
            required: true,
            message: '结束时间为必填项',
          },
        ],
      },
    },
    {
      title: '状态',
      dataIndex: 'status',
      valueType: 'select',
      valueEnum: {
        0: { text: '未开始', status: 'Default' },
        1: { text: '进行中', status: 'Processing' },
        2: { text: '已完成', status: 'Success' },
        3: { text: '已暂停', status: 'Warning' },
      },
      width: 100,
      render: (_, record) => {
        const statusMap = {
          0: { text: '未开始', color: 'default' },
          1: { text: '进行中', color: 'processing' },
          2: { text: '已完成', color: 'success' },
          3: { text: '已暂停', color: 'warning' },
        };
        const status = statusMap[record.status as keyof typeof statusMap] || statusMap[0];
        return <Badge status={status.color as any} text={status.text} />;
      },
    },
    {
      title: '学习进度',
      dataIndex: 'progress',
      valueType: 'digit',
      hideInSearch: true,
      hideInForm: true,
      width: 120,
      render: (_, record) => (
        <Progress
          percent={record.progress || 0}
          size="small"
          status={record.progress === 100 ? 'success' : 'active'}
        />
      ),
    },
    {
      title: '已学习卡片',
      dataIndex: 'studiedCardCount',
      valueType: 'digit',
      hideInSearch: true,
      hideInForm: true,
      width: 100,
    },
    {
      title: '总卡片数',
      dataIndex: 'totalCardCount',
      valueType: 'digit',
      hideInSearch: true,
      hideInForm: true,
      width: 100,
    },
    {
      title: '连续天数',
      dataIndex: 'consecutiveDays',
      valueType: 'digit',
      hideInSearch: true,
      hideInForm: true,
      width: 80,
    },
    {
      title: '是否完成',
      dataIndex: 'isCompleted',
      valueType: 'select',
      valueEnum: {
        0: { text: '未完成', status: 'Default' },
        1: { text: '已完成', status: 'Success' },
      },
      hideInForm: true,
      width: 80,
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
      title: '更新时间',
      dataIndex: 'updateTime',
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
            title="确定要删除这个学习计划吗？"
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

    const { data, code } = await listStudyPlanByPageUsingPost({
      ...params,
      sortField,
      sortOrder,
      ...filter,
    } as API.StudyPlanQueryRequest);

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
      <ProTable<API.StudyPlan>
        headerTitle="学习计划管理"
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
        scroll={{ x: 1800 }}
      />
      <CreateModal
        visible={createModalVisible}
        columns={columns}
        onSubmit={handleCreateSuccess}
        onCancel={handleCreateCancel}
      />
      <UpdateModal
        visible={updateModalVisible}
        oldData={currentRow}
        columns={columns}
        onSubmit={handleUpdateSuccess}
        onCancel={handleUpdateCancel}
      />
    </div>
  );
};

export default StudyPlanAdminPage;