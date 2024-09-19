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

import { CaptchaValidRequest, ResultOutputCaptchaData, ResultOutputString, ResultOutputValidateResult, SendSmsCodeRequest } from './data-contracts'
import { ContentType, HttpClient, RequestParams } from './http-client'

export class CaptchaApi<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags captcha
   * @name Generate
   * @summary 生成滑块验证数据
   * @request POST:/api/console/captcha/generate
   * @secure
   */
  generate = (
    query?: {
      /** 验证Id */
      captchaId?: string
    },
    params: RequestParams = {}
  ) =>
    this.request<ResultOutputCaptchaData, any>({
      path: `/api/console/captcha/generate`,
      method: 'POST',
      query: query,
      secure: true,
      format: 'json',
      ...params,
    })
  /**
   * No description
   *
   * @tags captcha
   * @name Validate
   * @summary 验证
   * @request POST:/api/console/captcha/validate
   * @secure
   */
  validate = (data: CaptchaValidRequest, params: RequestParams = {}) =>
    this.request<ResultOutputValidateResult, any>({
      path: `/api/console/captcha/validate`,
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
   * @tags captcha
   * @name SendSmsCode
   * @summary 短信验证
   * @request POST:/api/console/captcha/send-sms-code
   * @secure
   */
  sendSmsCode = (data: SendSmsCodeRequest, params: RequestParams = {}) =>
    this.request<ResultOutputString, any>({
      path: `/api/console/captcha/send-sms-code`,
      method: 'POST',
      body: data,
      secure: true,
      type: ContentType.Json,
      format: 'json',
      ...params,
    })
}
