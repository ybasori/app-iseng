
export interface IRoute {
    path: string;
    method?: "get" | "post" | "put" | "patch" | "delete";
    middleware?: any[];
    controller?: any; 
    children?: IRoute[]
}

const onArrayForm = (
    name: string,
    data: IRoute[],
    obj: IRoute[],
    middlewares: any[]
) => {
  let newObj = [...obj];
  data.forEach((item) => {
    if (item.controller) {
      newObj = [
        ...newObj,
        {
          path: `${name !== "/" ? name : ""}${item.path}`,
          method: item.method,
          middleware: item.middleware
            ? [...middlewares, ...item.middleware]
            : [...middlewares],
          controller: item.controller,
        },
      ];
    }
    if (Array.isArray(item.children) || typeof item.children === "object") {
      newObj = onArrayForm(
        `${name !== "/" ? name : ""}${item.path}`,
        item.children,
        newObj,
        item.middleware
          ? [...middlewares, ...item.middleware]
          : [...middlewares]
      );
    }
  });
  return newObj;
};

/**
 * @typedef {{
 * path: string, 
 * method:"post",
 * middleware: any[],
 * controller: any,
 * children: IRoute[]
 * }} IRoute
 */

/**
 * 
 * @param {IRoute[]} data 
 * @returns 
 */


export const expandRouter = (data: IRoute[]) => {
  let obj:IRoute[]= [];
  data.forEach((item) => {
    if (item.controller) {
      obj = [
        ...obj,
        {
          path: item.path,
          method: item.method,
          middleware: item.middleware,
          controller: item.controller,
        },
      ];
    }
    if (Array.isArray(item.children) || typeof item.children === "object") {
      obj = onArrayForm(
        item.path,
        item.children,
        obj,
        item.middleware ? [...item.middleware] : []
      );
    }
  });
  return obj;
};

export const renderHtml = (payload?:{title?:string, reducer?: any}) => {
    const title = payload?.title ?? "Document";
    const reducer = payload?.reducer ?? "{}";

    return `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>${title}</title>
    <link rel="stylesheet" href="/bulma/bulma.min.css">
    <link rel="stylesheet" href="/fa/css/all.min.css">
      </head>
      <body>
        <div id="root"></div>
        <script>
      window.__PRELOADED_STATE__ = ${JSON.stringify(reducer)};
        </script>
        <script src="/assets/js/app.bundle.js"></script>
        <script src="/assets/js/runtime.bundle.js"></script>
      </body>
    </html>`
}