import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../actions/auth";

const NavBar = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const isLoading = useSelector((state) => state.auth.isLoading);
  const dispatch = useDispatch();
  const logoutHandler = () => dispatch(logout());
  const authLinks = (
    <ul>
      <li>
        <Link to="/dashboard">
          {"  "}
          <span className="hide-sm">Dashboard</span>
        </Link>
      </li>
      <li>
        <Link to="/profiles">Devs</Link>
      </li>
      <li>
        <Link to="/posts">Posts</Link>
      </li>
      <li>
        <Link to="#!" onClick={logoutHandler}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-power"
            viewBox="0 0 16 16"
          >
            <path d="M7.5 1v7h1V1h-1z" />
            <path d="M3 8.812a4.999 4.999 0 0 1 2.578-4.375l-.485-.874A6 6 0 1 0 11 3.616l-.501.865A5 5 0 1 1 3 8.812z" />
          </svg>
          {"  "}
          <span className="hide-sm">Logout</span>
        </Link>
      </li>
    </ul>
  );
  const guestLinks = (
    <ul>
      <li>
        <Link to="/profiles">Devs</Link>
      </li>
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </ul>
  );

  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/">
          <i className="fas fa-code"></i> AfriDevs
        </Link>
      </h1>
      {!isLoading && (isAuthenticated ? authLinks : guestLinks)}
    </nav>
  );
};

export default NavBar;
