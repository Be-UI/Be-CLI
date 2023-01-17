// 处理主题样式
export function handleThemeStyle(theme: string) {
  document.documentElement.style.setProperty('--el-color-primary', theme)
  for (let i = 1; i <= 9; i++) {
    document.documentElement.style.setProperty(
      `--el-color-primary-light-${i}`,
      `${getLightColor(theme, i / 10)}`,
    )
  }
  for (let i = 1; i <= 9; i++) {
    document.documentElement.style.setProperty(
      `--el-color-primary-dark-${i}`,
      `${getDarkColor(theme, i / 10)}`,
    )
  }
}

// hex颜色转rgb颜色
export function hexToRgb(str: string) {
  str = str.replace('#', '')
  const hexs: RegExpMatchArray | null = str.match(/../g)
  if (hexs) {
    for (let i = 0; i < 3; i++)
      hexs[i] = String(parseInt(hexs[i], 16))
  }
  return hexs
}

// rgb颜色转Hex颜色
export function rgbToHex(r: number, g: number, b: number) {
  const hexs = [r.toString(16), g.toString(16), b.toString(16)]
  for (let i = 0; i < 3; i++) {
    if (hexs[i].length === 1)
      hexs[i] = `0${hexs[i]}`
  }
  return `#${hexs.join('')}`
}

// 变浅颜色值
export function getLightColor(color: string, level: number) {
  const rgb = hexToRgb(color)
  if (rgb) {
    for (let i = 0; i < 3; i++)
      rgb[i] = String(Math.floor(Number((255 - Number(rgb[i])) * level + rgb[i])))

    return rgbToHex(Number(rgb[0]), Number(rgb[1]), Number(rgb[2]))
  }
}

// 变深颜色值
export function getDarkColor(color: string, level: number) {
  const rgb = hexToRgb(color)
  if (rgb) {
    for (let i = 0; i < 3; i++)
      rgb[i] = String(Math.floor(Number(rgb[i]) * (1 - level)))

    return rgbToHex(Number(rgb[0]), Number(rgb[1]), Number(rgb[2]))
  }
}
