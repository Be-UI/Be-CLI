module.exports = {
  syntax: 'postcss-scss',
  plugins: [
    require('autoprefixer')({
      overrideBrowserslist: [
        'Android 4.1',
        'iOS 7.1',
        'Chrome > 31',
        'ff > 31',
        'ie >= 8',
        'last 10 versions', // 所有主流浏览器最近10版本用
      ],
      grid: true,
    }),
    require('postcss-px-to-viewport-8-plugin')({
      unitToConvert: 'px',
      viewportWidth: 1080,
      unitPrecision: 5,
      propList: ['*'],
      viewportUnit: 'rem',
      fontViewportUnit: 'rem',
      selectorBlackList: [],
      minPixelValue: 1,
      mediaQuery: false,
      replace: true,
      exclude: [/node_modules/],
      include: undefined,
      landscape: undefined,
      landscapeUnit: 'vw',
      landscapeWidth: 1080,
    }),
  ],
}
