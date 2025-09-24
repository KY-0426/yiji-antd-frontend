// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 创建用户卡片集关系 POST /api/usercardset/add */
export async function addUserCardSetUsingPost(
  body: API.UserCardSetAddRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseLong_>('/api/usercardset/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 批量收藏卡片集 POST /api/usercardset/batch/favorite */
export async function batchFavoriteCardSetsUsingPost(
  body: number[],
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/usercardset/batch/favorite', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 批量取消收藏卡片集 POST /api/usercardset/batch/unfavorite */
export async function batchUnfavoriteCardSetsUsingPost(
  body: number[],
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/usercardset/batch/unfavorite', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除用户卡片集关系 POST /api/usercardset/delete */
export async function deleteUserCardSetUsingPost(
  body: API.DeleteRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/usercardset/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 编辑用户卡片集关系 POST /api/usercardset/edit */
export async function editUserCardSetUsingPost(
  body: API.UserCardSetEditRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/usercardset/edit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取用户收藏的卡片集数量 GET /api/usercardset/favorite/count */
export async function countFavoriteCardSetsByUserIdUsingGet(options?: { [key: string]: any }) {
  return request<API.BaseResponseLong_>('/api/usercardset/favorite/count', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 获取卡片集收藏统计信息 GET /api/usercardset/favorite/statistics */
export async function getCardSetFavoriteStatisticsUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getCardSetFavoriteStatisticsUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseUserCardSetVO_>('/api/usercardset/favorite/statistics', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取卡片集被收藏的用户数量 GET /api/usercardset/favorite/users/count */
export async function countFavoriteUsersByCardSetIdUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.countFavoriteUsersByCardSetIdUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseLong_>('/api/usercardset/favorite/users/count', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 根据id获取用户卡片集关系 GET /api/usercardset/get/vo */
export async function getUserCardSetVoByIdUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getUserCardSetVOByIdUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseUserCardSetVO_>('/api/usercardset/get/vo', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 分页获取用户卡片集关系列表（仅管理员） POST /api/usercardset/list/page */
export async function listUserCardSetByPageUsingPost(
  body: API.UserCardSetQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageUserCardSet_>('/api/usercardset/list/page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 分页获取用户卡片集关系列表 POST /api/usercardset/list/page/vo */
export async function listUserCardSetVoByPageUsingPost(
  body: API.UserCardSetQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageUserCardSetVO_>('/api/usercardset/list/page/vo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 分页获取当前用户创建的用户卡片集关系列表 POST /api/usercardset/my/list/page/vo */
export async function listMyUserCardSetVoByPageUsingPost(
  body: API.UserCardSetQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageUserCardSetVO_>('/api/usercardset/my/list/page/vo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取用户最近学习的卡片集列表 GET /api/usercardset/recent/study */
export async function listRecentStudyCardSetsUsingGet(options?: { [key: string]: any }) {
  return request<API.BaseResponseListUserCardSetVO_>('/api/usercardset/recent/study', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 获取推荐的卡片集列表 GET /api/usercardset/recommended */
export async function listRecommendedCardSetsUsingGet(options?: { [key: string]: any }) {
  return request<API.BaseResponseListUserCardSetVO_>('/api/usercardset/recommended', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 获取用户学习统计信息 GET /api/usercardset/study/statistics */
export async function getUserStudyStatisticsUsingGet(options?: { [key: string]: any }) {
  return request<API.BaseResponseUserCardSetVO_>('/api/usercardset/study/statistics', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 更新用户卡片集关系（仅管理员） POST /api/usercardset/update */
export async function updateUserCardSetUsingPost(
  body: API.UserCardSetUpdateRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/usercardset/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
