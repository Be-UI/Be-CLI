import type * as prompts from 'prompts'
import { CSSLIBTYPE, PROJECTTYPE, UILIBTYPE } from './enums'

export const projectNameOptions = [{
  type: 'text',
  name: 'projectName',
  message: 'please input your project name',
}] as prompts.PromptObject[]

export const projectTypeOptions = [{
  type: 'select',
  name: 'projectType',
  message: 'please select a template type',
  choices: ['vue + vite template', 'react + vite template', 'lib template'].map((item, index) => {
    const valueDict = [PROJECTTYPE.VUE, PROJECTTYPE.REACT, PROJECTTYPE.LIB]
    // 选择时的标题和选择时的值
    return { title: item, value: valueDict[index] }
  }),
}] as prompts.PromptObject[]

export const uiLibTypeOptions = [{
  type: 'select',
  name: 'uiLibType',
  message: 'please select a ui component library',
  choices: ['element-plus', 'ant design vue'].map((item, index) => {
    const valueDict = [UILIBTYPE.ELEMENT, UILIBTYPE.ANTD]
    // 选择时的标题和选择时的值
    return { title: item, value: valueDict[index] }
  }),
}] as prompts.PromptObject[]

export const cssLibTypeOptions = [{
  type: 'select',
  name: 'cssLibType',
  message: 'please select a css atom library',
  choices: ['windicss', 'unocss', 'Don\'t need'].map((item, index) => {
    const valueDict = [CSSLIBTYPE.WINDICSS, CSSLIBTYPE.UNOCSS, 'no']
    // 选择时的标题和选择时的值
    return { title: item, value: valueDict[index] }
  }),
}] as prompts.PromptObject[]
