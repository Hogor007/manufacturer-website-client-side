import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import auth from "../../firebase.init";
import "./Dashboard.css";

const Dashboard = () => {
  const { pathname } = useLocation();
  const [authUser] = useAuthState(auth);
  const [user, setUser] = useState({});
  console.log(user);
  useEffect(() => {
    fetch(`https://enigmatic-beyond-17898.herokuapp.com/user/${authUser?.email}`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        email: `${authUser?.email}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setUser(data);
      });
  }, [authUser?.email]);

  const [showDashboard, setShowDashboard] = useState(false);
  console.log(showDashboard);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  console.log(windowWidth);

  const handleShowDashboard = () => {
    setShowDashboard((prevState) => !prevState);
  };

  // Trigger change of window width with useEffect

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [windowWidth]);

  return (
    <div>
      <button
        onClick={handleShowDashboard}
        className="d-block btn btn-primary my-5 mx-auto  d-lg-none"
      >
        {showDashboard ? "Hide Sections" : "Show Sections"}
      </button>

      <div className="my-5 d-flex">
        <div
          className={
            windowWidth > 768
              ? `dashboard-sidebar shadow  ms-5 mb-5 pt-5 d-lg-block d-none`
              : showDashboard
                ? `d-block visible-sidebar shadow-lg`
                : `d-none hidden-sidebar`
          }
        >
          {!user?.role ? (
            <div>
              <div className="d-flex justify-content-center">
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? `dashboard-active-link `
                      : `dashboard-inactive-link `
                  }
                  to="/dashboard/my-orders"
                >
                  My Orders
                </NavLink>
              </div>
            </div>
          ) : null}
          {!user?.role ? (
            <div>
              <div className="d-flex justify-content-center">
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? `dashboard-active-link  my-4`
                      : `dashboard-inactive-link my-4 `
                  }
                  to="/dashboard/add-review"
                >
                  Add Review
                </NavLink>
              </div>
            </div>
          ) : null}
          <div className="d-flex justify-content-center">
            <NavLink
              className={({ isActive }) =>
                isActive ? `dashboard-active-link ` : `dashboard-inactive-link `
              }
              to="/dashboard/my-profile"
            >
              My Profile
            </NavLink>
          </div>
          <div>
            {user?.role === "admin" ? (
              <div className="d-flex justify-content-center">
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? `dashboard-active-link mt-4`
                      : `dashboard-inactive-link mt-4`
                  }
                  to="/dashboard/manage-orders"
                >
                  Manage Orders
                </NavLink>
              </div>
            ) : null}
          </div>
          <div>
            {user?.role === "admin" ? (
              <div className="d-flex justify-content-center">
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? `dashboard-active-link mt-4`
                      : `dashboard-inactive-link mt-4`
                  }
                  to="/dashboard/add-product"
                >
                  Add Product
                </NavLink>
              </div>
            ) : null}
          </div>
          <div>
            {user?.role === "admin" ? (
              <div className="d-flex justify-content-center">
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? `dashboard-active-link mt-4`
                      : `dashboard-inactive-link mt-4`
                  }
                  to="/dashboard/make-admin"
                >
                  Make Admin
                </NavLink>
              </div>
            ) : null}
          </div>
          <div>
            {user?.role === "admin" ? (
              <div className="d-flex justify-content-center">
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? `dashboard-active-link mt-4`
                      : `dashboard-inactive-link mt-4`
                  }
                  to="/dashboard/manage-product"
                >
                  Manage Product
                </NavLink>
              </div>
            ) : null}
          </div>
        </div>
        <div className="right-dashboard">
          <div
            className={
              pathname === "/dashboard/my-orders" ||
                pathname === "/dashboard/add-review" ||
                pathname === "/dashboard/manage-orders" ||
                pathname === "/dashboard/add-product" ||
                pathname === "/dashboard/make-admin" ||
                pathname === "/dashboard/manage-product" ||
                pathname === "/dashboard/my-profile"
                ? `d-none`
                : `d-block`
            }
          >
            <h1 className="text-center text-primary">
              Welcome To Your Dashboard
            </h1>

            <div className="d-flex justify-content-center align-items-center ">
              <img
                className="w-50"
                src="https://img.freepik.com/free-vector/engineers-team-discussing-issues-construction-site_74855-4786.jpg?t=st=1653220685~exp=1653221285~hmac=ac9a03337455ca0cb9376e6c8cb09c609d072cb1b85be7d4048b1a0fb957a5bc&w=740"
                alt="img"
              />
            </div>
          </div>
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
