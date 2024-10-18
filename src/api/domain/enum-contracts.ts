/** 数权范围 */
    export const DataPermissionScope = {
      All: { name: 'All', value: 1, desc: '全部',theme:'' },
      CurrentWithChildAndAffiliateDept: { name: 'CurrentWithChildAndAffiliateDept', value: 2, desc: '本部门加下级部门加附属部门',theme:'' },
      CurrentWithAffiliateDept: { name: 'CurrentWithAffiliateDept', value: 3, desc: '本部门加附属部门',theme:'' },
      CurrentWithChildDept: { name: 'CurrentWithChildDept', value: 4, desc: '本部门加下级部门',theme:'' },
      CurrentDept: { name: 'CurrentDept', value: 5, desc: '本部门',theme:'' },
      CurrentUserStaff: { name: 'CurrentUserStaff', value: 6, desc: '当前员工',theme:'' },
    }
/**  */
    export const FileSizeUnit = {
      Byte: { name: 'Byte', value: 0, desc: 'B',theme:'' },
      K: { name: 'K', value: 1, desc: 'KB',theme:'' },
      M: { name: 'M', value: 2, desc: 'MB',theme:'' },
      G: { name: 'G', value: 3, desc: 'GB',theme:'' },
    }
/** http状态码 */
    export const HttpStatusCode = {
      Status0NotOk: { name: 'Status0NotOk', value: 0, desc: '操作失败',theme:'' },
      Status200Ok: { name: 'Status200Ok', value: 200, desc: '操作成功',theme:'' },
      Status401Unauthorized: { name: 'Status401Unauthorized', value: 401, desc: '未登录',theme:'' },
      Status403Forbidden: { name: 'Status403Forbidden', value: 403, desc: '权限不足',theme:'' },
      Status404NotFound: { name: 'Status404NotFound', value: 404, desc: '资源不存在',theme:'' },
      Status500InternalServerError: { name: 'Status500InternalServerError', value: 500, desc: '系统内部错误',theme:'' },
    }
/** 密码加密类型 */
    export const PasswordEncryptType = {
      MD5Encrypt32: { name: 'MD5Encrypt32', value: 0, desc: '32位MD5加密',theme:'' },
      PasswordHasher: { name: 'PasswordHasher', value: 1, desc: '标准标识密码哈希',theme:'' },
    }
/** 租户类型 */
    export const TenantTypeEnum = {
      NormalTenant: { name: 'NormalTenant', value: 0, desc: '普通租户',theme:'' },
      PlatformTenant: { name: 'PlatformTenant', value: 1, desc: '平台租户',theme:'' },
    }
/** 职工类型 */
    export const UserStaffTypeEnum = {
      Normal: { name: 'Normal', value: 1, desc: '普通职工',theme:'' },
      TenantAdmin: { name: 'TenantAdmin', value: 10, desc: '租户管理员',theme:'' },
      PlatformAdmin: { name: 'PlatformAdmin', value: 100, desc: '平台管理员',theme:'' },
    }
/** 默认数据字典 */
    export const DefaultDataDictEnum = {
      Unit: { name: 'Unit', value: 0, desc: '单位',theme:'' },
    }
/** 启用状态 */
    export const EnabledStatusEnum = {
      Disabled: { name: 'Disabled', value: 0, desc: '禁用',theme:'info' },
      Enabled: { name: 'Enabled', value: 1, desc: '启用',theme:'success' },
    }
/** 性别 */
    export const GenderEnum = {
      Unknown: { name: 'Unknown', value: 0, desc: '未知',theme:'info' },
      Male: { name: 'Male', value: 1, desc: '男',theme:'warning' },
      Female: { name: 'Female', value: 2, desc: '女',theme:'success' },
    }
/** 机构类型 */
    export const OrganizeTypeEnum = {
      Company: { name: 'Company', value: 0, desc: '公司',theme:'' },
      Department: { name: 'Department', value: 1, desc: '部门',theme:'' },
      Group: { name: 'Group', value: 2, desc: '小组',theme:'' },
    }
/** 菜单路由类型 */
    export const MenuRouteTypeEnum = {
      Group: { name: 'Group', value: 1, desc: '分组',theme:'' },
      Menu: { name: 'Menu', value: 2, desc: '菜单',theme:'' },
    }
/** 地区级别 */
    export const RegionLevel = {
      Province: { name: 'Province', value: 1, desc: '省份',theme:'' },
      City: { name: 'City', value: 2, desc: '城市',theme:'' },
      County: { name: 'County', value: 3, desc: '县/区',theme:'' },
      Town: { name: 'Town', value: 4, desc: '乡镇/街道',theme:'' },
      Vilage: { name: 'Vilage', value: 5, desc: '村/社区',theme:'' },
    }