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
  ChangePersonalPasswordRequest,
  ResultOutputGuid,
  ResultOutputPaginationResponseUserInfoOutput,
  ResultOutputString,
  UpdatePersonalUserInfoRequest,
  UserInfoPageRequest,
} from './data-contracts'
import { ContentType, HttpClient, RequestParams } from './http-client'

export class UserApi<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags user
   * @name Page
   * @summary 用户分页查询
   * @request POST:/api/console/user/page
   * @secure
   */
  page = (data: UserInfoPageRequest, params: RequestParams = {}) =>
    this.request<ResultOutputPaginationResponseUserInfoOutput, any>({
      path: `/api/console/user/page`,
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
   * @tags user
   * @name Update
   * @summary 编辑个人信息
   * @request PUT:/api/console/user/update
   * @secure
   */
  update = (data: UpdatePersonalUserInfoRequest, params: RequestParams = {}) =>
    this.request<ResultOutputGuid, any>({
      path: `/api/console/user/update`,
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
   * @tags user
   * @name UploadAvatar
   * @summary 上传个人头像
   * @request POST:/api/console/user/upload-avatar
   * @secure
   */
  uploadAvatar = (
    data: {
      /**
       * 头像文件
       * @format binary
       */
      AvatarFile: File
    },
    params: RequestParams = {}
  ) =>
    this.request<ResultOutputString, any>({
      path: `/api/console/user/upload-avatar`,
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
   * @tags user
   * @name ChangePwd
   * @summary 修改个人密码
   * @request PUT:/api/console/user/change-pwd
   * @secure
   */
  changePwd = (data: ChangePersonalPasswordRequest, params: RequestParams = {}) =>
    this.request<ResultOutputGuid, any>({
      path: `/api/console/user/change-pwd`,
      method: 'PUT',
      body: data,
      secure: true,
      type: ContentType.Json,
      format: 'json',
      ...params,
    })
}
