import type { ComponentPublicInstance } from 'vue'

export type IOption = Record<string, any>

export interface IComponentProxy extends ComponentPublicInstance {
  $modal: any
  $tab: any
  $el: any
  $refs: Record<string, any>
  resetForm: Function
  cacheForm: Function
  addDateRange: Function
  download: Function
  useDict: Function
  handleTree: Function
  selectDictLabel: Function
  $download: {
    zip: Function
  }
}

export interface IFilterLabelValItem {
  labelId?: string
  labelName?: string
  labelNameCN?: string
  labelType?: string
}

export interface IFilterLbName extends IFilterLabelValItem {
  label?: string
}

export interface IFilterItem {
  labelName: IFilterLbName
  labelValue: Array<string>
  relateId: string
  loading: boolean
  filter: Array<IFilterItem>
  relationFilter: string
}

export interface IFilterItemOption {
  isFilter: boolean
  index: number
  filterIndex?: number
}

export interface IFilterFromConditions {
  labelId: string
  function: string
  labelName: string
  labelType: string
  params: Array<string>
}

export interface IFilterFromBase {
  conditions?: Array<IFilterFromConditions>
  relation?: string
}

export interface IFilerFrom extends IFilterFromBase {
  filters?: Array<IFilterFromBase>
}

export interface IRelationOption {
  label: string
  function: string
}

export interface LFItemHelper{
  getLabelValueLF: (labelId: string) => (any | Promise<any>)
  getLabelFunctionLF: (labelType: string) => (any | Promise<any>)
}
