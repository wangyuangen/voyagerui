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
import { PaginationFilter, ResultOutputPaginationResponseOnlineUserInfo } from './data-contracts'
import { ContentType, HttpClient, RequestParams } from './http-client'

export class OnlineUserApi<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags online-user
   * @name Page
   * @summary 分页查询
   * @request POST:/api/console/online-user/page
   * @secure
   */
  page = (data: PaginationFilter, params: RequestParams = {}) =>
    this.request<ResultOutputPaginationResponseOnlineUserInfo, any>({
      path: `/api/console/online-user/page`,
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
   * @tags online-user
   * @name ForceOffline
   * @summary 强制下线
   * @request POST:/api/console/online-user/force-offline
   * @secure
   */
  forceOffline = (
    query: {
      connectionId: string
    },
    params: RequestParams = {}
  ) =>
    this.request<AxiosResponse, any>({
      path: `/api/console/online-user/force-offline`,
      method: 'POST',
      query: query,
      secure: true,
      ...params,
    })
}
