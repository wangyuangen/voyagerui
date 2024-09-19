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
  CreateMenuRouteRequest,
  MenuRouteSearchRequest,
  ResultOutputGuid,
  ResultOutputInt32,
  ResultOutputListMenuRouteOutput,
  ResultOutputListMenuRouteSimpleOutput,
  UpdateMenuRouteRequest,
} from './data-contracts'
import { ContentType, HttpClient, RequestParams } from './http-client'

export class MenuRouteApi<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags menu-route
   * @name Create
   * @summary 创建菜单
   * @request POST:/api/console/menu-route/create
   * @secure
   */
  create = (data: CreateMenuRouteRequest, params: RequestParams = {}) =>
    this.request<ResultOutputGuid, any>({
      path: `/api/console/menu-route/create`,
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
   * @tags menu-route
   * @name Update
   * @summary 编辑菜单
   * @request PUT:/api/console/menu-route/update
   * @secure
   */
  update = (data: UpdateMenuRouteRequest, params: RequestParams = {}) =>
    this.request<ResultOutputGuid, any>({
      path: `/api/console/menu-route/update`,
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
   * @tags menu-route
   * @name Delete
   * @summary 删除菜单
   * @request DELETE:/api/console/menu-route/delete
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
      path: `/api/console/menu-route/delete`,
      method: 'DELETE',
      query: query,
      secure: true,
      format: 'json',
      ...params,
    })
  /**
   * No description
   *
   * @tags menu-route
   * @name List
   * @summary 菜单列表查询
   * @request POST:/api/console/menu-route/list
   * @secure
   */
  list = (data: MenuRouteSearchRequest, params: RequestParams = {}) =>
    this.request<ResultOutputListMenuRouteOutput, any>({
      path: `/api/console/menu-route/list`,
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
   * @tags menu-route
   * @name AuthMenuRoutes
   * @summary 可被授予的菜单
   * @request POST:/api/console/menu-route/auth-menu-routes
   * @secure
   */
  authMenuRoutes = (params: RequestParams = {}) =>
    this.request<ResultOutputListMenuRouteSimpleOutput, any>({
      path: `/api/console/menu-route/auth-menu-routes`,
      method: 'POST',
      secure: true,
      format: 'json',
      ...params,
    })
}
