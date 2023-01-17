/**
 * 通用js方法封装处理
 * Copyright (c) 2019 ruoyi
 */

// 日期格式化
export function parseTime(time: unknown, pattern?: string) {
  if (arguments.length === 0 || !time)
    return '-'

  const format = pattern || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time as Date
  } else {
    if (typeof time === 'string' && /^[0-9]+$/.test(time)) {
      time = parseInt(time)
    } else if (typeof time === 'string') {
      time = time
        .replace(/-/gm, '/')
        .replace('T', ' ')
        .replace(/\.[\d]{3}/gm, '')
    }
    if (typeof time === 'number' && time.toString().length === 10)
      time = time * 1000

    date = new Date(time as string)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay(),
  }
  const timeStr = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result: string, key: string): string => {
    let value = formatObj[key as keyof typeof formatObj].toString()
    // Note: getDay() returns 0 on Sunday
    if (key === 'a')
      return ['日', '一', '二', '三', '四', '五', '六'][Number(value)]

    if (result.length > 0 && Number(value) < 10)
      value = `0${value}`

    return value || '0'
  })
  return timeStr
}

// 表单重置
export function resetForm(refName: string) {
  if (this.$refs[refName])
    this.$refs[refName].resetFields()
}

// 添加日期范围
export function addDateRange(params: any, dateRange: Array<any>, propName: string) {
  const search = params
  search.params
    = typeof search.params === 'object' && search.params !== null && !Array.isArray(search.params)
      ? search.params
      : {}
  dateRange = Array.isArray(dateRange) ? dateRange : []
  if (typeof propName === 'undefined') {
    search.params.beginTime = dateRange[0]
    search.params.endTime = dateRange[1]
  } else {
    search.params[`begin${propName}`] = dateRange[0]
    search.params[`end${propName}`] = dateRange[1]
  }
  return search
}

// 回显数据字典
export function selectDictLabel(datas: any, value: string) {
  if (value === undefined)
    return ''

  const actions = []
  Object.keys(datas).some((key) => {
    if (datas[key].value === `${value}`) {
      actions.push(datas[key].label)
      return true
    }
    return false
  })
  if (actions.length === 0)
    actions.push(value)

  return actions.join('')
}

// 回显数据字典（字符串数组）
export function selectDictLabels(datas: any, value: string, separator: string) {
  if (value === undefined)
    return ''

  const actions: Array<any> = []
  const currentSeparator = undefined === separator ? ',' : separator
  const temp = value.split(currentSeparator)
  Object.keys(value.split(currentSeparator)).forEach((val) => {
    let match = false
    Object.keys(datas).forEach((key) => {
      if (datas[key].value === `${temp[val as keyof typeof temp]}`) {
        actions.push(datas[key].label + currentSeparator)
        match = true
      }
    })
    if (!match)
      actions.push(temp[val as keyof typeof temp] + currentSeparator)
  })
  return actions.join('').substring(0, actions.join('').length - 1)
}

// 字符串格式化(%s )
export function sprintf(str: string, ...argum: any[]) {
  const args = [str].concat(argum)
  let flag = true
  let i = 1
  str = str.replace(/%s/g, () => {
    const arg = args[i++]
    if (typeof arg === 'undefined') {
      flag = false
      return ''
    }
    return arg
  })
  return flag ? str : ''
}

// 转换字符串，undefined,null等转化为""
export function parseStrEmpty(str: string) {
  if (!str || str === 'undefined' || str === 'null')
    return ''

  return str
}

// 数据合并
export function mergeRecursive(source: any, target: any) {
  for (const p in target) {
    try {
      if (target[p].constructor === Object)
        source[p] = mergeRecursive(source[p], target[p])
      else
        source[p] = target[p]
    } catch (e) {
      source[p] = target[p]
    }
  }
  return source
}

/**
 * 构造树型结构数据
 * @param {*} data 数据源
 * @param {*} id id字段 默认 'id'
 * @param {*} parentId 父节点字段 默认 'parentId'
 * @param {*} children 孩子节点字段 默认 'children'
 */
export function handleTree(data: any, id: string, parentId: string, children: Array<any>) {
  const config = {
    id: id || 'id',
    parentId: parentId || 'parentId',
    childrenList: children || 'children',
  }

  const childrenListMap = {}
  const nodeIds = {}
  const tree = []

  for (const d of data) {
    const parentId = d[config.parentId]
    if (childrenListMap[parentId as keyof typeof childrenListMap] == null)
      (childrenListMap[parentId as keyof typeof childrenListMap] as Array<any>) = []

    // @ts-expect-error 这个写法太难改了
    nodeIds[d[config.id]] = d
    ;(childrenListMap[parentId as keyof typeof childrenListMap] as Array<any>).push(d)
  }

  for (const d of data) {
    const parentId = d[config.parentId]
    if (nodeIds[parentId as keyof typeof nodeIds] == null)
      tree.push(d)
  }

  for (const t of tree)
    adaptToChildrenList(t)

  function adaptToChildrenList(o: Array<any>) {
    // @ts-expect-error 这个写法太难改了
    if (childrenListMap[o[config.id]] !== null) {
      // @ts-expect-error 这个写法太难改了
      o[config.childrenList] = childrenListMap[o[config.id]]
    }
    // @ts-expect-error 这个写法太难改了
    if (o[config.childrenList]) {
      // @ts-expect-error 这个写法太难改了
      for (const c of o[config.childrenList])
        adaptToChildrenList(c)
    }
  }
  return tree
}

/**
 * 参数处理
 * @param {*} params  参数
 */
export function tansParams(params: any) {
  let result = ''
  for (const propName of Object.keys(params)) {
    const value = params[propName]
    const part = `${encodeURIComponent(propName)}=`
    if (value !== null && value !== '' && typeof value !== 'undefined') {
      if (typeof value === 'object') {
        for (const key of Object.keys(value)) {
          if (value[key] !== null && value[key] !== '' && typeof value[key] !== 'undefined') {
            const params = `${propName}[${key}]`
            const subPart = `${encodeURIComponent(params)}=`
            result += `${subPart + encodeURIComponent(value[key])}&`
          }
        }
      } else {
        result += `${part + encodeURIComponent(value)}&`
      }
    }
  }
  return result
}

// 返回项目路径
export function getNormalPath(p: string) {
  if (p.length === 0 || !p || p === 'undefined')
    return p

  const res = p.replace('//', '/')
  if (res[res.length - 1] === '/')
    return res.slice(0, res.length - 1)

  return res
}

// 验证是否为blob格式
export async function blobValidate(data: Blob) {
  try {
    const text = await data.text()
    JSON.parse(text)
    return false
  } catch (error) {
    return true
  }
}

export function toPrecision(num: number, precision = 0): number {
  // 这里在做乘法运算时要使用toFixed去四舍五入，防止精度丢失问题，比如1.255*100 !== 125.5

  return parseFloat(
    String(Math.round(num * parseFloat((10 ** precision).toFixed(precision))) / 10 ** precision),
  )
}
// 逗号转化
export const numberToCommaString = (nStr: number, decimal = 6): string => {
  const text = `${nStr}`
  const x: Array<string> = text.split('.') // 按照小数点分隔
  let x1: string = x[0] // 整数部分
  const x2: string = x.length > 1 ? `.${x[1]}` : '' // 小数部分
  const rgx = /(\d+)(\d{3})/ // 正则式定义
  while (rgx.test(x1)) {
    // 正则式匹配
    x1 = x1.replace(rgx, '$1' + ',' + '$2') // 正则式替换
  }

  return x1 + x2.slice(0, decimal + 1)
}

/**
 * 除法
 * @param num1
 * @param num2
 */
export function numDivision(num1: number, num2: number) {
  let baseNum1 = 0
  let baseNum2 = 0
  try {
    baseNum1 = num1.toString().split('.')[1].length
  } catch (e) {
    baseNum1 = 0
  }
  try {
    baseNum2 = num2.toString().split('.')[1].length
  } catch (e) {
    baseNum2 = 0
  }
  const baseNum3 = Number(num1.toString().replace('.', ''))
  const baseNum4 = Number(num2.toString().replace('.', ''))
  return (baseNum3 / baseNum4) * 10 ** (baseNum2 - baseNum1)
}

export function jsonClone(val: any) {
  return JSON.parse(JSON.stringify(val))
}

export const isEmptyObj = (item: unknown): boolean => JSON.stringify(item) === '{}'
