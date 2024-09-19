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
import { ResultOutputIEnumerableString, ResultOutputListEnumsOutput } from './data-contracts'
import { HttpClient, RequestParams } from './http-client'

export class ToolApi<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags tool
   * @name ExportSeederData
   * @summary 导出种子数据
   * @request POST:/api/console/tool/export-seeder-data
   * @secure
   */
  exportSeederData = (
    query: {
      entityType: string
    },
    params: RequestParams = {}
  ) =>
    this.request<AxiosResponse, any>({
      path: `/api/console/tool/export-seeder-data`,
      method: 'POST',
      query: query,
      secure: true,
      ...params,
    })
  /**
   * No description
   *
   * @tags tool
   * @name CurrentDbEntityTypes
   * @summary 获取当前数据库实体类型
   * @request POST:/api/console/tool/current-db-entity-types
   * @secure
   */
  currentDbEntityTypes = (params: RequestParams = {}) =>
    this.request<ResultOutputIEnumerableString, any>({
      path: `/api/console/tool/current-db-entity-types`,
      method: 'POST',
      secure: true,
      format: 'json',
      ...params,
    })
  /**
   * No description
   *
   * @tags tool
   * @name AllEnums
   * @summary 获得枚举列表
   * @request GET:/api/console/tool/all-enums
   * @secure
   */
  allEnums = (params: RequestParams = {}) =>
    this.request<ResultOutputListEnumsOutput, any>({
      path: `/api/console/tool/all-enums`,
      method: 'GET',
      secure: true,
      format: 'json',
      ...params,
    })
}
