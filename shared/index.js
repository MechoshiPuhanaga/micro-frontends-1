export const resolveUrl = ({ currentPath, routes }) => {
  if (typeof currentPath === "undefined" || !Array.isArray(routes)) {
    throw new Error("Invalid arguments!");
  }

  let baseUrl = currentPath;

  for (let route of routes) {
    const lastIndexOfRoute = currentPath.lastIndexOf(route);

    if (lastIndexOfRoute !== -1) {
      baseUrl = currentPath.slice(0, lastIndexOfRoute);

      break;
    }
  }

  if (baseUrl.slice(-1) !== "/") {
    baseUrl = `${baseUrl}/`;
  }

  const paths = routes.reduce((accum, route) => {
    accum[route] = `${baseUrl}${route}`;

    return accum;
  }, {});

  return { paths };
};
