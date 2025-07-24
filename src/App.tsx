import Notif from "./components/atoms/Notif/Notif";
import { ErrorBoundary } from "./components/atoms/ErrorBoundary/ErrorBoundary";
import FacebookProvider from "./components/atoms/FacebookProvier/FacebookProvider";

import { store } from "./_states/store";
import { Provider } from "react-redux";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import PublicBlog from "./pages/Blog/PublicBlog";
import Login from "./pages/Login/Login";
import About from "./pages/About/About";
import Dashboard from "./pages/Dashboard/Dashboard";
import PrivateRoute from "./components/atoms/PrivateRoute/PrivateRoute";

function App() {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <Notif>
          <FacebookProvider />
          <Router>
            <Switch>
              <PrivateRoute path="/dashboard">
                <Dashboard />
              </PrivateRoute>
              <Route path="/about">
                <About />
              </Route>
              <Route path="/login">
                <Login />
              </Route>
              <Route path="/blog">
                <PublicBlog />
              </Route>
              <Route path="/">
                <Home />
              </Route>
            </Switch>
          </Router>
        </Notif>
      </Provider>
    </ErrorBoundary>
  );
}

export default App;
