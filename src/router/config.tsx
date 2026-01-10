import type { RouteObject } from "react-router-dom";
import NotFound from "../pages/NotFound";
import Home from "../pages/home/page";
import Contact from "../pages/contact/page";
import About from "../pages/about/page";
import Cases from "../pages/cases/page";
import SimulatorPage from "../pages/simulator/page";
import AIDevelopmentPage from "../pages/ai-development/page";
import QualityAssurancePage from "../pages/quality-assurance/page";
import Blog from "../pages/blog/page";
import BlogPost from "../pages/blog/[slug]/page";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/contact",
    element: <Contact />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/cases",
    element: <Cases />,
  },
  {
    path: "/blog",
    element: <Blog />,
  },
  {
    path: "/blog/:slug",
    element: <BlogPost />,
  },
  {
    path: "/simulator",
    element: <SimulatorPage />,
  },
  {
    path: "/ai-development",
    element: <AIDevelopmentPage />,
  },
  {
    path: "/quality-assurance",
    element: <QualityAssurancePage />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export default routes;
