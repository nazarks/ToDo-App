import React from "react";
import { Alert } from "react-bootstrap";
import { useLocation } from "react-router-dom";

const NotFound404 = () => {
  let { pathname } = useLocation();
  return <>{<Alert variant={"danger"}>Page not found {pathname}</Alert>}</>;
};
export default NotFound404;
