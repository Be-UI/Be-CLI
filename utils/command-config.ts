import * as prompts from 'prompts'
import {PROJECTTYPE, UILIBTYPE, CSSLIBTYPE} from "./enums";

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

export const uiTypeOptions = [{
  type: 'select',
  name: 'uiType',
  message: 'please choose to use ui component library or css atom library',
  choices: ['ui component library', 'css atom library'].map((item, index) => {
    const valueDict = ['ui', 'css']
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
  name: 'uiLibType',
  message: 'please select a css atom library',
  choices: ['windicss', 'unocss'].map((item, index) => {
    const valueDict = [CSSLIBTYPE.WINDICSS, CSSLIBTYPE.UNOCSS]
    // 选择时的标题和选择时的值
    return { title: item, value: valueDict[index] }
  }),
}] as prompts.PromptObject[]
