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
  CreateTenantRequest,
  ResultOutputGuid,
  ResultOutputListGuid,
  ResultOutputPaginationResponseTenantOutput,
  TenantPageRequest,
  UpdateTenantRequest,
} from './data-contracts'
import { ContentType, HttpClient, RequestParams } from './http-client'

export class TenantApi<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags tenant
   * @name Create
   * @summary 创建租户
   * @request POST:/api/console/tenant/create
   * @secure
   */
  create = (data: CreateTenantRequest, params: RequestParams = {}) =>
    this.request<ResultOutputGuid, any>({
      path: `/api/console/tenant/create`,
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
   * @tags tenant
   * @name Update
   * @summary 编辑租户
   * @request PUT:/api/console/tenant/update
   * @secure
   */
  update = (data: UpdateTenantRequest, params: RequestParams = {}) =>
    this.request<ResultOutputGuid, any>({
      path: `/api/console/tenant/update`,
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
   * @tags tenant
   * @name Page
   * @summary 租户分页查询
   * @request POST:/api/console/tenant/page
   * @secure
   */
  page = (data: TenantPageRequest, params: RequestParams = {}) =>
    this.request<ResultOutputPaginationResponseTenantOutput, any>({
      path: `/api/console/tenant/page`,
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
   * @tags tenant
   * @name Packages
   * @summary 获取租户套餐
   * @request POST:/api/console/tenant/packages
   * @secure
   */
  packages = (
    query: {
      /** @format uuid */
      id: string
    },
    params: RequestParams = {}
  ) =>
    this.request<ResultOutputListGuid, any>({
      path: `/api/console/tenant/packages`,
      method: 'POST',
      query: query,
      secure: true,
      format: 'json',
      ...params,
    })
}
