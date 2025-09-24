// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 创建卡片集 POST /api/cardset/add */
export async function addCardSetUsingPost(
  body: API.CardSetAddRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseLong_>('/api/cardset/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除卡片集 POST /api/cardset/delete */
export async function deleteCardSetUsingPost(
  body: API.DeleteRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/cardset/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 编辑卡片集 POST /api/cardset/edit */
export async function editCardSetUsingPost(
  body: API.CardSetEditRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/cardset/edit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 根据id获取卡片集 GET /api/cardset/get/vo */
export async function getCardSetVoByIdUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getCardSetVOByIdUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseCardSetVO_>('/api/cardset/get/vo', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 分页获取卡片集列表（仅管理员） POST /api/cardset/list/page */
export async function listCardSetByPageUsingPost(
  body: API.CardSetQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageCardSet_>('/api/cardset/list/page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 分页获取卡片集列表 POST /api/cardset/list/page/vo */
export async function listCardSetVoByPageUsingPost(
  body: API.CardSetQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageCardSetVO_>('/api/cardset/list/page/vo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 分页获取当前用户创建的卡片集列表 POST /api/cardset/my/list/page/vo */
export async function listMyCardSetVoByPageUsingPost(
  body: API.CardSetQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageCardSetVO_>('/api/cardset/my/list/page/vo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 更新卡片集（仅管理员） POST /api/cardset/update */
export async function updateCardSetUsingPost(
  body: API.CardSetUpdateRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/cardset/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
