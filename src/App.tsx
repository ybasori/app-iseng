import GlobalState, {
  useDispatch,
  useSelector,
} from "./components/atoms/GlobalState";
import { useEffect } from "react";
import Redirect from "./components/atoms/Redirect/Redirect";
import Notif from "./components/atoms/Notif/Notif";
import { ErrorBoundary } from "./components/atoms/ErrorBoundary/ErrorBoundary";
import { usePathname } from "./hooks/usePathname";
import { router } from "./config/config";
import { match } from "path-to-regexp";

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
  const { route, auth } = useSelector();
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

    dispatch({
      type: `route/NAVIGATE`,
      payload: { current: pathname, ...nice, ...matchRoute },
    });
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
      <GlobalState>
        <Notif>
          <PageNavigate />
        </Notif>
      </GlobalState>
    </ErrorBoundary>
  );
}

export default App;
