import React from "react";
import {
  NavLink
} from "react-router-dom";

import { AppConfigContext, UserContext } from "../../context";
import UserInfo from "../UserInfo/UserInfo";
import "./Header.scss";

export const Header = (props) => {
  const { counter, actions: { increment, decrement } } = props;
  return (
    <AppConfigContext.Consumer>
      {allLinks => (
        <UserContext.Consumer>
          {({ user }) => (
            <div className="header">
              <ul className="menu">
                {" "}
                {user &&
                  allLinks &&
                  allLinks[user.role].map(link => (
                    <NavLink to={link.to} key={link.label} activeClassName="active-link">{link.label}</NavLink>
                  ))}
              </ul>

              <div className="d-flex justify-content-between counter align-items-center">
                <div className="badge-info">Counter: {counter}</div>
                <button className="btn-outline-info btn-sm " onClick={increment}>+</button>
                <button className="btn-sm btn-outline-info" onClick={decrement}>-</button>
              </div>
              <UserInfo />
            </div>
          )}
        </UserContext.Consumer>
      )}
    </AppConfigContext.Consumer>
  );
};
