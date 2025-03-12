import React from "react";
import styles from "./page.module.scss";

export default function AboutPage() {
  return (
    <div className={styles.container}>
      <h1>О нас</h1>

      <div className="card" style={{ padding: "1rem", marginBottom: "1rem" }}>
        <h2>Кто мы?</h2>
        <p>
          Learn&amp;Share — это платформа для обмена знаниями, где каждый может
          стать как учеником, так и учителем. Мы создаём безопасное и динамичное
          сообщество, в котором пользователи обмениваются опытом и поддерживают
          друг друга в развитии.
        </p>
      </div>

      <div className="card" style={{ padding: "1rem", marginBottom: "1rem" }}>
        <h2>Наша миссия</h2>
        <p>
          Мы стремимся сделать обучение доступным для всех, предоставляя
          платформу, на которой каждый может поделиться своими знаниями и
          навыками, развивать личный потенциал и открывать новые горизонты.
        </p>
      </div>

      <div className="card" style={{ padding: "1rem", marginBottom: "1rem" }}>
        <h2>Что мы предлагаем?</h2>
        <ul>
          <li>Удобный и интуитивно понятный интерфейс</li>
          <li>Верифицированные пользователи для обеспечения безопасности</li>
          <li>Поддержку сообщества единомышленников и экспертов</li>
          <li>Возможность обмена знаниями в любом направлении</li>
        </ul>
      </div>

      <p>
        Присоединяйтесь к нам, чтобы открыть для себя мир знаний и обменяться
        опытом с тысячами пользователей по всему миру!
      </p>
    </div>
  );
}
