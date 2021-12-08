import ImgUpload from '../views/ImgUpload'
import { Hello } from '../views/Hello'

export interface routeType {
  path: string
  name?: string
  routes?: routeType[]
  component?: any
}

export const routesConfig: routeType[] = [
  {
    path: '/hello',
    name: 'hello',
    component: Hello,
    routes: [
      {
        path: '/img',
        name: 'img-load',
        component: ImgUpload
      }
    ]
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
