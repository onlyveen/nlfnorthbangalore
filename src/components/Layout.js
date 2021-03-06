/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useStaticQuery, graphql } from "gatsby";
import Loader from "./Loader";

import Header from "./Header";
import Footer from "./Footer";
import { GoArrowUp } from "react-icons/go";

import "../sass/main.scss";
import { Fragment } from "react";

const Layout = ({ children, page, noFooter, toTop }) => {
  const [enoughScroll, setEnoughScroll] = useState(false);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoader(false);
    }, 1500);
    if (document.documentElement.scrollTop > 200) {
      setEnoughScroll(true);
    } else {
      setEnoughScroll(false);
    }
    window.addEventListener("scroll", listener);
    return () => {
      window.removeEventListener("scroll", listener);
    };
  }, []);

  const listener = (e) => {
    if (document.documentElement.scrollTop > 200) {
      setEnoughScroll(true);
    } else {
      setEnoughScroll(false);
    }
  };

  const scrollToTop = () => {
    window &&
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
  };

  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  return (
    <Fragment>
      {loader ? <Loader /> : null}
      <div id="page" className={page ? page : ""}>
        <Header siteTitle={data.site.siteMetadata.title} />
        <div>
          <main>{children}</main>
        </div>
        {!noFooter ? <Footer /> : null}
        {toTop && enoughScroll ? (
          <span className="button goToTop" onClick={() => scrollToTop()}>
            <GoArrowUp />
          </span>
        ) : null}
      </div>
    </Fragment>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
