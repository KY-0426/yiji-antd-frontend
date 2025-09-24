import CreateModal from '@/pages/Admin/Card/components/CreateModal';
import UpdateModal from '@/pages/Admin/Card/components/UpdateModal';
import { deleteCardUsingPost, listCardByPageUsingPost } from '@/services/backend/kapianguanlijiekou';
import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import '@umijs/max';
import { Button, message, Space, Tag, Typography } from 'antd';
import React, { useRef, useState, useCallback, useMemo } from 'react';

const { Text } = Typography;

// 常量定义
const PAGE_CONFIG = {
  TITLE: '卡片管理',
  TABLE_TITLE: '查询表格',
  CREATE_BUTTON_TEXT: '新建',
  EDIT_TEXT: '修改',
  DELETE_TEXT: '删除',
  DELETE_LOADING: '正在删除',
  DELETE_SUCCESS: '删除成功',
  DELETE_ERROR: '删除失败，',
} as const;

/**
 * 卡片管理页面
 */
const CardAdminPage: React.FC = () => {
  const [createModalVisible, setCreateModalVisible] = useState<boolean>(false);
  const [updateModalVisible, setUpdateModalVisible] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<API.Card>();

  /**
   * 删除卡片
   * @param row 卡片数据
   * @returns 是否成功
   */
  const handleDelete = useCallback(async (row: API.Card): Promise<boolean> => {
    if (!row?.id) return false;
    
    const hide = message.loading(PAGE_CONFIG.DELETE_LOADING);
    try {
      await deleteCardUsingPost({ id: row.id });
      hide();
      message.success(PAGE_CONFIG.DELETE_SUCCESS);
      actionRef.current?.reload();
      return true;
    } catch (error: any) {
      hide();
      message.error(`${PAGE_CONFIG.DELETE_ERROR}${error.message}`);
      return false;
    }
  }, []);

  /**
   * 处理编辑卡片
   */
  const handleEdit = useCallback((record: API.Card) => {
    setCurrentRow(record);
    setUpdateModalVisible(true);
  }, []);

  /**
   * 表格列配置
   */
  const columns: ProColumns<API.Card>[] = useMemo(() => [
    {
      title: 'ID',
      dataIndex: 'id',
      valueType: 'text',
      hideInForm: true,
      width: 80,
    },
    {
      title: '正面内容',
      dataIndex: 'frontContent',
      valueType: 'textarea',
      ellipsis: true,
      width: 200,
      render: (_, record) => (
        <Text style={{ maxWidth: 200 }} ellipsis={{ tooltip: record.frontContent }}>
          {record.frontContent}
        </Text>
      ),
    },
    {
      title: '背面内容',
      dataIndex: 'backContent',
      valueType: 'textarea',
      ellipsis: true,
      width: 200,
      render: (_, record) => (
        <Text style={{ maxWidth: 200 }} ellipsis={{ tooltip: record.backContent }}>
          {record.backContent}
        </Text>
      ),
    },
    {
      title: '卡片集ID',
      dataIndex: 'cardSetId',
      valueType: 'text',
      width: 100,
    },
    {
      title: '类型',
      dataIndex: 'type',
      valueType: 'select',
      valueEnum: {
        0: { text: '文本', status: 'Default' },
        1: { text: '图片', status: 'Processing' },
        2: { text: '音频', status: 'Success' },
        3: { text: '视频', status: 'Error' },
      },
      width: 80,
    },
    {
      title: '难度',
      dataIndex: 'difficulty',
      valueType: 'select',
      valueEnum: {
        1: { text: '很简单', status: 'Success' },
        2: { text: '简单', status: 'Processing' },
        3: { text: '中等', status: 'Default' },
        4: { text: '困难', status: 'Warning' },
        5: { text: '很困难', status: 'Error' },
      },
      width: 80,
    },
    {
      title: '标签',
      dataIndex: 'tags',
      valueType: 'select',
      fieldProps: {
        mode: 'tags',
        placeholder: '请输入标签，按回车添加',
      },
      hideInSearch: true,
      width: 120,
      render: (_, record) => {
        if (!record.tags) return '-';
        try {
          const tagList = JSON.parse(record.tags);
          return (
            <Space wrap>
              {tagList.map((tag: string, index: number) => (
                <Tag key={index} color="blue">
                  {tag}
                </Tag>
              ))}
            </Space>
          );
        } catch {
          return record.tags;
        }
      },
    },
    {
      title: '复习次数',
      dataIndex: 'reviewCount',
      valueType: 'digit',
      hideInSearch: true,
      width: 80,
    },
    {
      title: '正确次数',
      dataIndex: 'correctCount',
      valueType: 'digit',
      hideInSearch: true,
      width: 80,
    },
    {
      title: '下次复习时间',
      dataIndex: 'nextReviewTime',
      valueType: 'dateTime',
      hideInSearch: true,
      width: 150,
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
        <Space size="middle">
          <Typography.Link onClick={() => handleEdit(record)}>
            {PAGE_CONFIG.EDIT_TEXT}
          </Typography.Link>
          <Typography.Link type="danger" onClick={() => handleDelete(record)}>
            {PAGE_CONFIG.DELETE_TEXT}
          </Typography.Link>
        </Space>
      ),
    },
  ], [handleDelete, handleEdit]);

  // 处理表格数据请求
  const handleRequest = useCallback(async (params: any, sort: any, filter: any) => {
    const sortField = Object.keys(sort)?.[0];
    const sortOrder = sort?.[sortField] ?? undefined;

    const { data, code } = await listCardByPageUsingPost({
      ...params,
      sortField,
      sortOrder,
      ...filter,
    } as API.CardQueryRequest);

    return {
      success: code === 0,
      data: data?.records || [],
      total: Number(data?.total) || 0,
    };
  }, []);

  // 处理创建成功
  const handleCreateSuccess = useCallback(() => {
    setCreateModalVisible(false);
    actionRef.current?.reload();
  }, []);

  // 处理更新成功
  const handleUpdateSuccess = useCallback(() => {
    setUpdateModalVisible(false);
    setCurrentRow(undefined);
    actionRef.current?.reload();
  }, []);

  // 处理取消操作
  const handleCreateCancel = useCallback(() => {
    setCreateModalVisible(false);
  }, []);

  const handleUpdateCancel = useCallback(() => {
    setUpdateModalVisible(false);
    setCurrentRow(undefined);
  }, []);

  return (
    <PageContainer title={PAGE_CONFIG.TITLE}>
      <ProTable<API.Card>
        headerTitle={PAGE_CONFIG.TABLE_TITLE}
        actionRef={actionRef}
        rowKey="id"
        search={{ labelWidth: 120 }}
        scroll={{ x: 1200 }}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            icon={<PlusOutlined />}
            onClick={() => setCreateModalVisible(true)}
          >
            {PAGE_CONFIG.CREATE_BUTTON_TEXT}
          </Button>,
        ]}
        request={handleRequest}
        columns={columns}
      />
      
      <CreateModal
        visible={createModalVisible}
        columns={columns}
        onSubmit={handleCreateSuccess}
        onCancel={handleCreateCancel}
      />
      
      <UpdateModal
        visible={updateModalVisible}
        columns={columns}
        oldData={currentRow}
        onSubmit={handleUpdateSuccess}
        onCancel={handleUpdateCancel}
      />
    </PageContainer>
  );
};

export default CardAdminPage;