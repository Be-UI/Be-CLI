import { viteImgCompress } from 'unplugin-img-compress'
export default function createImgCompress() {
  return viteImgCompress({
    APIKey: 'kZgn8pxfdjQjKFmf2StLq7CY4TqMgs0T',
    dir: '', // runtime = build 时无用，图片直接从钩子里取, 这里直接传空
    runtime: 'build',
    mode: 'once',
  })
}
