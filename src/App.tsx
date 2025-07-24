// import GlobalState, {
//   useDispatch,
//   useSelector,
// } from "./components/atoms/GlobalState";
import { useEffect } from "react";
import Redirect from "./components/atoms/Redirect/Redirect";
import Notif from "./components/atoms/Notif/Notif";
import { ErrorBoundary } from "./components/atoms/ErrorBoundary/ErrorBoundary";
import { usePathname } from "./hooks/usePathname";
import { router } from "./_config/config";
import { match } from "path-to-regexp";
import FacebookProvider from "./components/atoms/FacebookProvier/FacebookProvider";


import { store } from './_states/store'
import { RootState } from './_states/types'
import { Provider, useDispatch, useSelector } from 'react-redux'
import { navigate } from "./_states/reducers/route/route.slice";

const Template: React.FC<{ Component?: any; children: React.ReactNode }> = ({
  Component,
  children,
}) => {
  if (!!Component) {
    return <Component>{children}</Component>;
  }
  return <>{children}</>;
};

const PageNavigate = () => {
  const route = useSelector((state: RootState) => (state.route));
  const auth = useSelector((state: RootState) => (state.auth));
  const dispatch = useDispatch();

  const pathname = usePathname();

  useEffect(() => {
    let matchPath = "/404";
    let matchRoute: any = null;

    for (let i = 0; i < Object.keys(router).length; i++) {
      const matcher = match(Object.keys(router)[i]);
      const result = matcher(pathname);

      if (!!result) {
        matchPath = Object.keys(router)[i];
        i = Object.keys(router).length;
        matchRoute = { ...result };
      }
    }

    const nice = router[matchPath as keyof typeof router];

    dispatch(navigate({ current: pathname, ...nice, ...matchRoute }));
  }, [dispatch, pathname]);

  // useEffect(() => {
  //   dispatch(navigate(window.location.pathname));
  // }, [dispatch]);

  if (!!route.component) {
    if (!!route.isProtected) {
      if (!!auth.userData) {
        return (
          <Template Component={route?.Template}>{route.component}</Template>
        );
      } else {
        return <Redirect to={"/login"} />;
      }
    }
    return <Template Component={route?.Template}>{route.component}</Template>;
  }
  return <>Not Found</>;
};

function App() {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <Notif>
          <FacebookProvider />
          <PageNavigate />
        </Notif>
        </Provider>
    </ErrorBoundary>
  );
}

export default App;
