
declare type ComponentEnum = 'el-input'
declare type OperatorEnum =
  | 'Contains'
  | 'StartsWith'
  | 'EndsWith'
  | 'EQ'
  | 'NEQ'
  | 'LT'
  | 'LTE'
  | 'GT'
  | 'GTE'

declare type DynamicFilterInfo = {
  field: string
  operator: OperatorEnum
  value: string
  description: string
  defaultSelect: boolean
  componentName: ComponentEnum
}


// 审计记录相关字段定义
declare type AuditableRecord = {
	createdUserName?: string | null;
  modifiedUserName?:string|null;
	createdOn?: string | null;
	lastModifiedOn?: string | null;
	remark?: string | null;
};