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
  CreatePermissionGroupRequest,
  PermissionGroupWithApiSearchRequest,
  ResultOutputGuid,
  ResultOutputInt32,
  ResultOutputListPermissionGroupOutput,
  ResultOutputListPermissionGroupWithApiOutput,
  UpdatePermissionGroupRequest,
} from './data-contracts'
import { ContentType, HttpClient, RequestParams } from './http-client'

export class PermissionGroupApi<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags permission-group
   * @name Create
   * @summary 创建权限组
   * @request POST:/api/console/permission-group/create
   * @secure
   */
  create = (data: CreatePermissionGroupRequest, params: RequestParams = {}) =>
    this.request<ResultOutputGuid, any>({
      path: `/api/console/permission-group/create`,
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
   * @tags permission-group
   * @name Update
   * @summary 编辑权限组
   * @request PUT:/api/console/permission-group/update
   * @secure
   */
  update = (data: UpdatePermissionGroupRequest, params: RequestParams = {}) =>
    this.request<ResultOutputGuid, any>({
      path: `/api/console/permission-group/update`,
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
   * @tags permission-group
   * @name Delete
   * @summary 删除权限组
   * @request DELETE:/api/console/permission-group/delete
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
      path: `/api/console/permission-group/delete`,
      method: 'DELETE',
      query: query,
      secure: true,
      format: 'json',
      ...params,
    })
  /**
   * No description
   *
   * @tags permission-group
   * @name List
   * @summary 权限组列表查询(WithApi)
   * @request POST:/api/console/permission-group/list
   * @secure
   */
  list = (data: PermissionGroupWithApiSearchRequest, params: RequestParams = {}) =>
    this.request<ResultOutputListPermissionGroupWithApiOutput, any>({
      path: `/api/console/permission-group/list`,
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
   * @tags permission-group
   * @name AuthPermissionGroup
   * @summary 可被授予的权限组
   * @request POST:/api/console/permission-group/auth-permission-group
   * @secure
   */
  authPermissionGroup = (params: RequestParams = {}) =>
    this.request<ResultOutputListPermissionGroupOutput, any>({
      path: `/api/console/permission-group/auth-permission-group`,
      method: 'POST',
      secure: true,
      format: 'json',
      ...params,
    })
}
