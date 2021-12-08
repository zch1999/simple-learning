import React from 'react'
import { Route } from 'react-router-dom'
import { routeType } from './routesConfig'

export function routeRender(routesConfig: routeType[]) {
  return routesConfig.map((item, index) => {
    const { path, component: Component } = item
    return <Route path={path} key={index} element={<Component />} />
  })
}
