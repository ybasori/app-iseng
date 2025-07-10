
import GlobalState, { useDispatch, useSelector } from './components/atoms/GlobalState';
import { useEffect } from 'react';
import { navigate } from './_states/reducers/route/route.action';
import Redirect from './components/atoms/Redirect/Redirect';
import Notif from './components/atoms/Notif/Notif';


const Template:React.FC<{Component?: any; children: React.ReactNode}> = ({Component, children}) => {
  if(!!Component){
    return <Component>{children}</Component>
  }
  return <>{children}</>
}

const PageNavigate = () => {
  const {route, auth} = useSelector();
  const dispatch = useDispatch();

  useEffect(()=>{
      dispatch(navigate(window.location.pathname));
  },[]);


  if(!!route.component){
    
    if(!!route.isProtected ){
      if(!!auth.userData){
        return <Template Component={route?.Template}>{route.component}</Template>
      }
      else{
        return <Redirect to={"/login"} />
      }

    }
    return <Template Component={route?.Template}>{route.component}</Template>
  }
    return <>Not Found</>


}


function App() {

  return (
    <GlobalState>
      <Notif>
      <PageNavigate />
      </Notif>
    </GlobalState>
  )
}

export default App
