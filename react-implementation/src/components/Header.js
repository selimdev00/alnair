import { Link, NavLink } from "react-router-dom";

import logo from "../images/logo_welbex.svg";

import { socials, phoneNumber } from "../data";

import "../styles/components/_header.scss";

const headerNavItems = [
  {
    title: "Услуги",
    link: "/services",
  },
  {
    title: "Виджеты",
    link: "/widgets",
  },
  {
    title: "Интеграции",
    link: "/integrations",
  },
  {
    title: "Кейсы",
    link: "/cases",
  },
  {
    title: "Сертификаты",
    link: "/certificates",
  },
];

export default function HeaderComponent() {
  return (
    <header
      className="header__wrapper"
      data-aos="fade"
      data-aos-delay="0"
    >
      <div className="container">
        <div className="header">
          <Link to="/" aria-label="WELBEX — на главную">
            <div className="header__logo">
              <img src={logo} alt="WELBEX" />

              <p className="header__logo__text">
                крупный интегратор CRM в Росcии и ещё 8 странах
              </p>
            </div>
          </Link>
          <nav className="header__nav__wrapper" aria-label="Основная навигация">
            <ul className="header__nav">
              {headerNavItems.map((item) => (
                <li key={item.title} className="header__nav__item">
                  <NavLink
                    to={item.link}
                    className={({ isActive }) =>
                      isActive ? "is-active" : undefined
                    }
                  >
                    {item.title}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
          <div className="header__phone">
            <p>
              <a href={`tel:${phoneNumber}`}>{phoneNumber}</a>
            </p>
          </div>
          <div className="header__socials">
            {socials.map((item) => (
              <a
                key={item.link}
                className="header__socials__item"
                target="_blank"
                href={item.link}
                rel="noreferrer"
                aria-label={item.name}
              >
                <img src={item.icon} alt="" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
