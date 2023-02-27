// 配合使用webstorm插件作为本地校验吧

/**
 * feat：新功能
 * update：更新某功能
 * fix：修补某功能的bug
 * refactor：重构某个功能
 * optimize: 优化构建工具或运行时性能
 * style：仅样式改动
 * doc：仅文档新增/改动
 * chore：构建过程或辅助工具的变动
 */
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'update',
        'fix',
        'refactor',
        'optimize',
        'style',
        'doc',
        'chore',
      ],
    ],
  },
}
