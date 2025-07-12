import Home from '../pages/Home/Home'
import About from '../pages/About/About';
import Login from '../pages/Login/Login';
import TemplateLoggedIn from '../components/organisms/TemplateLoggedIn/TemplateLoggedIn';
import TemplateDefault from '../components/organisms/TemplateLoggedIn/TemplateLoggedIn';
import Dashboard from '../pages/Dashboard/Dashboard';
import TemplateDashboard from '../components/organisms/TemplateDashboard/TemplateDashboard';
import Blog from '../pages/Dashboard/pages/Blog/Blog';
import Content from '../pages/Dashboard/pages/Blog/pages/Content/Content';
import CreateEditContent from '@src/pages/Dashboard/pages/Blog/pages/Content/pages/CreateEdit/CreateEdit';
import Category from '@src/pages/Dashboard/pages/Blog/pages/Category/Category';
import CategoryCreateEdit from '@src/pages/Dashboard/pages/Blog/pages/Category/page/CategoryCreateEdit';

export interface IRoute{name: string; Template?: any; component: React.ReactNode; isProtected?:boolean}

export const router:{[path:string]:{name: string; Template?: any; component: React.ReactNode; isProtected?:boolean}} = {
  "/dashboard/blog/content/edit/:uid": {
    name: "Edit Content",
    isProtected: true,
    Template: TemplateDashboard,
    component: <CreateEditContent isEdit />
  },
  "/dashboard/blog/content/create": {
    name: "Create Content",
    isProtected: true,
    Template: TemplateDashboard,
    component: <CreateEditContent />
  },
  "/dashboard/blog/content": {
    name: "Content",
    isProtected: true,
    Template: TemplateDashboard,
    component: <Content />
  },
  "/dashboard/blog/category/edit/:uid": {
    name: "Edit Category",
    isProtected: true,
    Template: TemplateDashboard,
    component: <CategoryCreateEdit isEdit />
  },
  "/dashboard/blog/category/create": {
    name: "Create Category",
    isProtected: true,
    Template: TemplateDashboard,
    component: <CategoryCreateEdit />
  },
  "/dashboard/blog/category": {
    name: "Category",
    isProtected: true,
    Template: TemplateDashboard,
    component: <Category />
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
