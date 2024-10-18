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

/** 用户登录命令 */
export interface AccountLoginRequest {
  /**
   * 账户
   * @minLength 1
   * @maxLength 16
   */
  account: string
  /**
   * 密码
   * @minLength 1
   * @maxLength 16
   */
  password: string
  /** 验证Id */
  captchaId?: string | null
  track?: SlideTrack
}

export interface AdvancedFilter {
  /** And(并且)=0,Or(或者)=1,Xor(异或)=2 */
  logic?: FilterLogicEnum
  filters?: AdvancedFilter[] | null
  field?: string | null
  /** EQ(等于)=0,NEQ(不等于)=1,LT(小于)=2,LTE(小于等于)=3,GT(大于)=4,GTE(大于等于)=5,StartsWith(开始包含)=6,EndsWith(末尾包含)=7,Contains(包含)=8 */
  operator?: FilterOperatorEnum
  value?: any
}

export interface AdvancedSearch {
  fields?: string[] | null
  keyword?: string | null
}

/** 接口启用状态变更 */
export interface ApiInfoEnabledStatusChangeRequest {
  /**
   * 主键
   * @format uuid
   */
  id: string
  /** 启用状态:Disabled(禁用)=0,Enabled(启用)=1 */
  enabled: EnabledStatusEnum
}

export interface ApiInfoOutput {
  /** @format uuid */
  id?: string
  /** 接口名称 */
  name?: string | null
  /** 接口路径 */
  path?: string | null
  /** 编码 */
  code?: string | null
  /** 接口请求方法 */
  httpMethod?: string | null
  /** 接口描述 */
  remark?: string | null
  /**
   * 排序号
   * @format int32
   */
  sort?: number
  /**
   * 上级
   * @format uuid
   */
  parentId?: string | null
  /** 启用状态:Disabled(禁用)=0,Enabled(启用)=1 */
  enabled?: EnabledStatusEnum
}

/** 接口列表查询 */
export interface ApiInfoSearchRequest {
  search?: AdvancedSearch
  keyword?: string | null
  filter?: AdvancedFilter
  /** 启用状态:Disabled(禁用)=0,Enabled(启用)=1 */
  enabled?: EnabledStatusEnum
}

export interface CaptchaData {
  id?: string | null
  backgroundImage?: string | null
  sliderImage?: string | null
}

/** 滑块验证校验 */
export interface CaptchaValidRequest {
  /**
   * 滑块验证Id
   * @minLength 1
   */
  captchaId: string
  track: SlideTrack
  /** 验证成功时从Storage删除 */
  removeWhileSuccess?: boolean
}

/** 变更个人密码 */
export interface ChangePersonalPasswordRequest {
  /**
   * 旧密码
   * @minLength 1
   * @maxLength 16
   */
  oldPassword: string
  /**
   * 密码
   * @minLength 1
   * @maxLength 16
   */
  password: string
  /**
   * 确认密码
   * @minLength 1
   * @maxLength 16
   */
  confirmPassword: string
}

/** 创建字典命令 */
export interface CreateDataDictRequest {
  /**
   * 字典父级编码
   * @maxLength 32
   */
  parentCode?: string | null
  /**
   * 字典唯一编码
   * @minLength 1
   * @maxLength 32
   */
  code: string
  /**
   * 字典名称
   * @minLength 1
   * @maxLength 64
   */
  name: string
  /**
   * 排序号
   * @format int32
   */
  sort: number
  /**
   * 样式
   * @maxLength 64
   */
  themeStyle?: string | null
  /**
   * 描述
   * @maxLength 512
   */
  remark?: string | null
  /** 启用状态:Disabled(禁用)=0,Enabled(启用)=1 */
  enabled: EnabledStatusEnum
}

/** 创建菜单命令 */
export interface CreateMenuRouteRequest {
  /**
   * 父级
   * @format uuid
   */
  parentId?: string | null
  /**
   * 视图id
   * @format uuid
   */
  viewId?: string | null
  /** 菜单路由类型:Group(分组)=1,Menu(菜单)=2 */
  type: MenuRouteTypeEnum
  /**
   * 名称
   * @minLength 1
   * @maxLength 64
   */
  name: string
  /**
   * 路由地址
   * @minLength 1
   * @maxLength 128
   */
  routeUrl: string
  /**
   * 路由命名,菜单同对应视图
   * @maxLength 64
   */
  routeName?: string | null
  /**
   * 重定向地址
   * @maxLength 128
   */
  redirectUrl?: string | null
  /**
   * 图标
   * @maxLength 64
   */
  icon?: string | null
  /** 隐藏 */
  hidden?: boolean
  /** 展开分组 */
  opened?: boolean
  /** 打开新窗口 */
  newWindow?: boolean
  /** 链接外显 */
  external?: boolean
  /** 是否缓存 */
  isKeepAlive?: boolean
  /** 是否固定 */
  isAffix?: boolean
  /**
   * 内/外部链接
   * @maxLength 512
   */
  link?: string | null
  /** 是否内嵌窗口 */
  isIframe?: boolean
  /**
   * 排序
   * @format int32
   */
  sort: number
  /**
   * 描述
   * @maxLength 512
   */
  remark?: string | null
  /** 启用状态:Disabled(禁用)=0,Enabled(启用)=1 */
  enabled: EnabledStatusEnum
}

/** 创建机构命令 */
export interface CreateOrganizeInfoRequest {
  /**
   * 父级
   * @format uuid
   */
  parentId?: string | null
  /**
   * 机构名称
   * @minLength 1
   * @maxLength 64
   */
  name: string
  /** 机构类型:Company(公司)=0,Department(部门)=1,Group(小组)=2 */
  organizeType: OrganizeTypeEnum
  /** 启用状态:Disabled(禁用)=0,Enabled(启用)=1 */
  enabled: EnabledStatusEnum
  /**
   * 描述
   * @maxLength 512
   */
  remark?: string | null
  /**
   * 排序
   * @format int32
   */
  sort: number
  /**
   * 区域编码
   * @minLength 1
   * @maxLength 32
   */
  regionCode: string
  /**
   * 区域
   * @minLength 1
   * @maxLength 256
   */
  regionText: string
}

/** 创建套餐命令 */
export interface CreatePackageInfoRequest {
  /**
   * 名称
   * @minLength 1
   * @maxLength 64
   */
  name: string
  /**
   * 描述
   * @maxLength 512
   */
  remark?: string | null
  /**
   * 排序
   * @format int32
   */
  sort: number
  /** 启用状态:Disabled(禁用)=0,Enabled(启用)=1 */
  enabled: EnabledStatusEnum
}

/** 创建权限组 */
export interface CreatePermissionGroupRequest {
  /**
   * 名称
   * @minLength 1
   * @maxLength 64
   */
  name: string
  /**
   * 描述
   * @maxLength 512
   */
  remark?: string | null
  /** 数权范围:All(全部)=1,CurrentWithChildAndAffiliateDept(本部门加下级部门加附属部门)=2,CurrentWithAffiliateDept(本部门加附属部门)=3,CurrentWithChildDept(本部门加下级部门)=4,CurrentDept(本部门)=5,CurrentUserStaff(当前员工)=6 */
  scope: DataPermissionScope
  /**
   * 排序号
   * @format int32
   */
  sort: number
  /** 启用状态:Disabled(禁用)=0,Enabled(启用)=1 */
  enabled: EnabledStatusEnum
  /**
   * 父级
   * @format uuid
   */
  parentId?: string | null
  /** 接口Id集合 */
  apiIds: string[]
}

/** 创建岗位命令 */
export interface CreatePostInfoRequest {
  /**
   * 岗位名称
   * @minLength 1
   * @maxLength 64
   */
  name: string
  /**
   * 描述
   * @minLength 1
   * @maxLength 512
   */
  remark: string
}

/** 创建行政区域命令 */
export interface CreateRegionInfoRequest {
  /**
   * 上级地区代码
   * @maxLength 32
   */
  parentCode?: string | null
  /**
   * 名称
   * @minLength 1
   * @maxLength 64
   */
  name: string
  /** 地区级别:Province(省份)=1,City(城市)=2,County(县/区)=3,Town(乡镇/街道)=4,Vilage(村/社区)=5 */
  level: RegionLevel
  /**
   * 代码
   * @minLength 1
   * @maxLength 32
   */
  code: string
  /**
   * 提取Url
   * @maxLength 128
   */
  url?: string | null
  /**
   * 排序
   * @format int32
   */
  sort: number
  /** 热门 */
  hot: boolean
  /** 启用状态:Disabled(禁用)=0,Enabled(启用)=1 */
  enabled: EnabledStatusEnum
}

/** 创建角色 */
export interface CreateRoleInfoRequest {
  /**
   * 角色名称
   * @minLength 1
   * @maxLength 64
   */
  name: string
  /**
   * 描述
   * @maxLength 512
   */
  remark?: string | null
  /**
   * 排序号
   * @format int32
   */
  sort: number
  /** 启用状态:Disabled(禁用)=0,Enabled(启用)=1 */
  enabled: EnabledStatusEnum
}

/** 创建租户命令 */
export interface CreateTenantRequest {
  /**
   * 名称
   * @minLength 1
   * @maxLength 64
   */
  name: string
  /**
   * 公司名称
   * @minLength 1
   * @maxLength 64
   */
  companyName: string
  /**
   * 联系人
   * @minLength 1
   * @maxLength 16
   */
  contactPerson: string
  /**
   * 联系手机
   * @minLength 1
   * @maxLength 16
   */
  contactMobile: string
  /**
   * 描述
   * @maxLength 512
   */
  remark?: string | null
  /**
   * 有效期限
   * @format date-time
   */
  expiryDate: string
  /**
   * 区域编码
   * @minLength 1
   * @maxLength 32
   */
  regionCode: string
  /**
   * 区域
   * @minLength 1
   * @maxLength 256
   */
  regionText: string
  /** 启用状态:Disabled(禁用)=0,Enabled(启用)=1 */
  enabled: EnabledStatusEnum
  /** 套餐Id集合 */
  packageIds: string[]
}

/** 创建员工 */
export interface CreateUserStaffRequest {
  /**
   * 岗位Id
   * @format uuid
   */
  postId: string
  /**
   * 真实姓名
   * @minLength 1
   * @maxLength 16
   */
  realName: string
  /**
   * 工号
   * @minLength 1
   * @maxLength 32
   */
  jobNo: string
  /** 启用状态:Disabled(禁用)=0,Enabled(启用)=1 */
  enabled: EnabledStatusEnum
  /**
   * 入职日期
   * @format date-time
   */
  entryDate?: string | null
  /**
   * 描述
   * @maxLength 512
   */
  remark?: string | null
  /**
   * 雇佣所属机构Id
   * @format uuid
   */
  orgId: string
  /** 是否为主管 */
  isManager: boolean
  /** 用户 */
  userInfo: UserInfoInput
  /** 附属机构Id集合 */
  orgIds?: string[] | null
  /** 角色Id集合 */
  roleIds: string[]
}

/** 创建视图命令 */
export interface CreateViewInfoRequest {
  /**
   * 视图路由命名,ts中声明
   * @minLength 1
   * @maxLength 64
   */
  routeName: string
  /**
   * 视图名称
   * @minLength 1
   * @maxLength 64
   */
  name: string
  /**
   * 路径
   * @minLength 1
   * @maxLength 128
   */
  path: string
  /**
   * 说明
   * @maxLength 512
   */
  remark?: string | null
  /** 是否缓存 */
  isKeepAlive: boolean
  /**
   * 排序号
   * @format int32
   */
  sort: number
  /** 启用状态:Disabled(禁用)=0,Enabled(启用)=1 */
  enabled: EnabledStatusEnum
  /**
   * 上级
   * @format uuid
   */
  parentId?: string | null
}

/** 当前登录用户身份信息 */
export interface CurrentUserStaffOutput {
  /**
   * 用户Id
   * @format uuid
   */
  userId?: string
  /**
   * 职工所属租户Id
   * @format uuid
   */
  tenantId?: string
  /** 租户类型:NormalTenant(普通租户)=0,PlatformTenant(平台租户)=1 */
  tenantType?: TenantTypeEnum
  /**
   * 职工Id
   * @format uuid
   */
  userStaffId?: string
  /** 姓名 */
  userName?: string | null
  /** 职工类型:Normal(普通职工)=1,TenantAdmin(租户管理员)=10,PlatformAdmin(平台管理员)=100 */
  userStaffType?: UserStaffTypeEnum
  /** 头像 */
  avatarUrl?: string | null
  /** 接口权限范围 */
  apiPermissionScope?: string[] | null
}

/** 字典输出 */
export interface DataDictOutput {
  /** @format uuid */
  id?: string
  /** 字典父级编码 */
  parentCode?: string | null
  /** 字典唯一编码 */
  code?: string | null
  /** 字典名称 */
  name?: string | null
  /**
   * 排序号
   * @format int32
   */
  sort?: number
  /** 样式 */
  themeStyle?: string | null
  /** 描述 */
  remark?: string | null
  /** 启用状态:Disabled(禁用)=0,Enabled(启用)=1 */
  enabled?: EnabledStatusEnum
}

/** 字典分页查询 */
export interface DataDictPageRequest {
  search?: AdvancedSearch
  keyword?: string | null
  filter?: AdvancedFilter
  /** @format int32 */
  pageNumber?: number
  /** @format int32 */
  pageSize?: number
  orderBy?: string[] | null
  /**
   * 字典父级编码
   * @maxLength 32
   */
  parentCode?: string | null
}

/** 字典列表查询 */
export interface DataDictSearchRequest {
  /** 启用状态:Disabled(禁用)=0,Enabled(启用)=1 */
  enabled?: EnabledStatusEnum
}

/**
 * 数权范围:All(全部)=1,CurrentWithChildAndAffiliateDept(本部门加下级部门加附属部门)=2,CurrentWithAffiliateDept(本部门加附属部门)=3,CurrentWithChildDept(本部门加下级部门)=4,CurrentDept(本部门)=5,CurrentUserStaff(当前员工)=6
 * @format int32
 */
export type DataPermissionScope = 1 | 2 | 3 | 4 | 5 | 6

/**
 * 启用状态:Disabled(禁用)=0,Enabled(启用)=1
 * @format int32
 */
export type EnabledStatusEnum = 0 | 1

/** 枚举输出 */
export interface EnumsOutput {
  /** 名称 */
  name?: string | null
  /** 描述 */
  desc?: string | null
  /** 选项列表 */
  options?: Options[] | null
}

/** 文件与业务实体绑定 */
export interface FileStorageInfoBindBizRequest {
  /**
   * 文件Id
   * @format uuid
   */
  id: string
  /**
   * 业务Id
   * @format uuid
   */
  bizId: string
  /**
   * 业务实体类型fullName
   * @minLength 1
   */
  bizName: string
}

/** 文件存储信息输出 */
export interface FileStorageInfoOutput {
  /** @format uuid */
  id?: string
  /** @format uuid */
  createdBy?: string
  /** @format uuid */
  createdOrgBy?: string | null
  /** @format uuid */
  createdUserStaffBy?: string | null
  createdUserName?: string | null
  modifiedUserName?: string | null
  /** @format date-time */
  createdOn?: string
  /** @format uuid */
  lastModifiedBy?: string | null
  /** @format date-time */
  lastModifiedOn?: string | null
  /** Invalid=0,Minio=1,Aliyun=2,QCloud=3,Qiniu=4,HuaweiCloud=5,BaiduCloud=6,Ctyun=7 */
  provider?: OSSProvider
  /** 存储桶名称 */
  bucketName?: string | null
  /** 文件目录 */
  fileDirectory?: string | null
  /**
   * 文件Guid
   * @format uuid
   */
  fileGuid?: string
  /** 保存文件名 */
  saveFileName?: string | null
  /** 文件名 */
  fileName?: string | null
  /** 文件扩展名 */
  extension?: string | null
  /**
   * 文件字节长度
   * @format int64
   */
  size?: number
  /** 文件大小格式化 */
  sizeFormat?: string | null
  /** 链接地址 */
  linkUrl?: string | null
  /**
   * 所属业务对象主键Id
   * @format uuid
   */
  bizId?: string | null
  /** 所属业务对象名称 */
  bizName?: string | null
}

/** 文件分页查询 */
export interface FileStorageInfoPageRequest {
  search?: AdvancedSearch
  keyword?: string | null
  filter?: AdvancedFilter
  /** @format int32 */
  pageNumber?: number
  /** @format int32 */
  pageSize?: number
  orderBy?: string[] | null
}

/** 查询业务文件列表 */
export interface FileStorageInfoSearchByBizRequest {
  /**
   * 业务实体主键
   * @format uuid
   */
  bizId: string
  /**
   * 业务实体类型fullName
   * @minLength 1
   */
  bizName: string
}

/** 文件存储信息简单输出 */
export interface FileStorageInfoSimpleOutput {
  /** @format uuid */
  id?: string
  /** 文件名 */
  fileName?: string | null
  /** 文件扩展名 */
  extension?: string | null
  /** 链接地址 */
  linkUrl?: string | null
  /**
   * 所属业务对象主键Id
   * @format uuid
   */
  bizId?: string | null
  /** 所属业务对象名称 */
  bizName?: string | null
}

/**
 * And(并且)=0,Or(或者)=1,Xor(异或)=2
 * @format int32
 */
export type FilterLogicEnum = 0 | 1 | 2

/**
 * EQ(等于)=0,NEQ(不等于)=1,LT(小于)=2,LTE(小于等于)=3,GT(大于)=4,GTE(大于等于)=5,StartsWith(开始包含)=6,EndsWith(末尾包含)=7,Contains(包含)=8
 * @format int32
 */
export type FilterOperatorEnum = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8

/**
 * 性别:Unknown(未知)=0,Male(男)=1,Female(女)=2
 * @format int32
 */
export type GenderEnum = 0 | 1 | 2

/** 菜单输出 */
export interface MenuRouteOutput {
  /** @format uuid */
  id?: string
  /**
   * 父级
   * @format uuid
   */
  parentId?: string | null
  /**
   * 视图id
   * @format uuid
   */
  viewId?: string | null
  view?: ViewInfoOutput
  /** 菜单路由类型:Group(分组)=1,Menu(菜单)=2 */
  type?: MenuRouteTypeEnum
  /** 名称 */
  name?: string | null
  /** 路由地址 */
  routeUrl?: string | null
  /** 路由命名,菜单同对应视图 */
  routeName?: string | null
  /** 重定向地址 */
  redirectUrl?: string | null
  /** 图标 */
  icon?: string | null
  /** 隐藏 */
  hidden?: boolean
  /** 展开分组 */
  opened?: boolean
  /** 打开新窗口 */
  newWindow?: boolean
  /** 链接外显 */
  external?: boolean
  /** 是否缓存 */
  isKeepAlive?: boolean
  /** 是否固定 */
  isAffix?: boolean
  /** 内/外部链接 */
  link?: string | null
  /** 是否内嵌窗口 */
  isIframe?: boolean
  /**
   * 排序
   * @format int32
   */
  sort?: number
  /** 描述 */
  remark?: string | null
  /** 启用状态:Disabled(禁用)=0,Enabled(启用)=1 */
  enabled?: EnabledStatusEnum
}

/** 菜单列表查询 */
export interface MenuRouteSearchRequest {
  search?: AdvancedSearch
  keyword?: string | null
  filter?: AdvancedFilter
  /** 启用状态:Disabled(禁用)=0,Enabled(启用)=1 */
  enabled?: EnabledStatusEnum
}

export interface MenuRouteSimpleOutput {
  /** @format uuid */
  id?: string
  /** 名称 */
  name?: string | null
  /** 图标 */
  icon?: string | null
  /**
   * 父级
   * @format uuid
   */
  parentId?: string | null
  /**
   * 排序
   * @format int32
   */
  sort?: number
}

/**
 * 菜单路由类型:Group(分组)=1,Menu(菜单)=2
 * @format int32
 */
export type MenuRouteTypeEnum = 1 | 2

/** 手机号登录命令 */
export interface MobileLoginRequest {
  /**
   * 手机号
   * @minLength 1
   * @maxLength 16
   */
  mobile: string
  /**
   * 验证码
   * @minLength 1
   */
  code: string
  /**
   * 验证码Id
   * @minLength 1
   */
  codeId: string
}

export interface NoticeMessageContent {
  /** @format uuid */
  receiver?: string | null
  receivers?: string[] | null
  title?: string | null
  /** Info(消息)=0,Success(成功)=1,Warning(警告)=2,Error(错误)=3 */
  messageType?: NoticeMessageType
  message?: string | null
}

/**
 * Info(消息)=0,Success(成功)=1,Warning(警告)=2,Error(错误)=3
 * @format int32
 */
export type NoticeMessageType = 0 | 1 | 2 | 3

/**
 * Invalid=0,Minio=1,Aliyun=2,QCloud=3,Qiniu=4,HuaweiCloud=5,BaiduCloud=6,Ctyun=7
 * @format int32
 */
export type OSSProvider = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7

export interface OnlineUserInfo {
  connectionId?: string | null
  /** @format uuid */
  userId?: string
  /** @format uuid */
  userStaffId?: string | null
  nickName?: string | null
  realName?: string | null
  /** @format date-time */
  connectionTime?: string
  ip?: string | null
  browser?: string | null
  os?: string | null
  /** @format uuid */
  tenantId?: string | null
}

/** 选项 */
export interface Options {
  /** 名称 */
  name?: string | null
  /** 描述 */
  desc?: string | null
  /**
   * 值
   * @format int32
   */
  value?: number
  /** 主题样式 */
  theme?: string | null
}

/** 机构输出 */
export interface OrganizeInfoOutput {
  /** @format uuid */
  id?: string
  /** @format uuid */
  createdBy?: string
  /** @format uuid */
  createdOrgBy?: string | null
  /** @format uuid */
  createdUserStaffBy?: string | null
  createdUserName?: string | null
  modifiedUserName?: string | null
  /** @format date-time */
  createdOn?: string
  /** @format uuid */
  lastModifiedBy?: string | null
  /** @format date-time */
  lastModifiedOn?: string | null
  /**
   * 父级
   * @format uuid
   */
  parentId?: string | null
  /** 机构名称 */
  name?: string | null
  /** 机构类型:Company(公司)=0,Department(部门)=1,Group(小组)=2 */
  organizeType?: OrganizeTypeEnum
  /** 启用状态:Disabled(禁用)=0,Enabled(启用)=1 */
  enabled?: EnabledStatusEnum
  /** 描述 */
  remark?: string | null
  /**
   * 排序
   * @format int32
   */
  sort?: number
  /** 区域编码 */
  regionCode?: string | null
  /** 区域 */
  regionText?: string | null
}

/** 机构列表查询命令 */
export interface OrganizeInfoSearchRequest {
  search?: AdvancedSearch
  keyword?: string | null
  filter?: AdvancedFilter
  /** 启用状态:Disabled(禁用)=0,Enabled(启用)=1 */
  enabled?: EnabledStatusEnum
}

/**
 * 机构类型:Company(公司)=0,Department(部门)=1,Group(小组)=2
 * @format int32
 */
export type OrganizeTypeEnum = 0 | 1 | 2

/** 套餐授权变更命令 */
export interface PackageAuthChangeRequest {
  /**
   * 主键
   * @format uuid
   */
  id: string
  /** 菜单Id集合 */
  menuRouteIds: string[]
  /** 权限组Id集合 */
  permissionGroupIds: string[]
}

/** 套餐授权信息 */
export interface PackageAuthInfoOutput {
  /** @format uuid */
  id?: string
  /** 菜单Id集合 */
  menuRouteIds?: string[] | null
  /** 权限组Id集合 */
  permissionGroupIds?: string[] | null
}

export interface PackageInfoOutput {
  /** @format uuid */
  id?: string
  /** 名称 */
  name?: string | null
  /** 启用状态:Disabled(禁用)=0,Enabled(启用)=1 */
  enabled?: EnabledStatusEnum
  /** 描述 */
  remark?: string | null
  /**
   * 排序
   * @format int32
   */
  sort?: number
}

/** 套餐分页查询命令 */
export interface PackageInfoPageRequest {
  search?: AdvancedSearch
  keyword?: string | null
  filter?: AdvancedFilter
  /** @format int32 */
  pageNumber?: number
  /** @format int32 */
  pageSize?: number
  orderBy?: string[] | null
}

/** 套餐列表查询命令 */
export interface PackageInfoSearchRequest {
  search?: AdvancedSearch
  keyword?: string | null
  filter?: AdvancedFilter
  /** 启用状态:Disabled(禁用)=0,Enabled(启用)=1 */
  enabled?: EnabledStatusEnum
}

export interface PaginationFilter {
  search?: AdvancedSearch
  keyword?: string | null
  filter?: AdvancedFilter
  /** @format int32 */
  pageNumber?: number
  /** @format int32 */
  pageSize?: number
  orderBy?: string[] | null
}

export interface PaginationResponseDataDictOutput {
  data?: DataDictOutput[] | null
  /** @format int32 */
  currentPage?: number
  /** @format int32 */
  totalPages?: number
  /** @format int32 */
  totalCount?: number
  /** @format int32 */
  pageSize?: number
  hasPreviousPage?: boolean
  hasNextPage?: boolean
}

export interface PaginationResponseFileStorageInfoOutput {
  data?: FileStorageInfoOutput[] | null
  /** @format int32 */
  currentPage?: number
  /** @format int32 */
  totalPages?: number
  /** @format int32 */
  totalCount?: number
  /** @format int32 */
  pageSize?: number
  hasPreviousPage?: boolean
  hasNextPage?: boolean
}

export interface PaginationResponseOnlineUserInfo {
  data?: OnlineUserInfo[] | null
  /** @format int32 */
  currentPage?: number
  /** @format int32 */
  totalPages?: number
  /** @format int32 */
  totalCount?: number
  /** @format int32 */
  pageSize?: number
  hasPreviousPage?: boolean
  hasNextPage?: boolean
}

export interface PaginationResponsePackageInfoOutput {
  data?: PackageInfoOutput[] | null
  /** @format int32 */
  currentPage?: number
  /** @format int32 */
  totalPages?: number
  /** @format int32 */
  totalCount?: number
  /** @format int32 */
  pageSize?: number
  hasPreviousPage?: boolean
  hasNextPage?: boolean
}

export interface PaginationResponsePostInfoOutput {
  data?: PostInfoOutput[] | null
  /** @format int32 */
  currentPage?: number
  /** @format int32 */
  totalPages?: number
  /** @format int32 */
  totalCount?: number
  /** @format int32 */
  pageSize?: number
  hasPreviousPage?: boolean
  hasNextPage?: boolean
}

export interface PaginationResponseRegionInfoPageOutput {
  data?: RegionInfoPageOutput[] | null
  /** @format int32 */
  currentPage?: number
  /** @format int32 */
  totalPages?: number
  /** @format int32 */
  totalCount?: number
  /** @format int32 */
  pageSize?: number
  hasPreviousPage?: boolean
  hasNextPage?: boolean
}

export interface PaginationResponseRoleInfoOutput {
  data?: RoleInfoOutput[] | null
  /** @format int32 */
  currentPage?: number
  /** @format int32 */
  totalPages?: number
  /** @format int32 */
  totalCount?: number
  /** @format int32 */
  pageSize?: number
  hasPreviousPage?: boolean
  hasNextPage?: boolean
}

export interface PaginationResponseTenantOutput {
  data?: TenantOutput[] | null
  /** @format int32 */
  currentPage?: number
  /** @format int32 */
  totalPages?: number
  /** @format int32 */
  totalCount?: number
  /** @format int32 */
  pageSize?: number
  hasPreviousPage?: boolean
  hasNextPage?: boolean
}

export interface PaginationResponseUserInfoOutput {
  data?: UserInfoOutput[] | null
  /** @format int32 */
  currentPage?: number
  /** @format int32 */
  totalPages?: number
  /** @format int32 */
  totalCount?: number
  /** @format int32 */
  pageSize?: number
  hasPreviousPage?: boolean
  hasNextPage?: boolean
}

export interface PaginationResponseUserStaffPageOutput {
  data?: UserStaffPageOutput[] | null
  /** @format int32 */
  currentPage?: number
  /** @format int32 */
  totalPages?: number
  /** @format int32 */
  totalCount?: number
  /** @format int32 */
  pageSize?: number
  hasPreviousPage?: boolean
  hasNextPage?: boolean
}

/**
 * 密码加密类型:MD5Encrypt32(32位MD5加密)=0,PasswordHasher(标准标识密码哈希)=1
 * @format int32
 */
export type PasswordEncryptType = 0 | 1

/** 权限组接口 */
export interface PermissionGroupApiOutput {
  /** @format uuid */
  id?: string
  /**
   * 接口Id
   * @format uuid
   */
  apiId?: string
  api?: ApiInfoOutput
  /**
   * 权限组Id
   * @format uuid
   */
  permissionGroupId?: string
}

export interface PermissionGroupOutput {
  /** @format uuid */
  id?: string
  /** 名称 */
  name?: string | null
  /** 描述 */
  remark?: string | null
  /** 数权范围:All(全部)=1,CurrentWithChildAndAffiliateDept(本部门加下级部门加附属部门)=2,CurrentWithAffiliateDept(本部门加附属部门)=3,CurrentWithChildDept(本部门加下级部门)=4,CurrentDept(本部门)=5,CurrentUserStaff(当前员工)=6 */
  scope?: DataPermissionScope
  /**
   * 排序号
   * @format int32
   */
  sort?: number
  /** 启用状态:Disabled(禁用)=0,Enabled(启用)=1 */
  enabled?: EnabledStatusEnum
  /**
   * 父级
   * @format uuid
   */
  parentId?: string | null
}

/** 权限组接口 */
export interface PermissionGroupWithApiOutput {
  /** @format uuid */
  id?: string
  /** 名称 */
  name?: string | null
  /** 描述 */
  remark?: string | null
  /** 数权范围:All(全部)=1,CurrentWithChildAndAffiliateDept(本部门加下级部门加附属部门)=2,CurrentWithAffiliateDept(本部门加附属部门)=3,CurrentWithChildDept(本部门加下级部门)=4,CurrentDept(本部门)=5,CurrentUserStaff(当前员工)=6 */
  scope?: DataPermissionScope
  /**
   * 排序号
   * @format int32
   */
  sort?: number
  /** 启用状态:Disabled(禁用)=0,Enabled(启用)=1 */
  enabled?: EnabledStatusEnum
  /**
   * 父级
   * @format uuid
   */
  parentId?: string | null
  /** 权限组接口列表 */
  permissionGroupApis?: PermissionGroupApiOutput[] | null
}

/** 权限组列表查询接口一并返回 */
export interface PermissionGroupWithApiSearchRequest {
  search?: AdvancedSearch
  keyword?: string | null
  filter?: AdvancedFilter
  /** 启用状态:Disabled(禁用)=0,Enabled(启用)=1 */
  enabled?: EnabledStatusEnum
}

/** 岗位输出 */
export interface PostInfoOutput {
  /** @format uuid */
  id?: string
  /** 岗位名称 */
  name?: string | null
  /** 描述 */
  remark?: string | null
}

/** 岗位分页查询命令 */
export interface PostInfoPageSearchRequest {
  search?: AdvancedSearch
  keyword?: string | null
  filter?: AdvancedFilter
  /** @format int32 */
  pageNumber?: number
  /** @format int32 */
  pageSize?: number
  orderBy?: string[] | null
}

/** 岗位列表查询命令 */
export interface PostInfoSearchRequest {
  search?: AdvancedSearch
  keyword?: string | null
  filter?: AdvancedFilter
}

/** 行政区域启用状态变更 */
export interface RegionInfoEnabledChangeRequest {
  /**
   * 区域Id
   * @format uuid
   */
  id: string
  /** 启用状态:Disabled(禁用)=0,Enabled(启用)=1 */
  enabled: EnabledStatusEnum
}

/** 行政区域热门设置 */
export interface RegionInfoHotChangeRequest {
  /**
   * 区域Id
   * @format uuid
   */
  id: string
  /** 热门 */
  hot: boolean
}

export interface RegionInfoPageOutput {
  /** @format uuid */
  id?: string
  /** 上级区域代码 */
  parentCode?: string | null
  /** 名称 */
  name?: string | null
  /** 地区级别:Province(省份)=1,City(城市)=2,County(县/区)=3,Town(乡镇/街道)=4,Vilage(村/社区)=5 */
  level?: RegionLevel
  /** 区域代码 */
  code?: string | null
  /** 拼音 */
  pinyin?: string | null
  /** 拼音首字母 */
  pinyinFirst?: string | null
  /** 提取地址 */
  url?: string | null
  /** 城乡分类代码 */
  vilageCode?: string | null
  /**
   * 排序
   * @format int32
   */
  sort?: number
  /** 热门 */
  hot?: boolean
  /** 启用状态:Disabled(禁用)=0,Enabled(启用)=1 */
  enabled?: EnabledStatusEnum
}

/** 行政区域分页查询 */
export interface RegionInfoPageRequest {
  search?: AdvancedSearch
  keyword?: string | null
  filter?: AdvancedFilter
  /** @format int32 */
  pageNumber?: number
  /** @format int32 */
  pageSize?: number
  orderBy?: string[] | null
  /** 上级Id */
  parentCode?: string | null
  /** 名称 */
  name?: string | null
  /** 地区级别:Province(省份)=1,City(城市)=2,County(县/区)=3,Town(乡镇/街道)=4,Vilage(村/社区)=5 */
  level?: RegionLevel
  /** 热门 */
  hot?: boolean | null
  /** 启用状态:Disabled(禁用)=0,Enabled(启用)=1 */
  enabled?: EnabledStatusEnum
}

/** 行政区域列表查询 */
export interface RegionInfoSearchRequest {
  /** 上级Id */
  parentCode?: string | null
  /** 热门 */
  hot?: boolean | null
  /** 启用状态:Disabled(禁用)=0,Enabled(启用)=1 */
  enabled?: EnabledStatusEnum
}

export interface RegionInfoSimpleOuput {
  /** @format uuid */
  id?: string
  /** 编码 */
  code?: string | null
  /** 名称 */
  name?: string | null
  /** 热门 */
  hot?: boolean
}

/**
 * 地区级别:Province(省份)=1,City(城市)=2,County(县/区)=3,Town(乡镇/街道)=4,Vilage(村/社区)=5
 * @format int32
 */
export type RegionLevel = 1 | 2 | 3 | 4 | 5

/** 结果输出 */
export interface ResultOutputBoolean {
  /** 是否成功标记 */
  success?: boolean
  /**
   * 编码
   * @format int32
   */
  code?: number
  /** 消息 */
  msg?: string | null
  /** 数据 */
  data?: boolean
}

/** 结果输出 */
export interface ResultOutputCaptchaData {
  /** 是否成功标记 */
  success?: boolean
  /**
   * 编码
   * @format int32
   */
  code?: number
  /** 消息 */
  msg?: string | null
  data?: CaptchaData
}

/** 结果输出 */
export interface ResultOutputCurrentUserStaffOutput {
  /** 是否成功标记 */
  success?: boolean
  /**
   * 编码
   * @format int32
   */
  code?: number
  /** 消息 */
  msg?: string | null
  /** 当前登录用户身份信息 */
  data?: CurrentUserStaffOutput
}

/** 结果输出 */
export interface ResultOutputFileStorageInfoSimpleOutput {
  /** 是否成功标记 */
  success?: boolean
  /**
   * 编码
   * @format int32
   */
  code?: number
  /** 消息 */
  msg?: string | null
  /** 文件存储信息简单输出 */
  data?: FileStorageInfoSimpleOutput
}

/** 结果输出 */
export interface ResultOutputGuid {
  /** 是否成功标记 */
  success?: boolean
  /**
   * 编码
   * @format int32
   */
  code?: number
  /** 消息 */
  msg?: string | null
  /**
   * 数据
   * @format uuid
   */
  data?: string
}

/** 结果输出 */
export interface ResultOutputIEnumerableString {
  /** 是否成功标记 */
  success?: boolean
  /**
   * 编码
   * @format int32
   */
  code?: number
  /** 消息 */
  msg?: string | null
  /** 数据 */
  data?: string[] | null
}

/** 结果输出 */
export interface ResultOutputInt32 {
  /** 是否成功标记 */
  success?: boolean
  /**
   * 编码
   * @format int32
   */
  code?: number
  /** 消息 */
  msg?: string | null
  /**
   * 数据
   * @format int32
   */
  data?: number
}

/** 结果输出 */
export interface ResultOutputListApiInfoOutput {
  /** 是否成功标记 */
  success?: boolean
  /**
   * 编码
   * @format int32
   */
  code?: number
  /** 消息 */
  msg?: string | null
  /** 数据 */
  data?: ApiInfoOutput[] | null
}

/** 结果输出 */
export interface ResultOutputListDataDictOutput {
  /** 是否成功标记 */
  success?: boolean
  /**
   * 编码
   * @format int32
   */
  code?: number
  /** 消息 */
  msg?: string | null
  /** 数据 */
  data?: DataDictOutput[] | null
}

/** 结果输出 */
export interface ResultOutputListEnumsOutput {
  /** 是否成功标记 */
  success?: boolean
  /**
   * 编码
   * @format int32
   */
  code?: number
  /** 消息 */
  msg?: string | null
  /** 数据 */
  data?: EnumsOutput[] | null
}

/** 结果输出 */
export interface ResultOutputListFileStorageInfoSimpleOutput {
  /** 是否成功标记 */
  success?: boolean
  /**
   * 编码
   * @format int32
   */
  code?: number
  /** 消息 */
  msg?: string | null
  /** 数据 */
  data?: FileStorageInfoSimpleOutput[] | null
}

/** 结果输出 */
export interface ResultOutputListGuid {
  /** 是否成功标记 */
  success?: boolean
  /**
   * 编码
   * @format int32
   */
  code?: number
  /** 消息 */
  msg?: string | null
  /** 数据 */
  data?: string[] | null
}

/** 结果输出 */
export interface ResultOutputListMenuRouteOutput {
  /** 是否成功标记 */
  success?: boolean
  /**
   * 编码
   * @format int32
   */
  code?: number
  /** 消息 */
  msg?: string | null
  /** 数据 */
  data?: MenuRouteOutput[] | null
}

/** 结果输出 */
export interface ResultOutputListMenuRouteSimpleOutput {
  /** 是否成功标记 */
  success?: boolean
  /**
   * 编码
   * @format int32
   */
  code?: number
  /** 消息 */
  msg?: string | null
  /** 数据 */
  data?: MenuRouteSimpleOutput[] | null
}

/** 结果输出 */
export interface ResultOutputListOrganizeInfoOutput {
  /** 是否成功标记 */
  success?: boolean
  /**
   * 编码
   * @format int32
   */
  code?: number
  /** 消息 */
  msg?: string | null
  /** 数据 */
  data?: OrganizeInfoOutput[] | null
}

/** 结果输出 */
export interface ResultOutputListPackageInfoOutput {
  /** 是否成功标记 */
  success?: boolean
  /**
   * 编码
   * @format int32
   */
  code?: number
  /** 消息 */
  msg?: string | null
  /** 数据 */
  data?: PackageInfoOutput[] | null
}

/** 结果输出 */
export interface ResultOutputListPermissionGroupOutput {
  /** 是否成功标记 */
  success?: boolean
  /**
   * 编码
   * @format int32
   */
  code?: number
  /** 消息 */
  msg?: string | null
  /** 数据 */
  data?: PermissionGroupOutput[] | null
}

/** 结果输出 */
export interface ResultOutputListPermissionGroupWithApiOutput {
  /** 是否成功标记 */
  success?: boolean
  /**
   * 编码
   * @format int32
   */
  code?: number
  /** 消息 */
  msg?: string | null
  /** 数据 */
  data?: PermissionGroupWithApiOutput[] | null
}

/** 结果输出 */
export interface ResultOutputListPostInfoOutput {
  /** 是否成功标记 */
  success?: boolean
  /**
   * 编码
   * @format int32
   */
  code?: number
  /** 消息 */
  msg?: string | null
  /** 数据 */
  data?: PostInfoOutput[] | null
}

/** 结果输出 */
export interface ResultOutputListRegionInfoSimpleOuput {
  /** 是否成功标记 */
  success?: boolean
  /**
   * 编码
   * @format int32
   */
  code?: number
  /** 消息 */
  msg?: string | null
  /** 数据 */
  data?: RegionInfoSimpleOuput[] | null
}

/** 结果输出 */
export interface ResultOutputListRoleInfoOutput {
  /** 是否成功标记 */
  success?: boolean
  /**
   * 编码
   * @format int32
   */
  code?: number
  /** 消息 */
  msg?: string | null
  /** 数据 */
  data?: RoleInfoOutput[] | null
}

/** 结果输出 */
export interface ResultOutputListString {
  /** 是否成功标记 */
  success?: boolean
  /**
   * 编码
   * @format int32
   */
  code?: number
  /** 消息 */
  msg?: string | null
  /** 数据 */
  data?: string[] | null
}

/** 结果输出 */
export interface ResultOutputListUserStaffOutput {
  /** 是否成功标记 */
  success?: boolean
  /**
   * 编码
   * @format int32
   */
  code?: number
  /** 消息 */
  msg?: string | null
  /** 数据 */
  data?: UserStaffOutput[] | null
}

/** 结果输出 */
export interface ResultOutputListViewInfoOutput {
  /** 是否成功标记 */
  success?: boolean
  /**
   * 编码
   * @format int32
   */
  code?: number
  /** 消息 */
  msg?: string | null
  /** 数据 */
  data?: ViewInfoOutput[] | null
}

/** 结果输出 */
export interface ResultOutputPackageAuthInfoOutput {
  /** 是否成功标记 */
  success?: boolean
  /**
   * 编码
   * @format int32
   */
  code?: number
  /** 消息 */
  msg?: string | null
  /** 套餐授权信息 */
  data?: PackageAuthInfoOutput
}

/** 结果输出 */
export interface ResultOutputPaginationResponseDataDictOutput {
  /** 是否成功标记 */
  success?: boolean
  /**
   * 编码
   * @format int32
   */
  code?: number
  /** 消息 */
  msg?: string | null
  data?: PaginationResponseDataDictOutput
}

/** 结果输出 */
export interface ResultOutputPaginationResponseFileStorageInfoOutput {
  /** 是否成功标记 */
  success?: boolean
  /**
   * 编码
   * @format int32
   */
  code?: number
  /** 消息 */
  msg?: string | null
  data?: PaginationResponseFileStorageInfoOutput
}

/** 结果输出 */
export interface ResultOutputPaginationResponseOnlineUserInfo {
  /** 是否成功标记 */
  success?: boolean
  /**
   * 编码
   * @format int32
   */
  code?: number
  /** 消息 */
  msg?: string | null
  data?: PaginationResponseOnlineUserInfo
}

/** 结果输出 */
export interface ResultOutputPaginationResponsePackageInfoOutput {
  /** 是否成功标记 */
  success?: boolean
  /**
   * 编码
   * @format int32
   */
  code?: number
  /** 消息 */
  msg?: string | null
  data?: PaginationResponsePackageInfoOutput
}

/** 结果输出 */
export interface ResultOutputPaginationResponsePostInfoOutput {
  /** 是否成功标记 */
  success?: boolean
  /**
   * 编码
   * @format int32
   */
  code?: number
  /** 消息 */
  msg?: string | null
  data?: PaginationResponsePostInfoOutput
}

/** 结果输出 */
export interface ResultOutputPaginationResponseRegionInfoPageOutput {
  /** 是否成功标记 */
  success?: boolean
  /**
   * 编码
   * @format int32
   */
  code?: number
  /** 消息 */
  msg?: string | null
  data?: PaginationResponseRegionInfoPageOutput
}

/** 结果输出 */
export interface ResultOutputPaginationResponseRoleInfoOutput {
  /** 是否成功标记 */
  success?: boolean
  /**
   * 编码
   * @format int32
   */
  code?: number
  /** 消息 */
  msg?: string | null
  data?: PaginationResponseRoleInfoOutput
}

/** 结果输出 */
export interface ResultOutputPaginationResponseTenantOutput {
  /** 是否成功标记 */
  success?: boolean
  /**
   * 编码
   * @format int32
   */
  code?: number
  /** 消息 */
  msg?: string | null
  data?: PaginationResponseTenantOutput
}

/** 结果输出 */
export interface ResultOutputPaginationResponseUserInfoOutput {
  /** 是否成功标记 */
  success?: boolean
  /**
   * 编码
   * @format int32
   */
  code?: number
  /** 消息 */
  msg?: string | null
  data?: PaginationResponseUserInfoOutput
}

/** 结果输出 */
export interface ResultOutputPaginationResponseUserStaffPageOutput {
  /** 是否成功标记 */
  success?: boolean
  /**
   * 编码
   * @format int32
   */
  code?: number
  /** 消息 */
  msg?: string | null
  data?: PaginationResponseUserStaffPageOutput
}

/** 结果输出 */
export interface ResultOutputRoleAuthInfoOutput {
  /** 是否成功标记 */
  success?: boolean
  /**
   * 编码
   * @format int32
   */
  code?: number
  /** 消息 */
  msg?: string | null
  /** 角色授权信息 */
  data?: RoleAuthInfoOutput
}

/** 结果输出 */
export interface ResultOutputString {
  /** 是否成功标记 */
  success?: boolean
  /**
   * 编码
   * @format int32
   */
  code?: number
  /** 消息 */
  msg?: string | null
  /** 数据 */
  data?: string | null
}

/** 结果输出 */
export interface ResultOutputToken {
  /** 是否成功标记 */
  success?: boolean
  /**
   * 编码
   * @format int32
   */
  code?: number
  /** 消息 */
  msg?: string | null
  data?: Token
}

/** 结果输出 */
export interface ResultOutputUserStaffExtendOutput {
  /** 是否成功标记 */
  success?: boolean
  /**
   * 编码
   * @format int32
   */
  code?: number
  /** 消息 */
  msg?: string | null
  /** 员工表单信息 */
  data?: UserStaffExtendOutput
}

/** 结果输出 */
export interface ResultOutputUserStaffPageOutput {
  /** 是否成功标记 */
  success?: boolean
  /**
   * 编码
   * @format int32
   */
  code?: number
  /** 消息 */
  msg?: string | null
  /** 员工分页输出 */
  data?: UserStaffPageOutput
}

/** 结果输出 */
export interface ResultOutputValidateResult {
  /** 是否成功标记 */
  success?: boolean
  /**
   * 编码
   * @format int32
   */
  code?: number
  /** 消息 */
  msg?: string | null
  data?: ValidateResult
}

/** 角色授权信息 */
export interface RoleAuthInfoOutput {
  /** @format uuid */
  id?: string
  /** 菜单Id集合 */
  menuRouteIds?: string[] | null
  /** 权限组Id集合 */
  permissionGroupIds?: string[] | null
}

/** 角色授权变更 */
export interface RoleInfoAuthChangeRequest {
  /**
   * 主键
   * @format uuid
   */
  id: string
  /** 菜单Id集合 */
  menuRouteIds: string[]
  /** 权限组Id集合 */
  permissionGroupIds: string[]
}

export interface RoleInfoOutput {
  /** @format uuid */
  id?: string
  /** 角色名称 */
  name?: string | null
  /** 描述 */
  remark?: string | null
  /**
   * 排序号
   * @format int32
   */
  sort?: number
  /** 启用状态:Disabled(禁用)=0,Enabled(启用)=1 */
  enabled?: EnabledStatusEnum
}

/** 角色分页查询 */
export interface RoleInfoPageRequest {
  search?: AdvancedSearch
  keyword?: string | null
  filter?: AdvancedFilter
  /** @format int32 */
  pageNumber?: number
  /** @format int32 */
  pageSize?: number
  orderBy?: string[] | null
}

/** 角色列表查询 */
export interface RoleInfoSearchRequest {
  search?: AdvancedSearch
  keyword?: string | null
  filter?: AdvancedFilter
  /** 启用状态:Disabled(禁用)=0,Enabled(启用)=1 */
  enabled?: EnabledStatusEnum
}

/** 发送短信验证码 */
export interface SendSmsCodeRequest {
  /**
   * 手机号
   * @minLength 1
   */
  mobile: string
  /** 验证码Id */
  codeId?: string | null
  /**
   * 滑块验证Id
   * @minLength 1
   */
  captchaId: string
  track: SlideTrack
}

export interface SlideTrack {
  /** @format int32 */
  backgroundImageWidth?: number
  /** @format int32 */
  backgroundImageHeight?: number
  /** @format int32 */
  sliderImageWidth?: number
  /** @format int32 */
  sliderImageHeight?: number
  /** @format date-time */
  startTime?: string
  /** @format date-time */
  endTime?: string
  tracks?: Track[] | null
  /** @format float */
  percent?: number
}

export interface TenantOutput {
  /** @format uuid */
  id?: string
  /** @format uuid */
  createdBy?: string
  /** @format uuid */
  createdOrgBy?: string | null
  /** @format uuid */
  createdUserStaffBy?: string | null
  createdUserName?: string | null
  modifiedUserName?: string | null
  /** @format date-time */
  createdOn?: string
  /** @format uuid */
  lastModifiedBy?: string | null
  /** @format date-time */
  lastModifiedOn?: string | null
  /** 租户名称 */
  name?: string | null
  /** 公司名称 */
  companyName?: string | null
  /** 联系人 */
  contactPerson?: string | null
  /** 联系手机 */
  contactMobile?: string | null
  /** 描述 */
  remark?: string | null
  /** 租户类型:NormalTenant(普通租户)=0,PlatformTenant(平台租户)=1 */
  tenantType?: TenantTypeEnum
  /** 启用状态:Disabled(禁用)=0,Enabled(启用)=1 */
  enabled?: EnabledStatusEnum
  /**
   * 有效期限
   * @format date-time
   */
  expiryDate?: string
  /** 区域编码 */
  regionCode?: string | null
  /** 区域 */
  regionText?: string | null
}

/** 租户分页查询命令 */
export interface TenantPageRequest {
  search?: AdvancedSearch
  keyword?: string | null
  filter?: AdvancedFilter
  /** @format int32 */
  pageNumber?: number
  /** @format int32 */
  pageSize?: number
  orderBy?: string[] | null
}

/**
 * 租户类型:NormalTenant(普通租户)=0,PlatformTenant(平台租户)=1
 * @format int32
 */
export type TenantTypeEnum = 0 | 1

export interface Token {
  tokenValue?: string | null
  /** @format date-time */
  expires?: string | null
  tokenType?: string | null
}

export interface Track {
  /** @format int32 */
  x?: number
  /** @format int32 */
  y?: number
  /** @format int32 */
  t?: number
}

/** 编辑字典 */
export interface UpdateDataDictRequest {
  /**
   * 字典父级编码
   * @maxLength 32
   */
  parentCode?: string | null
  /**
   * 字典唯一编码
   * @minLength 1
   * @maxLength 32
   */
  code: string
  /**
   * 字典名称
   * @minLength 1
   * @maxLength 64
   */
  name: string
  /**
   * 排序号
   * @format int32
   */
  sort: number
  /**
   * 样式
   * @maxLength 64
   */
  themeStyle?: string | null
  /**
   * 描述
   * @maxLength 512
   */
  remark?: string | null
  /** 启用状态:Disabled(禁用)=0,Enabled(启用)=1 */
  enabled: EnabledStatusEnum
  /**
   * 主键
   * @format uuid
   */
  id: string
}

/** 编辑菜单命令 */
export interface UpdateMenuRouteRequest {
  /**
   * 父级
   * @format uuid
   */
  parentId?: string | null
  /**
   * 视图id
   * @format uuid
   */
  viewId?: string | null
  /** 菜单路由类型:Group(分组)=1,Menu(菜单)=2 */
  type: MenuRouteTypeEnum
  /**
   * 名称
   * @minLength 1
   * @maxLength 64
   */
  name: string
  /**
   * 路由地址
   * @minLength 1
   * @maxLength 128
   */
  routeUrl: string
  /**
   * 路由命名,菜单同对应视图
   * @maxLength 64
   */
  routeName?: string | null
  /**
   * 重定向地址
   * @maxLength 128
   */
  redirectUrl?: string | null
  /**
   * 图标
   * @maxLength 64
   */
  icon?: string | null
  /** 隐藏 */
  hidden?: boolean
  /** 展开分组 */
  opened?: boolean
  /** 打开新窗口 */
  newWindow?: boolean
  /** 链接外显 */
  external?: boolean
  /** 是否缓存 */
  isKeepAlive?: boolean
  /** 是否固定 */
  isAffix?: boolean
  /**
   * 内/外部链接
   * @maxLength 512
   */
  link?: string | null
  /** 是否内嵌窗口 */
  isIframe?: boolean
  /**
   * 排序
   * @format int32
   */
  sort: number
  /**
   * 描述
   * @maxLength 512
   */
  remark?: string | null
  /** 启用状态:Disabled(禁用)=0,Enabled(启用)=1 */
  enabled: EnabledStatusEnum
  /**
   * 主键
   * @format uuid
   */
  id: string
}

/** 编辑机构命令 */
export interface UpdateOrganizeInfoRequest {
  /**
   * 父级
   * @format uuid
   */
  parentId?: string | null
  /**
   * 机构名称
   * @minLength 1
   * @maxLength 64
   */
  name: string
  /** 机构类型:Company(公司)=0,Department(部门)=1,Group(小组)=2 */
  organizeType: OrganizeTypeEnum
  /** 启用状态:Disabled(禁用)=0,Enabled(启用)=1 */
  enabled: EnabledStatusEnum
  /**
   * 描述
   * @maxLength 512
   */
  remark?: string | null
  /**
   * 排序
   * @format int32
   */
  sort: number
  /**
   * 区域编码
   * @minLength 1
   * @maxLength 32
   */
  regionCode: string
  /**
   * 区域
   * @minLength 1
   * @maxLength 256
   */
  regionText: string
  /**
   * 用户主键
   * @format uuid
   */
  id: string
}

/** 编辑套餐命令 */
export interface UpdatePackageInfoRequest {
  /**
   * 名称
   * @minLength 1
   * @maxLength 64
   */
  name: string
  /**
   * 描述
   * @maxLength 512
   */
  remark?: string | null
  /**
   * 排序
   * @format int32
   */
  sort: number
  /** 启用状态:Disabled(禁用)=0,Enabled(启用)=1 */
  enabled: EnabledStatusEnum
  /**
   * 主键
   * @format uuid
   */
  id: string
}

/** 编辑权限组 */
export interface UpdatePermissionGroupRequest {
  /**
   * 名称
   * @minLength 1
   * @maxLength 64
   */
  name: string
  /**
   * 描述
   * @maxLength 512
   */
  remark?: string | null
  /** 数权范围:All(全部)=1,CurrentWithChildAndAffiliateDept(本部门加下级部门加附属部门)=2,CurrentWithAffiliateDept(本部门加附属部门)=3,CurrentWithChildDept(本部门加下级部门)=4,CurrentDept(本部门)=5,CurrentUserStaff(当前员工)=6 */
  scope: DataPermissionScope
  /**
   * 排序号
   * @format int32
   */
  sort: number
  /** 启用状态:Disabled(禁用)=0,Enabled(启用)=1 */
  enabled: EnabledStatusEnum
  /**
   * 父级
   * @format uuid
   */
  parentId?: string | null
  /**
   * 主键Id
   * @format uuid
   */
  id: string
  /** 接口Id集合 */
  apiIds: string[]
}

/** 编辑个人用户信息命令 */
export interface UpdatePersonalUserInfoRequest {
  /**
   * 账号(唯一)
   * @minLength 1
   * @maxLength 16
   */
  account: string
  /**
   * 昵称
   * @minLength 1
   * @maxLength 16
   */
  nickName: string
  /**
   * 手机号(唯一)
   * @minLength 1
   * @maxLength 16
   */
  mobile: string
  /**
   * 邮箱
   * @maxLength 64
   */
  email?: string | null
  /**
   * 密码
   * @maxLength 16
   */
  password?: string | null
  /** 性别:Unknown(未知)=0,Male(男)=1,Female(女)=2 */
  gender: GenderEnum
  /**
   * 员工真实姓名
   * @minLength 1
   * @maxLength 16
   */
  realName: string
  /**
   * 员工个人简介
   * @maxLength 512
   */
  remark?: string | null
}

/** 编辑岗位命令 */
export interface UpdatePostInfoRequest {
  /**
   * 岗位名称
   * @minLength 1
   * @maxLength 64
   */
  name: string
  /**
   * 描述
   * @minLength 1
   * @maxLength 512
   */
  remark: string
  /**
   * 主键
   * @format uuid
   */
  id: string
}

/** 编辑行政区域命令 */
export interface UpdateRegionInfoRequest {
  /**
   * 上级地区代码
   * @maxLength 32
   */
  parentCode?: string | null
  /**
   * 名称
   * @minLength 1
   * @maxLength 64
   */
  name: string
  /** 地区级别:Province(省份)=1,City(城市)=2,County(县/区)=3,Town(乡镇/街道)=4,Vilage(村/社区)=5 */
  level: RegionLevel
  /**
   * 代码
   * @minLength 1
   * @maxLength 32
   */
  code: string
  /**
   * 提取Url
   * @maxLength 128
   */
  url?: string | null
  /**
   * 排序
   * @format int32
   */
  sort: number
  /** 热门 */
  hot: boolean
  /** 启用状态:Disabled(禁用)=0,Enabled(启用)=1 */
  enabled: EnabledStatusEnum
  /**
   * 区域Id
   * @format uuid
   */
  id: string
}

/** 编辑角色 */
export interface UpdateRoleInfoRequest {
  /**
   * 角色名称
   * @minLength 1
   * @maxLength 64
   */
  name: string
  /**
   * 描述
   * @maxLength 512
   */
  remark?: string | null
  /**
   * 排序号
   * @format int32
   */
  sort: number
  /** 启用状态:Disabled(禁用)=0,Enabled(启用)=1 */
  enabled: EnabledStatusEnum
  /**
   * 主键
   * @format uuid
   */
  id: string
}

/** 编辑租户命令 */
export interface UpdateTenantRequest {
  /**
   * 名称
   * @minLength 1
   * @maxLength 64
   */
  name: string
  /**
   * 公司名称
   * @minLength 1
   * @maxLength 64
   */
  companyName: string
  /**
   * 联系人
   * @minLength 1
   * @maxLength 16
   */
  contactPerson: string
  /**
   * 联系手机
   * @minLength 1
   * @maxLength 16
   */
  contactMobile: string
  /**
   * 描述
   * @maxLength 512
   */
  remark?: string | null
  /**
   * 有效期限
   * @format date-time
   */
  expiryDate: string
  /**
   * 区域编码
   * @minLength 1
   * @maxLength 32
   */
  regionCode: string
  /**
   * 区域
   * @minLength 1
   * @maxLength 256
   */
  regionText: string
  /** 启用状态:Disabled(禁用)=0,Enabled(启用)=1 */
  enabled: EnabledStatusEnum
  /**
   * 主键
   * @format uuid
   */
  id: string
  /** 套餐Id集合 */
  packageIds: string[]
}

/** 编辑员工 */
export interface UpdateUserStaffRequest {
  /**
   * 岗位Id
   * @format uuid
   */
  postId: string
  /**
   * 真实姓名
   * @minLength 1
   * @maxLength 16
   */
  realName: string
  /**
   * 工号
   * @minLength 1
   * @maxLength 32
   */
  jobNo: string
  /** 启用状态:Disabled(禁用)=0,Enabled(启用)=1 */
  enabled: EnabledStatusEnum
  /**
   * 入职日期
   * @format date-time
   */
  entryDate?: string | null
  /**
   * 描述
   * @maxLength 512
   */
  remark?: string | null
  /**
   * 雇佣所属机构Id
   * @format uuid
   */
  orgId: string
  /** 是否为主管 */
  isManager: boolean
  /**
   * 主键Id
   * @format uuid
   */
  id: string
  /** 附属机构Id集合 */
  orgIds?: string[] | null
  /** 角色Id集合 */
  roleIds: string[]
}

/** 编辑视图命令 */
export interface UpdateViewInfoRequest {
  /**
   * 视图路由命名,ts中声明
   * @minLength 1
   * @maxLength 64
   */
  routeName: string
  /**
   * 视图名称
   * @minLength 1
   * @maxLength 64
   */
  name: string
  /**
   * 路径
   * @minLength 1
   * @maxLength 128
   */
  path: string
  /**
   * 说明
   * @maxLength 512
   */
  remark?: string | null
  /** 是否缓存 */
  isKeepAlive: boolean
  /**
   * 排序号
   * @format int32
   */
  sort: number
  /** 启用状态:Disabled(禁用)=0,Enabled(启用)=1 */
  enabled: EnabledStatusEnum
  /**
   * 上级
   * @format uuid
   */
  parentId?: string | null
  /**
   * 主键
   * @format uuid
   */
  id: string
}

/** 用户 */
export interface UserInfoInput {
  /**
   * 账号(唯一)
   * @minLength 1
   * @maxLength 16
   */
  account: string
  /**
   * 昵称
   * @minLength 1
   * @maxLength 16
   */
  nickName: string
  /**
   * 手机号(唯一)
   * @minLength 1
   * @maxLength 16
   */
  mobile: string
  /**
   * 邮箱
   * @maxLength 64
   */
  email?: string | null
  /**
   * 密码
   * @maxLength 16
   */
  password?: string | null
  /** 性别:Unknown(未知)=0,Male(男)=1,Female(女)=2 */
  gender: GenderEnum
}

/** 用户信息输出 */
export interface UserInfoOutput {
  /** @format uuid */
  id?: string
  /** @format uuid */
  createdBy?: string
  /** @format uuid */
  createdOrgBy?: string | null
  /** @format uuid */
  createdUserStaffBy?: string | null
  createdUserName?: string | null
  modifiedUserName?: string | null
  /** @format date-time */
  createdOn?: string
  /** @format uuid */
  lastModifiedBy?: string | null
  /** @format date-time */
  lastModifiedOn?: string | null
  /** 账号(唯一) */
  account?: string | null
  /** 昵称 */
  nickName?: string | null
  /** 密码 */
  password?: string | null
  /** 密码加密类型:MD5Encrypt32(32位MD5加密)=0,PasswordHasher(标准标识密码哈希)=1 */
  passwordEncryptType?: PasswordEncryptType
  /** 手机号(唯一) */
  mobile?: string | null
  /** 邮箱 */
  email?: string | null
  /**
   * 头像文件Id
   * @format uuid
   */
  avatarFileId?: string | null
  /** 头像外链 */
  avatarUrl?: string | null
  /** 性别:Unknown(未知)=0,Male(男)=1,Female(女)=2 */
  gender?: GenderEnum
}

/** 分页查询用户命令 */
export interface UserInfoPageRequest {
  search?: AdvancedSearch
  keyword?: string | null
  filter?: AdvancedFilter
  /** @format int32 */
  pageNumber?: number
  /** @format int32 */
  pageSize?: number
  orderBy?: string[] | null
}

/** 员工表单信息 */
export interface UserStaffExtendOutput {
  /** @format uuid */
  id?: string
  /** 附属机构Id集合 */
  orgIds?: string[] | null
  /** 角色Id集合 */
  roleIds?: string[] | null
}

/** 员工输出 */
export interface UserStaffOutput {
  /** @format uuid */
  id?: string
  /** @format uuid */
  createdBy?: string
  /** @format uuid */
  createdOrgBy?: string | null
  /** @format uuid */
  createdUserStaffBy?: string | null
  createdUserName?: string | null
  modifiedUserName?: string | null
  /** @format date-time */
  createdOn?: string
  /** @format uuid */
  lastModifiedBy?: string | null
  /** @format date-time */
  lastModifiedOn?: string | null
  /**
   * 所属用户Id
   * @format uuid
   */
  userId?: string
  /**
   * 岗位Id
   * @format uuid
   */
  postId?: string
  /** 岗位输出 */
  post?: PostInfoOutput
  /** 真实姓名 */
  realName?: string | null
  /** 工号 */
  jobNo?: string | null
  /** 启用状态:Disabled(禁用)=0,Enabled(启用)=1 */
  enabled?: EnabledStatusEnum
  /**
   * 入职日期
   * @format date-time
   */
  entryDate?: string | null
  /** 描述 */
  remark?: string | null
  /**
   * 雇佣所属机构Id
   * @format uuid
   */
  orgId?: string
  /** 机构输出 */
  org?: OrganizeInfoOutput
  /** 是否为主管 */
  isManager?: boolean
  /** 职工类型:Normal(普通职工)=1,TenantAdmin(租户管理员)=10,PlatformAdmin(平台管理员)=100 */
  userStaffType?: UserStaffTypeEnum
}

/** 员工分页输出 */
export interface UserStaffPageOutput {
  /** @format uuid */
  id?: string
  /** @format uuid */
  createdBy?: string
  /** @format uuid */
  createdOrgBy?: string | null
  /** @format uuid */
  createdUserStaffBy?: string | null
  createdUserName?: string | null
  modifiedUserName?: string | null
  /** @format date-time */
  createdOn?: string
  /** @format uuid */
  lastModifiedBy?: string | null
  /** @format date-time */
  lastModifiedOn?: string | null
  /**
   * 所属用户Id
   * @format uuid
   */
  userId?: string
  /**
   * 岗位Id
   * @format uuid
   */
  postId?: string
  /** 岗位输出 */
  post?: PostInfoOutput
  /** 真实姓名 */
  realName?: string | null
  /** 工号 */
  jobNo?: string | null
  /** 启用状态:Disabled(禁用)=0,Enabled(启用)=1 */
  enabled?: EnabledStatusEnum
  /**
   * 入职日期
   * @format date-time
   */
  entryDate?: string | null
  /** 描述 */
  remark?: string | null
  /**
   * 雇佣所属机构Id
   * @format uuid
   */
  orgId?: string
  /** 机构输出 */
  org?: OrganizeInfoOutput
  /** 是否为主管 */
  isManager?: boolean
  /** 职工类型:Normal(普通职工)=1,TenantAdmin(租户管理员)=10,PlatformAdmin(平台管理员)=100 */
  userStaffType?: UserStaffTypeEnum
  /** 用户信息输出 */
  user?: UserInfoOutput
}

/** 员工分页查询 */
export interface UserStaffPageRequest {
  search?: AdvancedSearch
  keyword?: string | null
  filter?: AdvancedFilter
  /** @format int32 */
  pageNumber?: number
  /** @format int32 */
  pageSize?: number
  orderBy?: string[] | null
  /**
   * 机构Id
   * @format uuid
   */
  orgId?: string | null
}

/**
 * 职工类型:Normal(普通职工)=1,TenantAdmin(租户管理员)=10,PlatformAdmin(平台管理员)=100
 * @format int32
 */
export type UserStaffTypeEnum = 1 | 10 | 100

export interface ValidateResult {
  /** Success=0,ValidateFail=1,Timeout=2 */
  result?: ValidateResultType
  message?: string | null
}

/**
 * Success=0,ValidateFail=1,Timeout=2
 * @format int32
 */
export type ValidateResultType = 0 | 1 | 2

export interface ViewInfoOutput {
  /** @format uuid */
  id?: string
  /** 视图路由命名,ts中声明 */
  routeName?: string | null
  /** 视图名称 */
  name?: string | null
  /** 路径 */
  path?: string | null
  /** 说明 */
  remark?: string | null
  /** 是否缓存 */
  isKeepAlive?: boolean
  /**
   * 排序号
   * @format int32
   */
  sort?: number
  /** 启用状态:Disabled(禁用)=0,Enabled(启用)=1 */
  enabled?: EnabledStatusEnum
  /**
   * 上级
   * @format uuid
   */
  parentId?: string | null
}

/** 视图列表查询 */
export interface ViewInfoSearchRequest {
  search?: AdvancedSearch
  keyword?: string | null
  filter?: AdvancedFilter
  /** 启用状态:Disabled(禁用)=0,Enabled(启用)=1 */
  enabled?: EnabledStatusEnum
}
