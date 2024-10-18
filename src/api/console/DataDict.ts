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
  CreateDataDictRequest,
  DataDictPageRequest,
  DataDictSearchRequest,
  ResultOutputGuid,
  ResultOutputListDataDictOutput,
  ResultOutputPaginationResponseDataDictOutput,
  UpdateDataDictRequest,
} from './data-contracts'
import { ContentType, HttpClient, RequestParams } from './http-client'

export class DataDictApi<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags data-dict
   * @name Create
   * @summary 创建字典
   * @request POST:/api/console/data-dict/create
   * @secure
   */
  create = (data: CreateDataDictRequest, params: RequestParams = {}) =>
    this.request<ResultOutputGuid, any>({
      path: `/api/console/data-dict/create`,
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
   * @tags data-dict
   * @name Update
   * @summary 编辑字典
   * @request PUT:/api/console/data-dict/update
   * @secure
   */
  update = (data: UpdateDataDictRequest, params: RequestParams = {}) =>
    this.request<ResultOutputGuid, any>({
      path: `/api/console/data-dict/update`,
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
   * @tags data-dict
   * @name Delete
   * @summary 删除字典
   * @request DELETE:/api/console/data-dict/delete
   * @secure
   */
  delete = (
    query: {
      /** @format uuid */
      id: string
    },
    params: RequestParams = {}
  ) =>
    this.request<ResultOutputGuid, any>({
      path: `/api/console/data-dict/delete`,
      method: 'DELETE',
      query: query,
      secure: true,
      format: 'json',
      ...params,
    })
  /**
   * No description
   *
   * @tags data-dict
   * @name List
   * @summary 字典列表查询
   * @request POST:/api/console/data-dict/list
   * @secure
   */
  list = (data: DataDictSearchRequest, params: RequestParams = {}) =>
    this.request<ResultOutputListDataDictOutput, any>({
      path: `/api/console/data-dict/list`,
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
   * @tags data-dict
   * @name Page
   * @summary 字典分页查询
   * @request POST:/api/console/data-dict/page
   * @secure
   */
  page = (data: DataDictPageRequest, params: RequestParams = {}) =>
    this.request<ResultOutputPaginationResponseDataDictOutput, any>({
      path: `/api/console/data-dict/page`,
      method: 'POST',
      body: data,
      secure: true,
      type: ContentType.Json,
      format: 'json',
      ...params,
    })
}
