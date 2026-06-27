import { useState } from "react";

import { useConsult } from "../context/ConsultContext";

import "../styles/views/_pagelayouts.scss";

const pad = (n) => String(n + 1).padStart(2, "0");

// services — editorial alternating rows, no cards
function ServicesLayout({ page }) {
  return (
    <div className="pl-rows">
      {page.sections.map((s, i) => (
        <article className="pl-rows__row" key={s.heading} data-aos="fade">
          <div className="pl-rows__index">{pad(i)}</div>
          <h2 className="pl-rows__heading">{s.heading}</h2>
          <p className="pl-rows__body">{s.body}</p>
        </article>
      ))}
    </div>
  );
}

// widgets — three-column chip cards
function WidgetsLayout({ page }) {
  return (
    <div className="pl-grid3">
      {page.sections.map((s, i) => (
        <article className="pl-grid3__card" key={s.heading} data-aos="fade">
          <span className="pl-grid3__chip">{pad(i)}</span>
          <h2 className="pl-grid3__heading">{s.heading}</h2>
          <p className="pl-grid3__body">{s.body}</p>
        </article>
      ))}
    </div>
  );
}

// integrations — two-column dotted list
function IntegrationsLayout({ page }) {
  return (
    <div className="pl-dots">
      {page.sections.map((s) => (
        <div className="pl-dots__item" key={s.heading} data-aos="fade">
          <span className="pl-dots__dot" aria-hidden="true" />
          <div>
            <h2 className="pl-dots__heading">{s.heading}</h2>
            <p className="pl-dots__body">{s.body}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

// cases — stacked result cards with oversized numerals
function CasesLayout({ page }) {
  return (
    <div className="pl-cases">
      {page.sections.map((s, i) => (
        <article className="pl-cases__card" key={s.heading} data-aos="fade">
          <div className="pl-cases__num">{pad(i)}</div>
          <div className="pl-cases__content">
            <h2 className="pl-cases__heading">{s.heading}</h2>
            <p className="pl-cases__body">{s.body}</p>
          </div>
        </article>
      ))}
    </div>
  );
}

// certificates — badge grid
function CertificatesLayout({ page }) {
  return (
    <div className="pl-badges">
      {page.sections.map((s) => (
        <article className="pl-badges__card" key={s.heading} data-aos="fade">
          <span className="pl-badges__mark" aria-hidden="true">
            ✓
          </span>
          <h2 className="pl-badges__heading">{s.heading}</h2>
          <p className="pl-badges__body">{s.body}</p>
        </article>
      ))}
    </div>
  );
}

// partnership — vertical numbered stepper
function PartnershipLayout({ page }) {
  return (
    <ol className="pl-steps">
      {page.sections.map((s, i) => (
        <li className="pl-steps__step" key={s.heading} data-aos="fade">
          <span className="pl-steps__node">{pad(i)}</span>
          <div className="pl-steps__content">
            <h2 className="pl-steps__heading">{s.heading}</h2>
            <p className="pl-steps__body">{s.body}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

// vacancies — job rows with an action button each
function VacanciesLayout({ page }) {
  const { open } = useConsult();
  return (
    <div className="pl-jobs">
      {page.sections.map((s) => (
        <article className="pl-jobs__row" key={s.heading} data-aos="fade">
          <div className="pl-jobs__text">
            <h2 className="pl-jobs__heading">{s.heading}</h2>
            <p className="pl-jobs__body">{s.body}</p>
          </div>
          <button type="button" className="pl-jobs__apply" onClick={open}>
            Откликнуться
          </button>
        </article>
      ))}
    </div>
  );
}

// calculate — blocks, first one highlighted as a panel
function CalculateLayout({ page }) {
  return (
    <div className="pl-calc">
      {page.sections.map((s, i) => (
        <article
          className={`pl-calc__block${i === 0 ? " pl-calc__block--lead" : ""}`}
          key={s.heading}
          data-aos="fade"
        >
          <h2 className="pl-calc__heading">{s.heading}</h2>
          <p className="pl-calc__body">{s.body}</p>
        </article>
      ))}
    </div>
  );
}

// clients — segment tiles
function ClientsLayout({ page }) {
  return (
    <div className="pl-tiles">
      {page.sections.map((s) => (
        <article className="pl-tiles__tile" key={s.heading} data-aos="fade">
          <h2 className="pl-tiles__heading">{s.heading}</h2>
          <p className="pl-tiles__body">{s.body}</p>
        </article>
      ))}
    </div>
  );
}

// news — testimonial quote cards
function NewsLayout({ page }) {
  return (
    <div className="pl-quotes">
      {page.sections.map((s) => (
        <figure className="pl-quotes__card" key={s.heading} data-aos="fade">
          <span className="pl-quotes__mark" aria-hidden="true">
            “
          </span>
          <blockquote className="pl-quotes__body">{s.body}</blockquote>
          <figcaption className="pl-quotes__caption">{s.heading}</figcaption>
        </figure>
      ))}
    </div>
  );
}

// blog — video cards with a gradient thumbnail
function BlogLayout({ page }) {
  return (
    <div className="pl-videos">
      {page.sections.map((s) => (
        <article className="pl-videos__card" key={s.heading} data-aos="fade">
          <div className="pl-videos__thumb" aria-hidden="true">
            <span className="pl-videos__play" />
          </div>
          <div className="pl-videos__meta">
            <h2 className="pl-videos__heading">{s.heading}</h2>
            <p className="pl-videos__body">{s.body}</p>
          </div>
        </article>
      ))}
    </div>
  );
}

// questions — accordion
function FaqLayout({ page }) {
  const [openIndex, setOpenIndex] = useState(0);
  return (
    <div className="pl-faq">
      {page.sections.map((s, i) => {
        const isOpen = openIndex === i;
        return (
          <div
            className={`pl-faq__item${isOpen ? " pl-faq__item--open" : ""}`}
            key={s.heading}
          >
            <h2 className="pl-faq__q">
              <button
                type="button"
                id={`faq-q-${i}`}
                className="pl-faq__trigger"
                aria-expanded={isOpen}
                aria-controls={`faq-a-${i}`}
                onClick={() => setOpenIndex(isOpen ? -1 : i)}
              >
                <span>{s.heading}</span>
                <span className="pl-faq__icon" aria-hidden="true" />
              </button>
            </h2>
            <div
              className="pl-faq__answer"
              id={`faq-a-${i}`}
              role="region"
              aria-labelledby={`faq-q-${i}`}
              aria-hidden={!isOpen}
            >
              <p>{s.body}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function DefaultLayout({ page }) {
  return (
    <ol className="pl-rows">
      {page.sections.map((s, i) => (
        <article className="pl-rows__row" key={s.heading} data-aos="fade">
          <div className="pl-rows__index">{pad(i)}</div>
          <h2 className="pl-rows__heading">{s.heading}</h2>
          <p className="pl-rows__body">{s.body}</p>
        </article>
      ))}
    </ol>
  );
}

const layouts = {
  services: ServicesLayout,
  widgets: WidgetsLayout,
  integrations: IntegrationsLayout,
  cases: CasesLayout,
  certificates: CertificatesLayout,
  partnership: PartnershipLayout,
  vacancies: VacanciesLayout,
  calculate: CalculateLayout,
  clients: ClientsLayout,
  news: NewsLayout,
  blog: BlogLayout,
  questions: FaqLayout,
};

export function getLayout(slug) {
  return layouts[slug] || DefaultLayout;
}

export default layouts;
