import CreateModal from '@/pages/Admin/User/components/CreateModal';
import UpdateModal from '@/pages/Admin/User/components/UpdateModal';
import AvatarUpload from '@/pages/Admin/User/components/AvatarUpload';
import { deleteUserUsingPost, listUserByPageUsingPost } from '@/services/backend/userController';
import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import '@umijs/max';
import { Button, message, Space, Typography } from 'antd';
import React, { useRef, useState, useCallback, useMemo } from 'react';

// 常量定义
const PAGE_CONFIG = {
  TITLE: '用户管理',
  TABLE_TITLE: '查询表格',
  CREATE_BUTTON_TEXT: '新建',
  EDIT_TEXT: '修改',
  DELETE_TEXT: '删除',
  DELETE_LOADING: '正在删除',
  DELETE_SUCCESS: '删除成功',
  DELETE_ERROR: '删除失败，',
} as const;

const USER_ROLES = {
  user: { text: '用户' },
  admin: { text: '管理员' },
} as const;

/**
 * 用户管理页面
 */
const UserAdminPage: React.FC = () => {
  const [createModalVisible, setCreateModalVisible] = useState<boolean>(false);
  const [updateModalVisible, setUpdateModalVisible] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<API.User>();

  /**
   * 删除用户
   * @param row 用户数据
   * @returns 是否成功
   */
  const handleDelete = useCallback(async (row: API.User): Promise<boolean> => {
    if (!row?.id) return false;
    
    const hide = message.loading(PAGE_CONFIG.DELETE_LOADING);
    try {
      await deleteUserUsingPost({ id: row.id });
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
   * 处理编辑用户
   */
  const handleEdit = useCallback((record: API.User) => {
    setCurrentRow(record);
    setUpdateModalVisible(true);
  }, []);

  /**
   * 处理头像上传
   */
  const handleAvatarChange = useCallback((value: string, onChange?: (url: string) => void, form?: any) => {
    if (onChange) {
      onChange(value);
    } else if (form) {
      form.setFieldsValue({ userAvatar: value });
    }
  }, []);

  /**
   * 表格列配置
   */
  const columns: ProColumns<API.User>[] = useMemo(() => [
    {
      title: 'ID',
      dataIndex: 'id',
      valueType: 'text',
      hideInForm: true,
      width: 80,
    },
    {
      title: '账号',
      dataIndex: 'userAccount',
      valueType: 'text',
      width: 120,
      formItemProps: {
        rules: [
          {
            required: true,
            message: '请输入账号',
          },
        ],
      },
      fieldProps: (form, { rowIndex, rowKey }) => {
        return {
          disabled: !!form?.getFieldValue?.('id'),
        };
      },
    },
    {
      title: '用户名',
      dataIndex: 'userName',
      valueType: 'text',
      width: 120,
    },
    {
      title: '头像',
      dataIndex: 'userAvatar',
      valueType: 'image',
      fieldProps: { width: 64 },
      hideInSearch: true,
      width: 80,
      renderFormItem: (_, { value, onChange }, form) => (
        <AvatarUpload 
          value={value} 
          onChange={(url) => handleAvatarChange(url, onChange, form)} 
        />
      ),
    },
    {
      title: '简介',
      dataIndex: 'userProfile',
      valueType: 'textarea',
      ellipsis: true,
      width: 200,
    },
    {
      title: '权限',
      dataIndex: 'userRole',
      valueEnum: USER_ROLES,
      width: 100,
      initialValue: 'user',
    },
    {
      title: '创建时间',
      sorter: true,
      dataIndex: 'createTime',
      valueType: 'dateTime',
      hideInSearch: true,
      hideInForm: true,
      width: 180,
    },
    {
      title: '更新时间',
      sorter: true,
      dataIndex: 'updateTime',
      valueType: 'dateTime',
      hideInSearch: true,
      hideInForm: true,
      width: 180,
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
  ], [handleDelete, handleEdit, handleAvatarChange]);
  // 处理表格数据请求
  const handleRequest = useCallback(async (params: any, sort: any, filter: any) => {
    const sortField = Object.keys(sort)?.[0];
    const sortOrder = sort?.[sortField] ?? undefined;

    const { data, code } = await listUserByPageUsingPost({
      ...params,
      sortField,
      sortOrder,
      ...filter,
    } as API.UserQueryRequest);

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
      <ProTable<API.User>
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
export default UserAdminPage;
