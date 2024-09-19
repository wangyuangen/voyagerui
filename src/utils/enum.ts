type EnumType = {
    [key: string]: {
      name: string
      value: number | string // 枚举值可以是数字或字符串
      desc: string,
      theme:string
    }
  }
  
  // 下拉选项的接口
  interface DropdownOption {
    label: string
    value: string | number,
    theme:string
  }
  
  /** 根据枚举 name 查找描述 */
  export function getDescByName<T extends EnumType, K extends keyof T>(enumObj: T, key: K): string | undefined {
    return enumObj[key]?.desc || ''
  }
  
  /** 根据枚举 value 查找描述 */
  export function getDescByValue<T extends EnumType>(enumObj: T, value: T[keyof T]['value']): string | undefined {
    for (const [key, item] of Object.entries(enumObj)) {
      if (item.value === value) {
        return item.desc
      }
    }
    return ''
  }

    /** 根据枚举 value 查找主题样式 */
  export function getThemeByValue<T extends EnumType>(enumObj:T,value:T[keyof T]['value']):string | undefined{
    for (const [key, item] of Object.entries(enumObj)) {
      if (item.value === value) {
        return item.theme;
      }
    }
    return ''
  }
  
  /** 枚举转换为列表（使用值作为value） */
  export function toOptionsByValue<T extends EnumType>(enumObj: T): DropdownOption[] {
    return Object.values(enumObj).reduce((options, item) => {
      options.push({ label: item.desc, value: item.value,theme:item.theme })
      return options
    }, [] as DropdownOption[])
  }
  
  /** 枚举转换为列表（使用名称作为value） */
  export function toOptionsByName<T extends EnumType>(enumObj: T): DropdownOption[] {
    return Object.values(enumObj).reduce((options, item) => {
      options.push({ label: item.desc, value: item.name,theme:item.theme })
      return options
    }, [] as DropdownOption[])
  }
  
  export default {
    getDescByName,
    getDescByValue,
    toOptionsByName,
    toOptionsByValue,
    getThemeByValue
  }
  