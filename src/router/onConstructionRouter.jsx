import { createBrowserRouter } from "react-router-dom";
import { SiteOnConstruction } from "../pages/SiteOnConstruction/SiteOnConstruction";
import { Banner } from "../components/Banner/Banner";

export const onConstructionRouter = createBrowserRouter([
    {
        path: "/",
        element: (
        <>
            <Banner />
            <SiteOnConstruction />
        </>
        ),
        errorElement: (
        <>
            <Banner />
            <SiteOnConstruction />
        </>
        ),
    }
  ]);