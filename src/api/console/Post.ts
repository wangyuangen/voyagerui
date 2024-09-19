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
  CreatePostInfoRequest,
  PostInfoPageSearchRequest,
  PostInfoSearchRequest,
  ResultOutputGuid,
  ResultOutputInt32,
  ResultOutputListPostInfoOutput,
  ResultOutputPaginationResponsePostInfoOutput,
  UpdatePostInfoRequest,
} from './data-contracts'
import { ContentType, HttpClient, RequestParams } from './http-client'

export class PostApi<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags post
   * @name Create
   * @summary 创建岗位
   * @request POST:/api/console/post/create
   * @secure
   */
  create = (data: CreatePostInfoRequest, params: RequestParams = {}) =>
    this.request<ResultOutputGuid, any>({
      path: `/api/console/post/create`,
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
   * @tags post
   * @name Update
   * @summary 编辑岗位
   * @request PUT:/api/console/post/update
   * @secure
   */
  update = (data: UpdatePostInfoRequest, params: RequestParams = {}) =>
    this.request<ResultOutputGuid, any>({
      path: `/api/console/post/update`,
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
   * @tags post
   * @name Delete
   * @summary 删除岗位
   * @request DELETE:/api/console/post/delete
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
      path: `/api/console/post/delete`,
      method: 'DELETE',
      query: query,
      secure: true,
      format: 'json',
      ...params,
    })
  /**
   * No description
   *
   * @tags post
   * @name List
   * @summary 岗位列表查询
   * @request POST:/api/console/post/list
   * @secure
   */
  list = (data: PostInfoSearchRequest, params: RequestParams = {}) =>
    this.request<ResultOutputListPostInfoOutput, any>({
      path: `/api/console/post/list`,
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
   * @tags post
   * @name Page
   * @summary 岗位分页查询
   * @request POST:/api/console/post/page
   * @secure
   */
  page = (data: PostInfoPageSearchRequest, params: RequestParams = {}) =>
    this.request<ResultOutputPaginationResponsePostInfoOutput, any>({
      path: `/api/console/post/page`,
      method: 'POST',
      body: data,
      secure: true,
      type: ContentType.Json,
      format: 'json',
      ...params,
    })
}
