import type * as prompts from 'prompts'
import {BUILDLIBTYPE, CSSLIBTYPE, PROJECTTYPE, RUNENVTYPE, UILIBTYPE, UNITTESTLIBTYPE} from './enums'

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

export const uiLibTypeReactOptions = [{
  type: 'select',
  name: 'uiLibType',
  message: 'please select a ui component library',
  choices: ['ant design'].map((item, index) => {
    const valueDict = [UILIBTYPE.ANTD]
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

export const unitTestTypeOptions = [{
  type: 'select',
  name: 'unitTestLibType',
  message: 'please select a unit test library',
  choices: ['vitest', 'jest', 'Don\'t need'].map((item, index) => {
    const valueDict = [UNITTESTLIBTYPE.VITEST, UNITTESTLIBTYPE.JEST, 'no']
    // 选择时的标题和选择时的值
    return { title: item, value: valueDict[index] }
  }),
}] as prompts.PromptObject[]

export const buildLibTypeOptions = [{
  type: 'select',
  name: 'buildLibType',
  message: 'please choose your packaging tool',
  choices: ['tsup', 'rollup'].map((item, index) => {
    const valueDict = [BUILDLIBTYPE.TSUP, BUILDLIBTYPE.ROLLUP]
    // 选择时的标题和选择时的值
    return { title: item, value: valueDict[index] }
  }),
}] as prompts.PromptObject[]

export const envTypeOptions = [{
  type: 'select',
  name: 'envType',
  message: 'please select your library runtime environment',
  choices: ['node', 'browser'].map((item, index) => {
    const valueDict = [RUNENVTYPE.NODE, RUNENVTYPE.BROWSER]
    // 选择时的标题和选择时的值
    return { title: item, value: valueDict[index] }
  }),
}] as prompts.PromptObject[]

