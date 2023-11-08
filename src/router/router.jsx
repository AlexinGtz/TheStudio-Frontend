import { Login } from "../pages/Login/Login";
import { Outlet, createBrowserRouter } from "react-router-dom";
import { Root } from "../Root";
import { UserMainPage } from "../pages/UserMainPAge/UserMainPage";
import { Banner } from "../components/Banner/Banner";
import { MenuBar } from "../components/MenuBar/MenuBar";
import { Packages } from "../pages/Packages/Packages";
import { Profile } from "../pages/Profile/Profile";
import { Users } from "../pages/Users/Users";
import { PackagesAdmin } from "../pages/PackagesAdmin/PackagesAdmin";
import { ErrorPage } from "../pages/ErrorPage/ErrorPage";
import { PhantomDiv } from "../components/PhantomDiv/PhantomDiv";
import { ClassDetails } from "../pages/ClassDetails/ClassDetails";
import { Register } from "../pages/Register/Register";
import { UserDetails } from "../pages/UserDetails/UserDetail";
import { AssignPackage } from "../pages/AssignPackage/AssignPackage";
import { UpdatePassword } from "../pages/UpdatePassword/UpdatePassword";
import { EditPackage } from "../pages/EditPackage/EditPackage";
import { StudioCalendar } from "../pages/StudioCalendar/StudioCalendar";

export const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Root>
          <Outlet />
        </Root>
        ),
      errorElement: (
        <>
          <Banner />
          <ErrorPage />
        </>
      ),
      children: [
        {
          path: "/login",
          element: (
            <>
              <Login />
            </>
            ),
        },
        {
          path: "/Register",
          element: (
            <>
              <Register />
            </>
            ),
        },
        {
          path: "/",
          element: (
            <>
              <Banner />
                <Outlet />
                <PhantomDiv />
              <MenuBar />
            </>
            ),
          errorElement: (
            <>
              <ErrorPage />
            </>
          ),
          children: [
            {
              path: "/",
              element: (
                <>
                  <UserMainPage />
                </>
                ),
            },
            {
              path: "/calendar",
              element: (
                <>
                    <StudioCalendar />
                </>
                ),
            },
            {
              path: "/packages",
              element: (
                <>
                    <Packages />
                </>
                ),
            },
            {
              path: "/admin-packages",
              element: (
                <>
                    <PackagesAdmin />
                </>
                ),
            },
            {
              path: "/profile",
              element: (
                <>
                    <Profile />
                </>
                ),
            },
            {
              path: "/users",
              element: (
                <>
                    <Users />
                </>
                ),
            },
            {
              path: "/class/:classId",
              element: (
                <>
                    <ClassDetails />
                </>
                ),
            },
            {
              path: "/assignPackage/:userPhoneNumber",
              element: (
                <>
                    <AssignPackage />
                </>
                ),
            },
            {
              path: "/user/:userPhoneNumber",
              element: (
                <>
                    <UserDetails />
                </>
                ),
            },
            {
              path: "/updatePassword",
              element: (
                <>
                    <UpdatePassword />
                </>
                ),
            },
            {
              path: "/package/:packageId",
              element: (
                <>
                    <EditPackage />
                </>
                ),
            },
          ],
        }
      ]
    }
  ]);