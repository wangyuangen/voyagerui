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
  ApiInfoEnabledStatusChangeRequest,
  ApiInfoSearchRequest,
  ResultOutputBoolean,
  ResultOutputGuid,
  ResultOutputListApiInfoOutput,
} from './data-contracts'
import { ContentType, HttpClient, RequestParams } from './http-client'

export class ApiInfoApi<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags api-info
   * @name Sync
   * @summary 同步接口
   * @request POST:/api/console/api-info/sync
   * @secure
   */
  sync = (params: RequestParams = {}) =>
    this.request<ResultOutputBoolean, any>({
      path: `/api/console/api-info/sync`,
      method: 'POST',
      secure: true,
      format: 'json',
      ...params,
    })
  /**
   * No description
   *
   * @tags api-info
   * @name ChangeStatus
   * @summary 变更接口状态
   * @request PUT:/api/console/api-info/change-status
   * @secure
   */
  changeStatus = (data: ApiInfoEnabledStatusChangeRequest, params: RequestParams = {}) =>
    this.request<ResultOutputGuid, any>({
      path: `/api/console/api-info/change-status`,
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
   * @tags api-info
   * @name List
   * @summary 接口列表查询
   * @request POST:/api/console/api-info/list
   * @secure
   */
  list = (data: ApiInfoSearchRequest, params: RequestParams = {}) =>
    this.request<ResultOutputListApiInfoOutput, any>({
      path: `/api/console/api-info/list`,
      method: 'POST',
      body: data,
      secure: true,
      type: ContentType.Json,
      format: 'json',
      ...params,
    })
}
