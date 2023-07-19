import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import ResponsiveDrawer from './layout/layout';
import { Suspense, useEffect, useState } from 'react';
import Login from './pages/login';
import globalvariable from './service/globalvariable'


function App(props) {
  const [stores, setStores] = useState(null); 
  // eslint-disable-next-line
  useEffect(() => {
    if(localStorage.getItem("access_token")){
      const dt = {
        token: localStorage.getItem("access_token"),
        users: JSON.parse(localStorage.getItem("user")),
        url: globalvariable.getUrl(),
        prevurl: '',
        permission: localStorage.getItem('permission').split(",")
      }
      setStores(dt)
      props.fetchRoles(dt);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const Redupdateusers = async() => {

  }

  useEffect(() => {
    if(props.data){
      localStorage.removeItem('permission');
      localStorage.setItem('permission', props.data);
      const newobj = {
        permission: props.data,
        token: localStorage.getItem("access_token"),
        users: JSON.parse(localStorage.getItem("user")),
        url: globalvariable.getUrl(),
        prevurl: '',
      }
      setStores(newobj);

    }
  }, [props.data])
  const clickMe = (obj) => {
    setStores(obj)
  }
  return (
    <BrowserRouter>
    <Routes stores={stores}>
    <Route exact path="/login" name="Login Page" element={<Suspense><Login clickMe={clickMe} /></Suspense>} />
      <Route path="*" name="Home" stores={stores}  element={
        <ResponsiveDrawer getusers={Redupdateusers} stores={stores} />}
      />
    </Routes>
</BrowserRouter>
  //  <ResponsiveDrawer />
  );
}


export default App;