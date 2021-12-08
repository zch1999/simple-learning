import ImgUpload from '../views/ImgUpload'
import { Hello } from '../views/Hello'

export interface routeType {
  path: string
  name?: string
  clildren?: routeType[]
  component?: any
}

export const routesConfig: routeType[] = [
  {
    path: '/hello',
    name: 'hello',
    component: Hello,
    clildren: [
      {
        path: '/hello/img',
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
