// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 创建复习记录日志 POST /api/reviewrecordlog/add */
export async function addReviewRecordLogUsingPost(
  body: API.ReviewRecordLogAddRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseLong_>('/api/reviewrecordlog/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除复习记录日志 POST /api/reviewrecordlog/delete */
export async function deleteReviewRecordLogUsingPost(
  body: API.DeleteRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/reviewrecordlog/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 编辑复习记录日志 POST /api/reviewrecordlog/edit */
export async function editReviewRecordLogUsingPost(
  body: API.ReviewRecordLogEditRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/reviewrecordlog/edit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 根据id获取复习记录日志 GET /api/reviewrecordlog/get/vo */
export async function getReviewRecordLogVoByIdUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getReviewRecordLogVOByIdUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseReviewRecordLogVO_>('/api/reviewrecordlog/get/vo', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 分页获取复习记录日志列表（仅管理员） POST /api/reviewrecordlog/list/page */
export async function listReviewRecordLogByPageUsingPost(
  body: API.ReviewRecordLogQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageReviewRecordLog_>('/api/reviewrecordlog/list/page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 分页获取复习记录日志列表 POST /api/reviewrecordlog/list/page/vo */
export async function listReviewRecordLogVoByPageUsingPost(
  body: API.ReviewRecordLogQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageReviewRecordLogVO_>('/api/reviewrecordlog/list/page/vo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 分页获取当前用户创建的复习记录日志列表 POST /api/reviewrecordlog/my/list/page/vo */
export async function listMyReviewRecordLogVoByPageUsingPost(
  body: API.ReviewRecordLogQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageReviewRecordLogVO_>('/api/reviewrecordlog/my/list/page/vo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 更新复习记录日志（仅管理员） POST /api/reviewrecordlog/update */
export async function updateReviewRecordLogUsingPost(
  body: API.ReviewRecordLogUpdateRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/reviewrecordlog/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
