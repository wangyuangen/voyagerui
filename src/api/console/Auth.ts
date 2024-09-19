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
  AccountLoginRequest,
  MobileLoginRequest,
  ResultOutputBoolean,
  ResultOutputCurrentUserStaffOutput,
  ResultOutputListMenuRouteOutput,
  ResultOutputToken,
} from './data-contracts'
import { ContentType, HttpClient, RequestParams } from './http-client'

export class AuthApi<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags auth
   * @name AccountLogin
   * @summary 账户登录
   * @request POST:/api/console/auth/account-login
   * @secure
   */
  accountLogin = (data: AccountLoginRequest, params: RequestParams = {}) =>
    this.request<ResultOutputToken, any>({
      path: `/api/console/auth/account-login`,
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
   * @tags auth
   * @name MobileLogin
   * @summary 手机号登录
   * @request POST:/api/console/auth/mobile-login
   * @secure
   */
  mobileLogin = (data: MobileLoginRequest, params: RequestParams = {}) =>
    this.request<ResultOutputToken, any>({
      path: `/api/console/auth/mobile-login`,
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
   * @tags auth
   * @name RefreshToken
   * @summary 刷新token
   * @request POST:/api/console/auth/refresh-token
   * @secure
   */
  refreshToken = (
    query: {
      token: string
    },
    params: RequestParams = {}
  ) =>
    this.request<ResultOutputToken, any>({
      path: `/api/console/auth/refresh-token`,
      method: 'POST',
      query: query,
      secure: true,
      format: 'json',
      ...params,
    })
  /**
   * No description
   *
   * @tags auth
   * @name StaffRefreshToken
   * @summary 切换身份时刷新token
   * @request POST:/api/console/auth/staff-refresh-token
   * @secure
   */
  staffRefreshToken = (
    query: {
      /** @format uuid */
      userStaffId: string
    },
    params: RequestParams = {}
  ) =>
    this.request<ResultOutputToken, any>({
      path: `/api/console/auth/staff-refresh-token`,
      method: 'POST',
      query: query,
      secure: true,
      format: 'json',
      ...params,
    })
  /**
   * No description
   *
   * @tags auth
   * @name CurrentStaffInfo
   * @summary 获取当前登录用户身份信息
   * @request POST:/api/console/auth/current-staff-info
   * @secure
   */
  currentStaffInfo = (params: RequestParams = {}) =>
    this.request<ResultOutputCurrentUserStaffOutput, any>({
      path: `/api/console/auth/current-staff-info`,
      method: 'POST',
      secure: true,
      format: 'json',
      ...params,
    })
  /**
   * No description
   *
   * @tags auth
   * @name CurrentMenuRoute
   * @summary 获取当前登录用户菜单
   * @request POST:/api/console/auth/current-menu-route
   * @secure
   */
  currentMenuRoute = (params: RequestParams = {}) =>
    this.request<ResultOutputListMenuRouteOutput, any>({
      path: `/api/console/auth/current-menu-route`,
      method: 'POST',
      secure: true,
      format: 'json',
      ...params,
    })
  /**
   * No description
   *
   * @tags auth
   * @name EnableCaptcha
   * @summary 是否启用滑块验证
   * @request POST:/api/console/auth/enable-captcha
   * @secure
   */
  enableCaptcha = (params: RequestParams = {}) =>
    this.request<ResultOutputBoolean, any>({
      path: `/api/console/auth/enable-captcha`,
      method: 'POST',
      secure: true,
      format: 'json',
      ...params,
    })
}
