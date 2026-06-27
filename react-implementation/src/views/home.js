import DefaultLayout from "../layouts/default.js";
import { useConsult } from "../context/ConsultContext";

import "../styles/views/_home.scss";

import redLight from "../images/particles/red_light.png";
import purpleLight from "../images/particles/purple_light.png";
import purpleBall from "../images/particles/purple_ball.png";
import redBall from "../images/particles/red_ball.png";
import smallRedBall from "../images/particles/red_ball_small.png";

const services = [
  {
    title: "Виджеты",
    description: "30 готовых решений",
  },
  {
    title: "Dashboard",
    description: "с показателями вашего бизнеса",
  },
  {
    title: "Skype Аудит",
    description: "отдела продаж и CRM системы",
  },
  {
    title: "35 дней",
    description: "использования CRM",
  },
];

const particles = [
  { id: "red-light", image: redLight },
  { id: "purple-light", image: purpleLight },
  { id: "purple-ball", image: purpleBall },
  { id: "small-red-ball", image: smallRedBall },
  { id: "red-ball", image: redBall },
];

export default function Home() {
  const { open } = useConsult();

  return (
    <DefaultLayout>
      {particles.map((item, index) => (
        <div
          key={item.id}
          id={item.id}
          className="particle"
          aria-hidden="true"
          data-aos="fade"
          data-aos-delay={index * 60}
        >
          <img src={item.image} alt="" />
        </div>
      ))}

      <div className="home__wrapper">
        <div className="container">
          <div className="home" data-aos="fade" data-aos-delay="120">
            <div className="home__welcome-text">
              <h1 className="home__welcome-text__title">
                <p>Зарабатывайте больше</p>
                <span> с WELBEX</span>
              </h1>

              <p className="home__welcome-text__description">
                Развиваем и контролируем продажи за вас
              </p>
            </div>

            <div className="home__services" id="services">
              <div className="home__services__description">
                Вместе с <span>бесплатной консультацией</span> мы дарим:
              </div>

              <div className="home__services__grid">
                {services.map((service) => (
                  <div
                    key={service.title}
                    className="home__services__grid__item"
                  >
                    <h2 className="home__services__grid__item__title">
                      {service.title}
                    </h2>
                    <p className="home__services__grid__item__description">
                      {service.description}
                    </p>
                  </div>
                ))}
              </div>

              <button
                type="button"
                className="home__services__button"
                onClick={open}
              >
                Получить консультацию
              </button>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}
