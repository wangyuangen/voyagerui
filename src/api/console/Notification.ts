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
import { NoticeMessageContent } from './data-contracts'
import { ContentType, HttpClient, RequestParams } from './http-client'

export class NotificationApi<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags notification
   * @name SendToAll
   * @summary 发送给所有用户
   * @request POST:/api/console/notification/send-to-all
   * @secure
   */
  sendToAll = (data: NoticeMessageContent, params: RequestParams = {}) =>
    this.request<AxiosResponse, any>({
      path: `/api/console/notification/send-to-all`,
      method: 'POST',
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    })
  /**
   * No description
   *
   * @tags notification
   * @name SendToUser
   * @summary 发送给指定用户
   * @request POST:/api/console/notification/send-to-user
   * @secure
   */
  sendToUser = (data: NoticeMessageContent, params: RequestParams = {}) =>
    this.request<AxiosResponse, any>({
      path: `/api/console/notification/send-to-user`,
      method: 'POST',
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    })
  /**
   * No description
   *
   * @tags notification
   * @name SendToUsers
   * @summary 发送给多个用户
   * @request POST:/api/console/notification/send-to-users
   * @secure
   */
  sendToUsers = (data: NoticeMessageContent, params: RequestParams = {}) =>
    this.request<AxiosResponse, any>({
      path: `/api/console/notification/send-to-users`,
      method: 'POST',
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    })
  /**
   * No description
   *
   * @tags notification
   * @name SendToGroup
   * @summary 发送给指定组
   * @request POST:/api/console/notification/send-to-group
   * @secure
   */
  sendToGroup = (data: NoticeMessageContent, params: RequestParams = {}) =>
    this.request<AxiosResponse, any>({
      path: `/api/console/notification/send-to-group`,
      method: 'POST',
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    })
  /**
   * No description
   *
   * @tags notification
   * @name SendToGroups
   * @summary 发送给多个组
   * @request POST:/api/console/notification/send-to-groups
   * @secure
   */
  sendToGroups = (data: NoticeMessageContent, params: RequestParams = {}) =>
    this.request<AxiosResponse, any>({
      path: `/api/console/notification/send-to-groups`,
      method: 'POST',
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    })
  /**
   * No description
   *
   * @tags notification
   * @name SendToStaff
   * @summary 发送给指定员工
   * @request POST:/api/console/notification/send-to-staff
   * @secure
   */
  sendToStaff = (data: NoticeMessageContent, params: RequestParams = {}) =>
    this.request<AxiosResponse, any>({
      path: `/api/console/notification/send-to-staff`,
      method: 'POST',
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    })
  /**
   * No description
   *
   * @tags notification
   * @name SendToStaffs
   * @summary 发送给多个员工
   * @request POST:/api/console/notification/send-to-staffs
   * @secure
   */
  sendToStaffs = (data: NoticeMessageContent, params: RequestParams = {}) =>
    this.request<AxiosResponse, any>({
      path: `/api/console/notification/send-to-staffs`,
      method: 'POST',
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    })
}
