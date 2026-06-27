import { createBrowserRouter } from "react-router-dom";

import Home from "./views/home";
import Page from "./views/Page";
import NotFound from "./views/notFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/:slug",
    element: <Page />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
