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
  FileStorageInfoBindBizRequest,
  FileStorageInfoPageRequest,
  FileStorageInfoSearchByBizRequest,
  ResultOutputFileStorageInfoSimpleOutput,
  ResultOutputGuid,
  ResultOutputListFileStorageInfoSimpleOutput,
  ResultOutputPaginationResponseFileStorageInfoOutput,
} from './data-contracts'
import { ContentType, HttpClient, RequestParams } from './http-client'

export class FileStorageApi<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags file-storage
   * @name Upload
   * @summary 上传文件
   * @request POST:/api/console/file-storage/upload
   * @secure
   */
  upload = (
    data: {
      /**
       * 文件
       * @format binary
       */
      File: File
      /** 文件重命名 */
      ReName?: boolean
      /**
       * 业务实体主键
       * @format uuid
       */
      BizId?: string
      /** 业务实体类型 fullName */
      BizName?: string
    },
    params: RequestParams = {}
  ) =>
    this.request<ResultOutputFileStorageInfoSimpleOutput, any>({
      path: `/api/console/file-storage/upload`,
      method: 'POST',
      body: data,
      secure: true,
      type: ContentType.FormData,
      format: 'json',
      ...params,
    })
  /**
   * No description
   *
   * @tags file-storage
   * @name Delete
   * @summary 删除文件
   * @request DELETE:/api/console/file-storage/delete
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
      path: `/api/console/file-storage/delete`,
      method: 'DELETE',
      query: query,
      secure: true,
      format: 'json',
      ...params,
    })
  /**
   * No description
   *
   * @tags file-storage
   * @name Bind
   * @summary 文件绑定业务实体
   * @request POST:/api/console/file-storage/bind
   * @secure
   */
  bind = (data: FileStorageInfoBindBizRequest, params: RequestParams = {}) =>
    this.request<ResultOutputGuid, any>({
      path: `/api/console/file-storage/bind`,
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
   * @tags file-storage
   * @name BizFiles
   * @summary 查询业务实体文件列表
   * @request POST:/api/console/file-storage/biz-files
   * @secure
   */
  bizFiles = (data: FileStorageInfoSearchByBizRequest, params: RequestParams = {}) =>
    this.request<ResultOutputListFileStorageInfoSimpleOutput, any>({
      path: `/api/console/file-storage/biz-files`,
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
   * @tags file-storage
   * @name Get
   * @summary 获取单个文件
   * @request GET:/api/console/file-storage/get
   * @secure
   */
  get = (
    query: {
      /** @format uuid */
      id: string
    },
    params: RequestParams = {}
  ) =>
    this.request<ResultOutputFileStorageInfoSimpleOutput, any>({
      path: `/api/console/file-storage/get`,
      method: 'GET',
      query: query,
      secure: true,
      format: 'json',
      ...params,
    })
  /**
   * No description
   *
   * @tags file-storage
   * @name Page
   * @summary 文件分页查询
   * @request POST:/api/console/file-storage/page
   * @secure
   */
  page = (data: FileStorageInfoPageRequest, params: RequestParams = {}) =>
    this.request<ResultOutputPaginationResponseFileStorageInfoOutput, any>({
      path: `/api/console/file-storage/page`,
      method: 'POST',
      body: data,
      secure: true,
      type: ContentType.Json,
      format: 'json',
      ...params,
    })
}
