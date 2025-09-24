import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns, ProDescriptionsItemProps } from '@ant-design/pro-components';
import {
  FooterToolbar,
  ModalForm,
  PageContainer,
  ProDescriptions,
  ProFormText,
  ProFormTextArea,
  ProTable,
} from '@ant-design/pro-components';
import '@umijs/max';
import { Button, Drawer, Input, message } from 'antd';
import React, { useRef, useState } from 'react';
import type { FormValueType } from './components/UpdateForm';
import UpdateForm from './components/UpdateForm';
import {
  addUserCardSetUsingPost,
  deleteUserCardSetUsingPost,
  listUserCardSetByPageUsingPost,
  updateUserCardSetUsingPost,
} from '@/services/backend/yonghukapianjiguanxiguanlijiekou';
import CreateModal from './CreateModal';
import UpdateModal from './UpdateModal';

/**
 * @en-US Add node
 * @zh-CN 添加节点
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
 * @en-US Update node
 * @zh-CN 更新节点
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
 * @en-US Delete node
 * @zh-CN 删除节点
 *
 * @param selectedRows
 */
const handleRemove = async (record: API.UserCardSet) => {
  const hide = message.loading('正在删除');
  if (!record) return true;
  try {
    await deleteUserCardSetUsingPost({
      id: record.id,
    });
    hide();
    message.success('删除成功');
    return true;
  } catch (error: any) {
    hide();
    message.error('删除失败，' + error.message);
    return false;
  }
};

const TableList: React.FC = () => {
  /**
   * @en-US Pop-up window of new window
   * @zh-CN 新建窗口的弹窗
   */
  const [createModalOpen, handleModalOpen] = useState<boolean>(false);
  /**
   * @en-US The pop-up window of the distribution update window
   * @zh-CN 分布更新窗口的弹窗
   */
  const [updateModalOpen, handleUpdateModalOpen] = useState<boolean>(false);
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<API.UserCardSet>();
  const [selectedRowsState, setSelectedRows] = useState<API.UserCardSet[]>([]);

  /**
   * @en-US International configuration
   * @zh-CN 国际化配置
   * */

  const columns: ProColumns<API.UserCardSet>[] = [
    {
      title: 'id',
      dataIndex: 'id',
      valueType: 'text',
      hideInForm: true,
    },
    {
      title: '用户ID',
      dataIndex: 'userId',
      valueType: 'text',
    },
    {
      title: '卡片集ID',
      dataIndex: 'cardSetId',
      valueType: 'text',
    },
    {
      title: '关系类型',
      dataIndex: 'relationType',
      valueType: 'select',
      valueEnum: {
        0: {
          text: '收藏',
          status: 'Default',
        },
        1: {
          text: '学习',
          status: 'Processing',
        },
        2: {
          text: '完成',
          status: 'Success',
        },
      },
    },
    {
      title: '学习进度',
      dataIndex: 'progress',
      valueType: 'digit',
      hideInSearch: true,
      render: (_, record) => {
        const progress = record.progress || 0;
        return `${progress}%`;
      },
    },
    {
      title: '最后学习时间',
      dataIndex: 'lastStudyTime',
      valueType: 'dateTime',
      hideInSearch: true,
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      valueType: 'dateTime',
      hideInForm: true,
      hideInSearch: true,
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      valueType: 'dateTime',
      hideInForm: true,
      hideInSearch: true,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        <a
          key="config"
          onClick={() => {
            handleUpdateModalOpen(true);
            setCurrentRow(record);
          }}
        >
          修改
        </a>,
        <a
          key="delete"
          onClick={() => {
            handleRemove(record);
            actionRef.current?.reloadAndRest?.();
          }}
        >
          删除
        </a>,
      ],
    },
  ];
  return (
    <PageContainer>
      <ProTable<API.UserCardSet, API.PageParams>
        headerTitle={'查询表格'}
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
              handleModalOpen(true);
            }}
          >
            <PlusOutlined /> 新建
          </Button>,
        ]}
        request={async (params, sort, filter) => {
          const sortField = Object.keys(sort)?.[0];
          const sortOrder = sort?.[sortField] ?? undefined;

          const { data, code } = await listUserCardSetByPageUsingPost({
            ...params,
            sortField,
            sortOrder,
            ...filter,
          } as API.UserCardSetQueryRequest);

          return {
            success: code === 0,
            data: data?.records || [],
            total: Number(data?.total) || 0,
          };
        }}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => {
            setSelectedRows(selectedRows);
          },
        }}
      />
      {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              已选择{' '}
              <a
                style={{
                  fontWeight: 600,
                }}
              >
                {selectedRowsState.length}
              </a>{' '}
              项 &nbsp;&nbsp;
              <span>
                服务调用次数总计 {selectedRowsState.reduce((pre, item) => pre + item.id!, 0)} 万
              </span>
            </div>
          }
        >
          <Button
            onClick={async () => {
              await handleRemove(selectedRowsState);
              setSelectedRows([]);
              actionRef.current?.reloadAndRest?.();
            }}
          >
            批量删除
          </Button>
          <Button type="primary">批量审批</Button>
        </FooterToolbar>
      )}
      <CreateModal
        open={createModalOpen}
        onCancel={() => handleModalOpen(false)}
        onSubmit={(values) => {
          handleAdd(values).then((success) => {
            if (success) {
              handleModalOpen(false);
              actionRef.current?.reloadAndRest?.();
            }
          });
        }}
      />
      <UpdateModal
        open={updateModalOpen}
        onCancel={() => {
          handleUpdateModalOpen(false);
          setCurrentRow(undefined);
        }}
        onSubmit={(values) => {
          handleUpdate(values).then((success) => {
            if (success) {
              handleUpdateModalOpen(false);
              setCurrentRow(undefined);
              actionRef.current?.reloadAndRest?.();
            }
          });
        }}
        values={currentRow || {}}
      />

      <Drawer
        width={600}
        open={showDetail}
        onClose={() => {
          setCurrentRow(undefined);
          setShowDetail(false);
        }}
        closable={false}
      >
        {currentRow?.id && (
          <ProDescriptions<API.UserCardSet>
            column={2}
            title={currentRow?.id}
            request={async () => ({
              data: currentRow || {},
            })}
            params={{
              id: currentRow?.id,
            }}
            columns={columns as ProDescriptionsItemProps<API.UserCardSet>[]}>
          </ProDescriptions>
        )}
      </Drawer>
    </PageContainer>
  );
};
export default TableList;