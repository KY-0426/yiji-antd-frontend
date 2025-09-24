import CreateModal from './CreateModal';
import UpdateModal from './UpdateModal';
import {
  deleteCardSetUsingPost,
  listCardSetByPageUsingPost,
} from '@/services/backend/kapianjiguanlijiekou';
import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Avatar, Button, message, Popconfirm, Space, Tag, Typography } from 'antd';
import React, { useRef, useState } from 'react';

const { Text } = Typography;

/**
 * 卡片集管理页面
 */
const CardSetAdminPage: React.FC = () => {
  const [createModalVisible, setCreateModalVisible] = useState<boolean>(false);
  const [updateModalVisible, setUpdateModalVisible] = useState<boolean>(false);
  const [currentRow, setCurrentRow] = useState<API.CardSet>();
  const actionRef = useRef<ActionType>();

  /**
   * 删除节点
   *
   * @param row
   */
  const handleDelete = async (row: API.CardSet) => {
    const hide = message.loading('正在删除');
    if (!row) return true;
    try {
      await deleteCardSetUsingPost({
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
  const handleEdit = (row: API.CardSet) => {
    setCurrentRow(row);
    setUpdateModalVisible(true);
  };

  /**
   * 表格列配置
   */
  const columns: ProColumns<API.CardSet>[] = [
    {
      title: 'ID',
      dataIndex: 'id',
      valueType: 'text',
      hideInForm: true,
      width: 80,
    },
    {
      title: '卡片集名称',
      dataIndex: 'name',
      valueType: 'text',
      width: 150,
      formItemProps: {
        rules: [
          {
            required: true,
            message: '卡片集名称为必填项',
          },
        ],
      },
    },
    {
      title: '封面图片',
      dataIndex: 'coverImage',
      valueType: 'text',
      hideInSearch: true,
      width: 100,
      render: (_, record) => (
        record.coverImage ? (
          <Avatar
            size={40}
            src={record.coverImage}
            alt="封面"
          />
        ) : (
          <Avatar size={40}>封面</Avatar>
        )
      ),
    },
    {
      title: '描述',
      dataIndex: 'description',
      valueType: 'textarea',
      ellipsis: true,
      width: 200,
      render: (_, record) => (
        <Text style={{ maxWidth: 200 }} ellipsis={{ tooltip: record.description }}>
          {record.description || '-'}
        </Text>
      ),
    },
    {
      title: '类型',
      dataIndex: 'type',
      valueType: 'select',
      valueEnum: {
        0: { text: '公开', status: 'Success' },
        1: { text: '私有', status: 'Default' },
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
      title: '卡片数量',
      dataIndex: 'cardCount',
      valueType: 'digit',
      hideInSearch: true,
      hideInForm: true,
      width: 80,
    },
    {
      title: '学习次数',
      dataIndex: 'studyCount',
      valueType: 'digit',
      hideInSearch: true,
      hideInForm: true,
      width: 80,
    },
    {
      title: '点赞数',
      dataIndex: 'thumbNum',
      valueType: 'digit',
      hideInSearch: true,
      hideInForm: true,
      width: 80,
    },
    {
      title: '收藏数',
      dataIndex: 'favourNum',
      valueType: 'digit',
      hideInSearch: true,
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
            title="确定要删除这个卡片集吗？"
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

    const { data, code } = await listCardSetByPageUsingPost({
      ...params,
      sortField,
      sortOrder,
      ...filter,
    } as API.CardSetQueryRequest);

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
      <ProTable<API.CardSet>
        headerTitle="卡片集管理"
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
        scroll={{ x: 1500 }}
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

export default CardSetAdminPage;