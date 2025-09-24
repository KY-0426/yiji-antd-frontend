// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 创建学习计划 POST /api/studyplan/add */
export async function addStudyPlanUsingPost(
  body: API.StudyPlanAddRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseLong_>('/api/studyplan/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除学习计划 POST /api/studyplan/delete */
export async function deleteStudyPlanUsingPost(
  body: API.DeleteRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/studyplan/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 编辑学习计划 POST /api/studyplan/edit */
export async function editStudyPlanUsingPost(
  body: API.StudyPlanEditRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/studyplan/edit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 根据id获取学习计划 GET /api/studyplan/get/vo */
export async function getStudyPlanVoByIdUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getStudyPlanVOByIdUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseStudyPlanVO_>('/api/studyplan/get/vo', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 分页获取学习计划列表（仅管理员） POST /api/studyplan/list/page */
export async function listStudyPlanByPageUsingPost(
  body: API.StudyPlanQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageStudyPlan_>('/api/studyplan/list/page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 分页获取学习计划列表 POST /api/studyplan/list/page/vo */
export async function listStudyPlanVoByPageUsingPost(
  body: API.StudyPlanQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageStudyPlanVO_>('/api/studyplan/list/page/vo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 分页获取当前用户创建的学习计划列表 POST /api/studyplan/my/list/page/vo */
export async function listMyStudyPlanVoByPageUsingPost(
  body: API.StudyPlanQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageStudyPlanVO_>('/api/studyplan/my/list/page/vo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 更新学习计划（仅管理员） POST /api/studyplan/update */
export async function updateStudyPlanUsingPost(
  body: API.StudyPlanUpdateRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/studyplan/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
