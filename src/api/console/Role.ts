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
  CreateRoleInfoRequest,
  ResultOutputGuid,
  ResultOutputInt32,
  ResultOutputListRoleInfoOutput,
  ResultOutputPaginationResponseRoleInfoOutput,
  ResultOutputRoleAuthInfoOutput,
  RoleInfoAuthChangeRequest,
  RoleInfoPageRequest,
  RoleInfoSearchRequest,
  UpdateRoleInfoRequest,
} from './data-contracts'
import { ContentType, HttpClient, RequestParams } from './http-client'

export class RoleApi<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags role
   * @name Create
   * @summary 创建角色
   * @request POST:/api/console/role/create
   * @secure
   */
  create = (data: CreateRoleInfoRequest, params: RequestParams = {}) =>
    this.request<ResultOutputGuid, any>({
      path: `/api/console/role/create`,
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
   * @tags role
   * @name Update
   * @summary 编辑角色
   * @request PUT:/api/console/role/update
   * @secure
   */
  update = (data: UpdateRoleInfoRequest, params: RequestParams = {}) =>
    this.request<ResultOutputGuid, any>({
      path: `/api/console/role/update`,
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
   * @tags role
   * @name Delete
   * @summary 删除角色
   * @request DELETE:/api/console/role/delete
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
      path: `/api/console/role/delete`,
      method: 'DELETE',
      query: query,
      secure: true,
      format: 'json',
      ...params,
    })
  /**
   * No description
   *
   * @tags role
   * @name AuthChange
   * @summary 角色授权变更
   * @request POST:/api/console/role/auth-change
   * @secure
   */
  authChange = (data: RoleInfoAuthChangeRequest, params: RequestParams = {}) =>
    this.request<ResultOutputGuid, any>({
      path: `/api/console/role/auth-change`,
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
   * @tags role
   * @name AuthInfo
   * @summary 获取角色授权信息
   * @request POST:/api/console/role/auth-info
   * @secure
   */
  authInfo = (
    query: {
      /** @format uuid */
      id: string
    },
    params: RequestParams = {}
  ) =>
    this.request<ResultOutputRoleAuthInfoOutput, any>({
      path: `/api/console/role/auth-info`,
      method: 'POST',
      query: query,
      secure: true,
      format: 'json',
      ...params,
    })
  /**
   * No description
   *
   * @tags role
   * @name List
   * @summary 角色列表查询
   * @request POST:/api/console/role/list
   * @secure
   */
  list = (data: RoleInfoSearchRequest, params: RequestParams = {}) =>
    this.request<ResultOutputListRoleInfoOutput, any>({
      path: `/api/console/role/list`,
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
   * @tags role
   * @name Page
   * @summary 角色分页查询
   * @request POST:/api/console/role/page
   * @secure
   */
  page = (data: RoleInfoPageRequest, params: RequestParams = {}) =>
    this.request<ResultOutputPaginationResponseRoleInfoOutput, any>({
      path: `/api/console/role/page`,
      method: 'POST',
      body: data,
      secure: true,
      type: ContentType.Json,
      format: 'json',
      ...params,
    })
}
