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
  CreateViewInfoRequest,
  ResultOutputGuid,
  ResultOutputInt32,
  ResultOutputListViewInfoOutput,
  UpdateViewInfoRequest,
  ViewInfoSearchRequest,
} from './data-contracts'
import { ContentType, HttpClient, RequestParams } from './http-client'

export class ViewApi<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags view
   * @name Create
   * @summary 创建视图
   * @request POST:/api/console/view/create
   * @secure
   */
  create = (data: CreateViewInfoRequest, params: RequestParams = {}) =>
    this.request<ResultOutputGuid, any>({
      path: `/api/console/view/create`,
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
   * @tags view
   * @name Update
   * @summary 编辑视图
   * @request PUT:/api/console/view/update
   * @secure
   */
  update = (data: UpdateViewInfoRequest, params: RequestParams = {}) =>
    this.request<ResultOutputGuid, any>({
      path: `/api/console/view/update`,
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
   * @tags view
   * @name Delete
   * @summary 删除视图
   * @request DELETE:/api/console/view/delete
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
      path: `/api/console/view/delete`,
      method: 'DELETE',
      query: query,
      secure: true,
      format: 'json',
      ...params,
    })
  /**
   * No description
   *
   * @tags view
   * @name List
   * @summary 视图列表查询
   * @request POST:/api/console/view/list
   * @secure
   */
  list = (data: ViewInfoSearchRequest, params: RequestParams = {}) =>
    this.request<ResultOutputListViewInfoOutput, any>({
      path: `/api/console/view/list`,
      method: 'POST',
      body: data,
      secure: true,
      type: ContentType.Json,
      format: 'json',
      ...params,
    })
}
