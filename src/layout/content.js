import { Route, Routes } from 'react-router-dom'
import routes from '../routes';

const Contents = (props) => {
    return(<>
         <Routes getusers={props.getusers} stores={props.stores}>
          {routes.map((route, idxrt) => {
            return (
              route.element && (
                <Route
                  key={idxrt}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  stores={props.stores}
                  getusers={props.getusers}
                  element={<route.element getusers={props.getusers} stores={props.stores}/>}
                />
              )
            )
          })}
        </Routes>
    </>)
}
export default Contents;