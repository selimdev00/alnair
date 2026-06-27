import { useEffect } from "react";
import { Link } from "react-router-dom";

import DefaultLayout from "../layouts/default.js";
import { useConsult } from "../context/ConsultContext";

import "../styles/views/_page.scss";

export default function NotFound() {
  const { open } = useConsult();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Страница не найдена — WELBEX";
    return () => {
      document.title = "WELBEX";
    };
  }, []);

  return (
    <DefaultLayout>
      <div className="page">
        <div className="container">
          <div className="not-found" data-aos="fade">
            <p className="not-found__code">404</p>
            <h1 className="not-found__title">Такой страницы нет</h1>
            <p className="not-found__lead">
              Возможно, ссылка устарела или страница ещё в работе. Вернитесь на
              главную или напишите нам, мы поможем.
            </p>
            <div className="not-found__actions">
              <Link to="/" className="not-found__home">
                На главную
              </Link>
              <button
                type="button"
                className="not-found__consult"
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
