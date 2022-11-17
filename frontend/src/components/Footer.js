import React from "react";
import { FaInstagramSquare, FaTwitter } from "react-icons/fa";
import { GrFacebook } from "react-icons/gr";
import { SiTodoist } from "react-icons/si";
import { LinkContainer } from "react-router-bootstrap";

const Footer = () => {
  return (
    <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
      <div className="col-md-5 d-flex align-items-center">
        <LinkContainer to="/" className="data-pointer">
          <SiTodoist />
        </LinkContainer>
        <span className="text-muted">
          &nbsp;© 2022 To Do Company, Inc. All rights reserved.
        </span>
      </div>

      <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
        <li className="ms-3">
          <a className="text-muted" href="#twitter">
            <FaTwitter />
          </a>
        </li>
        <li className="ms-3">
          <a className="text-muted" href="#instagram">
            <FaInstagramSquare />
          </a>
        </li>
        <li className="ms-3">
          <a className="text-muted" href="#facebook">
            <GrFacebook />
          </a>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
