import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import DefaultLayout from "../layouts/default.js";
import NotFound from "./notFound.js";
import pages from "../data/pages";
import { getLayout } from "./pageBlocks";
import { useConsult } from "../context/ConsultContext";

import "../styles/views/_page.scss";

export default function Page() {
  const { slug } = useParams();
  const { open } = useConsult();
  const page = pages[slug];
  const Layout = getLayout(slug);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (page) {
      document.title = `${page.title} — WELBEX`;
    }
    return () => {
      document.title = "WELBEX";
    };
  }, [slug, page]);

  if (!page) return <NotFound />;

  return (
    <DefaultLayout>
      <div className="page">
        <div className="container">
          <nav className="page__breadcrumb" aria-label="Хлебные крошки">
            <Link to="/">Главная</Link>
            <span aria-hidden="true">/</span>
            <span className="page__breadcrumb__current">{page.title}</span>
          </nav>

          <header className="page__head" data-aos="fade">
            <h1 className="page__title">{page.title}</h1>
            <p className="page__lead">{page.lead}</p>
          </header>

          <div className="page__body">
            <Layout page={page} />
          </div>

          <aside className="page__cta" data-aos="fade">
            <div className="page__cta__text">
              <h2 className="page__cta__title">Обсудим вашу задачу?</h2>
              <p className="page__cta__lead">
                Разберём процессы и предложим решение под ваш бизнес. Бесплатно.
              </p>
            </div>
            <button
              type="button"
              className="page__cta__button"
              onClick={open}
            >
              Получить консультацию
            </button>
          </aside>
        </div>
      </div>
    </DefaultLayout>
  );
}
