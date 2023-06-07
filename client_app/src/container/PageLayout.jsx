import { useEffect, useRef, useState } from "react";
import {
  matchPath,
  Outlet,
  useLocation,
  useSearchParams,
} from "react-router-dom";
import { settings } from "./Header.config.js";
import audioDescription from "../services/audioDescription.js";
import Header from "./Header.jsx";
import phoneOverlay from "../assets/images/BlackPhoneEdge.png";

function PageLayout() {
  const location = useLocation();
  const [pageDescription, setPageDescription] = useState("");
  const [params] = useSearchParams();
  const headerConfig = settings.find((config) =>
    matchPath(location.pathname, config.route)
  );
  useEffect(() => {
    const { text, kiosk } = audioDescription[location.pathname]?.page ?? {
      text: "",
    };
    if (text) {
      const description = params.get("kiosk") ? `${text} ${kiosk ?? ""}` : text;
      setPageDescription(description);
    } else {
      setPageDescription("");
    }
  }, [location.pathname]);

  const [headerHasRendered, setHeaderHasRendered] = useState(false);
  const [bodyHasRendered, setBodyHasRendered] = useState(false);
  const headerRef = useRef();
  const bodyRef = useRef();

  useEffect(() => {
    if (headerHasRendered && bodyHasRendered) {
      bodyRef.current.style.height = `calc(100% - ${
        getComputedStyle(headerRef.current).height
      }`;
    }
  }, [headerHasRendered, bodyHasRendered, location]);

  return (
    <div className="app">
      {params.get("kiosk") ? (
        <img src={phoneOverlay} alt="" className="app__phone-overlay" />
      ) : null}
      <Header
        color={headerConfig.color}
        nav={headerConfig.nav}
        route={headerConfig.route}
        ref={(n) => {
          if (n) {
            setHeaderHasRendered(true);
            headerRef.current = n;
          } else {
            setHeaderHasRendered(false);
            headerRef.current = null;
          }
        }}
      >
        {headerConfig.text}
      </Header>
      <p id="page-description" className="visually-hidden">
        {pageDescription}
      </p>
      <article
        className={`main-content main-content--${
          ["/", "/chatbot/chat"].includes(location.pathname) ? "topics" : "chat"
        }`}
        aria-describedby={pageDescription ? "page-description" : ""}
        ref={(n) => {
          if (n) {
            setBodyHasRendered(true);
            bodyRef.current = n;
          } else {
            setBodyHasRendered(false);
            bodyRef.current = null;
          }
        }}
      >
        <Outlet />
      </article>
    </div>
  );
}

export default PageLayout;
