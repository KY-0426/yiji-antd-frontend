// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 创建卡片 POST /api/card/add */
export async function addCardUsingPost(body: API.CardAddRequest, options?: { [key: string]: any }) {
  return request<API.BaseResponseLong_>('/api/card/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除卡片 POST /api/card/delete */
export async function deleteCardUsingPost(
  body: API.DeleteRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/card/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 编辑卡片 POST /api/card/edit */
export async function editCardUsingPost(
  body: API.CardEditRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/card/edit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 根据id获取卡片 GET /api/card/get/vo */
export async function getCardVoByIdUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getCardVOByIdUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseCardVO_>('/api/card/get/vo', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 分页获取卡片列表（仅管理员） POST /api/card/list/page */
export async function listCardByPageUsingPost(
  body: API.CardQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageCard_>('/api/card/list/page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 分页获取卡片列表 POST /api/card/list/page/vo */
export async function listCardVoByPageUsingPost(
  body: API.CardQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageCardVO_>('/api/card/list/page/vo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 分页获取当前用户创建的卡片列表 POST /api/card/my/list/page/vo */
export async function listMyCardVoByPageUsingPost(
  body: API.CardQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageCardVO_>('/api/card/my/list/page/vo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 更新卡片（仅管理员） POST /api/card/update */
export async function updateCardUsingPost(
  body: API.CardUpdateRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/card/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
