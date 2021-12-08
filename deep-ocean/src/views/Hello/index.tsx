import { Outlet } from 'react-router'

export function Hello() {
  return (
    <div>
      Hello
      <br />
      <Outlet />
    </div>
  )
}
