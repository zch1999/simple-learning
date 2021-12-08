import ImgUpload from '../views/ImgUpload'

export interface routeType {
  path: string
  name?: string
  component: any
}

export const routesConfig: routeType[] = [
  {
    path: '/img',
    name: 'img-load',
    component: ImgUpload
  }
  //   {
  //     path: '/channel',
  //     name: 'channel',
  //     Component: Channel
  //   },
  //   {
  //     path: '/detail',
  //     name: 'detail',
  //     Component: Detail
  //   }
]
