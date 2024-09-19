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
  CreateOrganizeInfoRequest,
  OrganizeInfoSearchRequest,
  ResultOutputGuid,
  ResultOutputInt32,
  ResultOutputListOrganizeInfoOutput,
  UpdateOrganizeInfoRequest,
} from './data-contracts'
import { ContentType, HttpClient, RequestParams } from './http-client'

export class OrganizeApi<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags organize
   * @name Create
   * @summary 创建组织机构
   * @request POST:/api/console/organize/create
   * @secure
   */
  create = (data: CreateOrganizeInfoRequest, params: RequestParams = {}) =>
    this.request<ResultOutputGuid, any>({
      path: `/api/console/organize/create`,
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
   * @tags organize
   * @name Update
   * @summary 编辑组织机构
   * @request PUT:/api/console/organize/update
   * @secure
   */
  update = (data: UpdateOrganizeInfoRequest, params: RequestParams = {}) =>
    this.request<ResultOutputGuid, any>({
      path: `/api/console/organize/update`,
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
   * @tags organize
   * @name Delete
   * @summary 删除组织机构
   * @request DELETE:/api/console/organize/delete
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
      path: `/api/console/organize/delete`,
      method: 'DELETE',
      query: query,
      secure: true,
      format: 'json',
      ...params,
    })
  /**
   * No description
   *
   * @tags organize
   * @name List
   * @summary 组织机构列表查询
   * @request POST:/api/console/organize/list
   * @secure
   */
  list = (data: OrganizeInfoSearchRequest, params: RequestParams = {}) =>
    this.request<ResultOutputListOrganizeInfoOutput, any>({
      path: `/api/console/organize/list`,
      method: 'POST',
      body: data,
      secure: true,
      type: ContentType.Json,
      format: 'json',
      ...params,
    })
}
