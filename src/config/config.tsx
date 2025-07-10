import Home from '../pages/Home/Home'
import About from '../pages/About/About';
import Login from '../pages/Login/Login';
import TemplateLoggedIn from '../components/organisms/TemplateLoggedIn/TemplateLoggedIn';
import TemplateDefault from '../components/organisms/TemplateLoggedIn/TemplateLoggedIn';
import Dashboard from '../pages/Dashboard/Dashboard';
import TemplateDashboard from '../components/organisms/TemplateDashboard/TemplateDashboard';
import Blog from '../pages/Dashboard/pages/Blog/Blog';
import Content from '../pages/Dashboard/pages/Blog/pages/Content/Content';
import Create from '@src/pages/Dashboard/pages/Blog/pages/Content/pages/Create/Create';

export interface IRoute{name: string; Template?: any; component: React.ReactNode; isProtected?:boolean}

export const router:{[path:string]:{name: string; Template?: any; component: React.ReactNode; isProtected?:boolean}} = {
  "/dashboard/blog/content/create": {
    name: "Create Content",
    isProtected: true,
    Template: TemplateDashboard,
    component: <Create />
  },
  "/dashboard/blog/content": {
    name: "Content",
    isProtected: true,
    Template: TemplateDashboard,
    component: <Content />
  },
  "/dashboard/blog": {
    name: "Blog",
    isProtected: true,
    Template: TemplateDashboard,
    component: <Blog />
  },
  "/dashboard": {
    name: "Dashboard",
    isProtected: true,
    Template: TemplateDashboard,
    component: <Dashboard />
  },
  "/profile": {
    name: "Profile",
    Template: TemplateLoggedIn,
    component: <About />
  },
  "/about": {
    name: "About",
    Template: TemplateDefault,
    component: <About />
  },
  "/login": {
    name: "Login",
    component: <Login />
  },
  "/404": {
    name: "404",
    component: <>NOT FOUND</>
  },
  "/t/:id": {
    name: "t",
    component: <>iki</>
  },
  "/": {
    name: "Home",
    Template: TemplateDefault,
    component: <Home />
  },
}
