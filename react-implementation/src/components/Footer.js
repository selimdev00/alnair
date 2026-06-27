import { NavLink } from "react-router-dom";

import { address, phoneNumber, socials } from "../data";

import "../styles/components/_footer.scss";

const footerSections = [
  {
    title: "О компании",
    items: [
      [
        {
          title: "Партнёрская программа",
          link: "/partnership",
        },
        {
          title: "Вакансии",
          link: "/vacancies",
        },
      ],
    ],
  },
  {
    title: "Меню",
    items: [
      [
        {
          title: "Расчёт стоимости",
          link: "/calculate",
        },
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
          title: "Наши клиенты",
          link: "/clients",
        },
      ],
      [
        {
          title: "Кейсы",
          link: "/cases",
        },
        {
          title: "Благодарственные письма",
          link: "/news",
        },
        {
          title: "Сертификаты",
          link: "/certificates",
        },
        {
          title: "Блог на Youtube",
          link: "/blog",
        },
        {
          title: "Вопрос / Ответ",
          link: "/questions",
        },
      ],
    ],
  },
];

export default function FooterComponent() {
  return (
    <footer
      id="contacts"
      className="footer__wrapper"
      data-aos="fade"
    >
      <div className="container">
        <div className="footer">
          {footerSections.map((section) => (
            <div key={section.title} className="footer__section">
              <h3 className="footer__section__title">{section.title}</h3>
              <nav
                className="footer__section__items__wrapper"
                aria-label={section.title}
              >
                <ul className="footer__section__items">
                  {section.items.map((items) => (
                    <div
                      key={items[0].title}
                      className="footer__section__items__block"
                    >
                      {items.map((item) => (
                        <li
                          key={item.title}
                          className="footer__section__items__block__item"
                        >
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
                    </div>
                  ))}
                </ul>
              </nav>
            </div>
          ))}

          <div className="footer__section">
            <h3 className="footer__section__title">Контакты</h3>

            <p className="footer__section__phone">
              <a href={`tel:${phoneNumber}`}>{phoneNumber}</a>
            </p>

            <div className="footer__socials">
              {socials.map((item) => (
                <a
                  key={item.link}
                  className="footer__socials__item"
                  target="_blank"
                  href={item.link}
                  rel="noreferrer"
                  aria-label={item.name}
                >
                  <img src={item.icon} alt="" />
                </a>
              ))}
            </div>

            <p className="footer__section__address">{address}</p>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="footer__bottom">
          <p>©WELBEX {new Date().getFullYear()}. Все права защищены.</p>
          <p className="footer__bottom__policy">Политика конфиденциальности</p>
        </div>
      </div>
    </footer>
  );
}
