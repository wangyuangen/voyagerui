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

import { AxiosResponse } from 'axios'
import {
  CreateRegionInfoRequest,
  RegionInfoEnabledChangeRequest,
  RegionInfoHotChangeRequest,
  RegionInfoPageRequest,
  RegionInfoSearchRequest,
  RegionLevel,
  ResultOutputGuid,
  ResultOutputInt32,
  ResultOutputListRegionInfoSimpleOuput,
  ResultOutputListString,
  ResultOutputPaginationResponseRegionInfoPageOutput,
  UpdateRegionInfoRequest,
} from './data-contracts'
import { ContentType, HttpClient, RequestParams } from './http-client'

export class RegionApi<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags region
   * @name Sync
   * @summary 同步行政区域
   * @request POST:/api/console/region/sync
   * @secure
   */
  sync = (data: RegionLevel, params: RequestParams = {}) =>
    this.request<AxiosResponse, any>({
      path: `/api/console/region/sync`,
      method: 'POST',
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    })
  /**
   * No description
   *
   * @tags region
   * @name Create
   * @summary 创建行政区域
   * @request POST:/api/console/region/create
   * @secure
   */
  create = (data: CreateRegionInfoRequest, params: RequestParams = {}) =>
    this.request<ResultOutputGuid, any>({
      path: `/api/console/region/create`,
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
   * @tags region
   * @name Update
   * @summary 编辑行政区域
   * @request PUT:/api/console/region/update
   * @secure
   */
  update = (data: UpdateRegionInfoRequest, params: RequestParams = {}) =>
    this.request<ResultOutputGuid, any>({
      path: `/api/console/region/update`,
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
   * @tags region
   * @name Delete
   * @summary 删除行政区域
   * @request DELETE:/api/console/region/delete
   * @secure
   */
  delete = (
    query: {
      /**
       * 区域Id
       * @format uuid
       */
      Id: string
    },
    params: RequestParams = {}
  ) =>
    this.request<ResultOutputInt32, any>({
      path: `/api/console/region/delete`,
      method: 'DELETE',
      query: query,
      secure: true,
      format: 'json',
      ...params,
    })
  /**
   * No description
   *
   * @tags region
   * @name Page
   * @summary 行政区域分页查询
   * @request POST:/api/console/region/page
   * @secure
   */
  page = (data: RegionInfoPageRequest, params: RequestParams = {}) =>
    this.request<ResultOutputPaginationResponseRegionInfoPageOutput, any>({
      path: `/api/console/region/page`,
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
   * @tags region
   * @name List
   * @summary 行政区域列表查询
   * @request POST:/api/console/region/list
   * @secure
   */
  list = (data: RegionInfoSearchRequest, params: RequestParams = {}) =>
    this.request<ResultOutputListRegionInfoSimpleOuput, any>({
      path: `/api/console/region/list`,
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
   * @tags region
   * @name SetEnabled
   * @summary 行政区域启用设置
   * @request POST:/api/console/region/set-enabled
   * @secure
   */
  setEnabled = (data: RegionInfoEnabledChangeRequest, params: RequestParams = {}) =>
    this.request<ResultOutputGuid, any>({
      path: `/api/console/region/set-enabled`,
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
   * @tags region
   * @name SetHot
   * @summary 行政区域热度设置
   * @request POST:/api/console/region/set-hot
   * @secure
   */
  setHot = (data: RegionInfoHotChangeRequest, params: RequestParams = {}) =>
    this.request<ResultOutputGuid, any>({
      path: `/api/console/region/set-hot`,
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
   * @tags region
   * @name ParentCodes
   * @summary 获取区域父级代码
   * @request POST:/api/console/region/parent-codes
   * @secure
   */
  parentCodes = (
    query?: {
      code?: string
    },
    params: RequestParams = {}
  ) =>
    this.request<ResultOutputListString, any>({
      path: `/api/console/region/parent-codes`,
      method: 'POST',
      query: query,
      secure: true,
      format: 'json',
      ...params,
    })
}
