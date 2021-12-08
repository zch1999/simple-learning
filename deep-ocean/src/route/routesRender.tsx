import { Route } from 'react-router-dom'
import { routeType } from './routesConfig'

export function routeRender(routesConfig: routeType[]) {
  return routesConfig.map((item, index) => {
    const { path, clildren, component: Component } = item
    return clildren && clildren.length>0 ? 
        <Route path={path} key={index} element={<Component />} >
          {routeRender(clildren)}
        </Route> :
     <Route path={path} key={index} element={<Component />} />
  })
}
