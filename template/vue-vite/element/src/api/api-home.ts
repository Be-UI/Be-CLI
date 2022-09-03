import request from '../utils/fetch'
interface IHome {
  appKey?: string
}
export async function getHomeData(params: IHome) {
  const res = await request('home/data', {
    params,
  })
  return res
}
