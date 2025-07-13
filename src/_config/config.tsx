import TemplateDefault from '@src/components/organisms/TemplateDefault/TemplateDefault';
import TemplateDashboard from '@src/components/organisms/TemplateDashboard/TemplateDashboard';

import Home from '@src/pages/Home/Home'
import About from '@src/pages/About/About';
import Login from '@src/pages/Login/Login';
import Dashboard from '@src/pages/Dashboard/Dashboard';
import Blog from '@src/pages/Dashboard/pages/Blog/Blog';
import Content from '@src/pages/Dashboard/pages/Blog/pages/Content/Content';
import Category from '@src/pages/Dashboard/pages/Blog/pages/Category/Category';
import CreateEditContent from '@src/pages/Dashboard/pages/Blog/pages/Content/pages/CreateEdit/CreateEdit';
import CategoryCreateEdit from '@src/pages/Dashboard/pages/Blog/pages/Category/page/CategoryCreateEdit';
import Tag from '@src/pages/Dashboard/pages/Blog/pages/Tag/Tag';
import TagCreateEdit from '@src/pages/Dashboard/pages/Blog/pages/Tag/page/TagCreateEdit';
import PublicBlogContent from '@src/pages/Blog/pages/Content/PublicBlogContent';

export interface IRoute{name: string; Template?: any; component: React.ReactNode; isProtected?:boolean}

export const router:{[path:string]:{name: string; Template?: any; component: React.ReactNode; isProtected?:boolean}} = {
  "/blog/content/:uid":{
    name: "Content",
    Template:TemplateDefault,
    component:<PublicBlogContent />
  },
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
  "/dashboard/blog/tag/edit/:uid": {
    name: "Tag Edit",
    isProtected: true,
    Template: TemplateDashboard,
    component: <TagCreateEdit isEdit />
  },
  "/dashboard/blog/tag/create": {
    name: "Tag Create",
    isProtected: true,
    Template: TemplateDashboard,
    component: <TagCreateEdit />
  },
  "/dashboard/blog/tag": {
    name: "Tag",
    isProtected: true,
    Template: TemplateDashboard,
    component: <Tag />
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
  "/": {
    name: "Home",
    Template: TemplateDefault,
    component: <Home />
  },
}

export const api = {
  PUBLIC_BLOG_CONTENT_LIST: "/api/blog/content",
  PUBLIC_BLOG_COMMENT_LIST: "/api/blog/comment",
  PUBLIC_BLOG_COMMENT_STORE: "/api/blog/comment/store",
  DASHBOARD_BLOG_CONTENT_LIST: "/api/dashboard/blog/content",
  DASHBOARD_BLOG_CONTENT_CREATE: "/api/dashboard/blog/content/create",
  DASHBOARD_BLOG_CONTENT_UPDATE: "/api/dashboard/blog/content/update",
  DASHBOARD_BLOG_CONTENT_DELETE: "/api/dashboard/blog/content/delete",
  DASHBOARD_BLOG_CATEGORY_LIST: "/api/dashboard/blog/category",
  DASHBOARD_BLOG_CATEGORY_CREATE: "/api/dashboard/blog/category/create",
  DASHBOARD_BLOG_CATEGORY_UPDATE: "/api/dashboard/blog/category/update",
  DASHBOARD_BLOG_CATEGORY_DELETE: "/api/dashboard/blog/category/delete",
  DASHBOARD_BLOG_TAG_LIST: "/api/dashboard/blog/tag",
  DASHBOARD_BLOG_TAG_CREATE: "/api/dashboard/blog/tag/create",
  DASHBOARD_BLOG_TAG_UPDATE: "/api/dashboard/blog/tag/update",
  DASHBOARD_BLOG_TAG_DELETE: "/api/dashboard/blog/tag/delete",
}