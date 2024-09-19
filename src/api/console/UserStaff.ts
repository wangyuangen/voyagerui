/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

import {
  CreateUserStaffRequest,
  ResultOutputGuid,
  ResultOutputInt32,
  ResultOutputListUserStaffOutput,
  ResultOutputPaginationResponseUserStaffPageOutput,
  ResultOutputUserStaffExtendOutput,
  ResultOutputUserStaffPageOutput,
  UpdateUserStaffRequest,
  UserStaffPageRequest,
} from './data-contracts'
import { ContentType, HttpClient, RequestParams } from './http-client'

export class UserStaffApi<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags user-staff
   * @name Create
   * @summary 创建员工
   * @request POST:/api/console/user-staff/create
   * @secure
   */
  create = (data: CreateUserStaffRequest, params: RequestParams = {}) =>
    this.request<ResultOutputGuid, any>({
      path: `/api/console/user-staff/create`,
      method: 'POST',
      body: data,
      secure: true,
      type: ContentType.Json,
      format: 'json',
      ...params,
    })
  /**
   * No description
   *
   * @tags user-staff
   * @name Update
   * @summary 编辑员工
   * @request PUT:/api/console/user-staff/update
   * @secure
   */
  update = (data: UpdateUserStaffRequest, params: RequestParams = {}) =>
    this.request<ResultOutputGuid, any>({
      path: `/api/console/user-staff/update`,
      method: 'PUT',
      body: data,
      secure: true,
      type: ContentType.Json,
      format: 'json',
      ...params,
    })
  /**
   * No description
   *
   * @tags user-staff
   * @name Delete
   * @summary 删除员工
   * @request DELETE:/api/console/user-staff/delete
   * @secure
   */
  delete = (
    query: {
      /** @format uuid */
      id: string
    },
    params: RequestParams = {}
  ) =>
    this.request<ResultOutputInt32, any>({
      path: `/api/console/user-staff/delete`,
      method: 'DELETE',
      query: query,
      secure: true,
      format: 'json',
      ...params,
    })
  /**
   * No description
   *
   * @tags user-staff
   * @name Page
   * @summary 员工分页查询
   * @request POST:/api/console/user-staff/page
   * @secure
   */
  page = (data: UserStaffPageRequest, params: RequestParams = {}) =>
    this.request<ResultOutputPaginationResponseUserStaffPageOutput, any>({
      path: `/api/console/user-staff/page`,
      method: 'POST',
      body: data,
      secure: true,
      type: ContentType.Json,
      format: 'json',
      ...params,
    })
  /**
   * No description
   *
   * @tags user-staff
   * @name ExtendForm
   * @summary 员工表单扩展信息
   * @request POST:/api/console/user-staff/extend-form
   * @secure
   */
  extendForm = (
    query: {
      /** @format uuid */
      id: string
    },
    params: RequestParams = {}
  ) =>
    this.request<ResultOutputUserStaffExtendOutput, any>({
      path: `/api/console/user-staff/extend-form`,
      method: 'POST',
      query: query,
      secure: true,
      format: 'json',
      ...params,
    })
  /**
   * No description
   *
   * @tags user-staff
   * @name CurrentUserStaff
   * @summary 获取当前用户的多重员工身份
   * @request POST:/api/console/user-staff/current-user-staff
   * @secure
   */
  currentUserStaff = (params: RequestParams = {}) =>
    this.request<ResultOutputListUserStaffOutput, any>({
      path: `/api/console/user-staff/current-user-staff`,
      method: 'POST',
      secure: true,
      format: 'json',
      ...params,
    })
  /**
   * No description
   *
   * @tags user-staff
   * @name GetPersonal
   * @summary 获取当前个人身份信息
   * @request GET:/api/console/user-staff/get-personal
   * @secure
   */
  getPersonal = (params: RequestParams = {}) =>
    this.request<ResultOutputUserStaffPageOutput, any>({
      path: `/api/console/user-staff/get-personal`,
      method: 'GET',
      secure: true,
      format: 'json',
      ...params,
    })
}
