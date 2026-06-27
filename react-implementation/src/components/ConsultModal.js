import { useEffect, useRef, useState, useCallback } from "react";
import { createPortal } from "react-dom";

import { phoneNumber } from "../data";

import "../styles/components/_modal.scss";

const EMPTY = { name: "", phone: "", email: "", comment: "" };

function validate(values) {
  const errors = {};

  if (values.name.trim().length < 2) {
    errors.name = "Укажите имя";
  }

  const digits = values.phone.replace(/\D/g, "");
  if (!values.phone.trim()) {
    errors.phone = "Укажите телефон";
  } else if (digits.length < 10) {
    errors.phone = "Телефон выглядит неполным";
  }

  if (
    values.email.trim() &&
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())
  ) {
    errors.email = "Проверьте адрес почты";
  }

  return errors;
}

export default function ConsultModal({ open, onClose }) {
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | submitting | success
  const [mounted, setMounted] = useState(open);
  const [closing, setClosing] = useState(false);
  const dialogRef = useRef(null);
  const firstFieldRef = useRef(null);
  const lastActiveRef = useRef(null);

  const CLOSE_MS = 220;

  const reset = useCallback(() => {
    setValues(EMPTY);
    setErrors({});
    setStatus("idle");
  }, []);

  const close = useCallback(() => {
    onClose();
  }, [onClose]);

  // Mount lifecycle: keep mounted through the exit animation
  useEffect(() => {
    if (open) {
      setMounted(true);
      setClosing(false);
      return undefined;
    }
    if (mounted) {
      setClosing(true);
      const t = window.setTimeout(() => setMounted(false), CLOSE_MS);
      return () => window.clearTimeout(t);
    }
    return undefined;
  }, [open, mounted]);

  // Focus management + body scroll lock while mounted
  useEffect(() => {
    if (!mounted) return undefined;

    lastActiveRef.current = document.activeElement;
    const id = window.setTimeout(() => firstFieldRef.current?.focus(), 30);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.clearTimeout(id);
      document.body.style.overflow = prevOverflow;
      reset();
      if (lastActiveRef.current instanceof HTMLElement) {
        lastActiveRef.current.focus();
      }
    };
  }, [mounted, reset]);

  const onKeyDown = (event) => {
    if (event.key === "Escape") {
      event.stopPropagation();
      close();
      return;
    }

    if (event.key !== "Tab") return;

    const focusable = dialogRef.current?.querySelectorAll(
      'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    if (!focusable || focusable.length === 0) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => (prev[name] ? { ...prev, [name]: undefined } : prev));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (status === "submitting") return;

    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      const firstInvalid = dialogRef.current?.querySelector("[aria-invalid='true']");
      firstInvalid?.focus();
      return;
    }

    setStatus("submitting");
    // No backend on this static site: simulate the request round-trip.
    window.setTimeout(() => setStatus("success"), 1100);
  };

  if (!mounted) return null;

  return createPortal(
    <div
      className={`modal__overlay${closing ? " modal__overlay--closing" : ""}`}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) close();
      }}
    >
      <div
        className={`modal${closing ? " modal--closing" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="consult-title"
        ref={dialogRef}
        onKeyDown={onKeyDown}
      >
        <button
          type="button"
          className="modal__close"
          aria-label="Закрыть окно"
          onClick={close}
        >
          <span aria-hidden="true">×</span>
        </button>

        {status === "success" ? (
          <div className="modal__success" role="status">
            <div className="modal__success__mark" aria-hidden="true">
              ✓
            </div>
            <h2 id="consult-title" className="modal__title">
              Заявка отправлена
            </h2>
            <p className="modal__lead">
              Спасибо. Менеджер свяжется с вами в течение 15 минут в рабочее
              время.
            </p>
            <button
              type="button"
              className="modal__submit"
              onClick={close}
            >
              Готово
            </button>
          </div>
        ) : (
          <>
            <h2 id="consult-title" className="modal__title">
              Получить консультацию
            </h2>
            <p className="modal__lead">
              Оставьте контакты, разберём вашу задачу и предложим решение.
              Бесплатно.
            </p>

            <form className="modal__form" onSubmit={handleSubmit} noValidate>
              <div className="modal__field">
                <label htmlFor="consult-name">Имя</label>
                <input
                  id="consult-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  ref={firstFieldRef}
                  value={values.name}
                  onChange={handleChange}
                  aria-invalid={errors.name ? "true" : undefined}
                  aria-describedby={errors.name ? "err-name" : undefined}
                  placeholder="Как к вам обращаться"
                />
                {errors.name && (
                  <span className="modal__error" id="err-name">
                    {errors.name}
                  </span>
                )}
              </div>

              <div className="modal__field">
                <label htmlFor="consult-phone">Телефон</label>
                <input
                  id="consult-phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  inputMode="tel"
                  value={values.phone}
                  onChange={handleChange}
                  aria-invalid={errors.phone ? "true" : undefined}
                  aria-describedby={errors.phone ? "err-phone" : undefined}
                  placeholder="+7 ___ ___-__-__"
                />
                {errors.phone && (
                  <span className="modal__error" id="err-phone">
                    {errors.phone}
                  </span>
                )}
              </div>

              <div className="modal__field">
                <label htmlFor="consult-email">
                  Email <span className="modal__optional">(необязательно)</span>
                </label>
                <input
                  id="consult-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={values.email}
                  onChange={handleChange}
                  aria-invalid={errors.email ? "true" : undefined}
                  aria-describedby={errors.email ? "err-email" : undefined}
                  placeholder="you@company.ru"
                />
                {errors.email && (
                  <span className="modal__error" id="err-email">
                    {errors.email}
                  </span>
                )}
              </div>

              <div className="modal__field">
                <label htmlFor="consult-comment">
                  Задача{" "}
                  <span className="modal__optional">(необязательно)</span>
                </label>
                <textarea
                  id="consult-comment"
                  name="comment"
                  rows="3"
                  value={values.comment}
                  onChange={handleChange}
                  placeholder="Коротко о задаче или текущей CRM"
                />
              </div>

              <button
                type="submit"
                className="modal__submit"
                disabled={status === "submitting"}
              >
                {status === "submitting" ? "Отправляем…" : "Отправить заявку"}
              </button>

              <p className="modal__note">
                Нажимая кнопку, вы соглашаетесь на обработку персональных данных.
                Или позвоните: <a href={`tel:${phoneNumber}`}>{phoneNumber}</a>
              </p>
            </form>
          </>
        )}
      </div>
    </div>,
    document.body
  );
}
