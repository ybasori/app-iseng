import authController from "./controllers/authController";
import blogController from "./controllers/blogController";
import homeController from "./controllers/homeController";
import { IRoute } from "./helper";

const routes: IRoute[] = [{
    path: "/",
    method: "get",
    controller: homeController.index,
}, {
    path: "/api",
    children: [{
        path: "/login",
        method: "post",
        controller: authController.login
    }, {
        path: "/logout",
        method: "post",
        controller: authController.logout
    }, {
        path: "/blog",
        children: [{
            path: "/content",
            children: [{
                path: "/create",
                method: "post",
                controller: blogController.createContent
            }]
        }]
    },]
}, {
    path: "/{*any}",
    method: "get",
    controller: homeController.any
}]


export default routes;