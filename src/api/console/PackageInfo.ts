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
  CreatePackageInfoRequest,
  PackageAuthChangeRequest,
  PackageInfoPageRequest,
  PackageInfoSearchRequest,
  ResultOutputGuid,
  ResultOutputInt32,
  ResultOutputListPackageInfoOutput,
  ResultOutputPackageAuthInfoOutput,
  ResultOutputPaginationResponsePackageInfoOutput,
  UpdatePackageInfoRequest,
} from './data-contracts'
import { ContentType, HttpClient, RequestParams } from './http-client'

export class PackageInfoApi<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags package-info
   * @name Create
   * @summary 创建套餐
   * @request POST:/api/console/package-info/create
   * @secure
   */
  create = (data: CreatePackageInfoRequest, params: RequestParams = {}) =>
    this.request<ResultOutputGuid, any>({
      path: `/api/console/package-info/create`,
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
   * @tags package-info
   * @name Update
   * @summary 编辑套餐
   * @request PUT:/api/console/package-info/update
   * @secure
   */
  update = (data: UpdatePackageInfoRequest, params: RequestParams = {}) =>
    this.request<ResultOutputGuid, any>({
      path: `/api/console/package-info/update`,
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
   * @tags package-info
   * @name Delete
   * @summary 删除套餐
   * @request DELETE:/api/console/package-info/delete
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
      path: `/api/console/package-info/delete`,
      method: 'DELETE',
      query: query,
      secure: true,
      format: 'json',
      ...params,
    })
  /**
   * No description
   *
   * @tags package-info
   * @name List
   * @summary 套餐列表查询
   * @request POST:/api/console/package-info/list
   * @secure
   */
  list = (data: PackageInfoSearchRequest, params: RequestParams = {}) =>
    this.request<ResultOutputListPackageInfoOutput, any>({
      path: `/api/console/package-info/list`,
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
   * @tags package-info
   * @name Page
   * @summary 套餐分页查询
   * @request POST:/api/console/package-info/page
   * @secure
   */
  page = (data: PackageInfoPageRequest, params: RequestParams = {}) =>
    this.request<ResultOutputPaginationResponsePackageInfoOutput, any>({
      path: `/api/console/package-info/page`,
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
   * @tags package-info
   * @name AuthChange
   * @summary 套餐授权变更
   * @request POST:/api/console/package-info/auth-change
   * @secure
   */
  authChange = (data: PackageAuthChangeRequest, params: RequestParams = {}) =>
    this.request<ResultOutputGuid, any>({
      path: `/api/console/package-info/auth-change`,
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
   * @tags package-info
   * @name AuthInfo
   * @summary 获取套餐授权信息
   * @request POST:/api/console/package-info/auth-info
   * @secure
   */
  authInfo = (
    query: {
      /** @format uuid */
      id: string
    },
    params: RequestParams = {}
  ) =>
    this.request<ResultOutputPackageAuthInfoOutput, any>({
      path: `/api/console/package-info/auth-info`,
      method: 'POST',
      query: query,
      secure: true,
      format: 'json',
      ...params,
    })
}
