import React from 'react';
import { Link } from 'react-router-dom';
import { LuHeart, LuRocket, LuShield, LuUsers, LuStar, LuMapPin, LuPackage, LuHeadphones } from 'react-icons/lu';
import styles from './About.module.css';

const values = [
  {
    icon: <LuHeart size={32} />,
    title: 'С любовью к технологиям',
    desc: 'Каждый продукт мы выбираем вручную — только то, во что верим сами. Мы не просто продаём гаджеты, мы помогаем вам найти устройство, которое станет верным спутником в работе и жизни.',
  },
  {
    icon: <LuShield size={32} />,
    title: 'Честность и прозрачность',
    desc: 'Никаких скрытых комиссий и накруток. Мы работаем напрямую с дистрибьюторами, чтобы вы получали лучшую цену и официальную гарантию на каждый товар.',
  },
  {
    icon: <LuRocket size={32} />,
    title: 'Быстрая доставка',
    desc: 'Доставляем по всему Кыргызстану. Заказы из Бишкека — в день оформления или на следующий день. Регионы — от 1 до 3 рабочих дней.',
  },
  {
    icon: <LuHeadphones size={32} />,
    title: 'Живая поддержка',
    desc: 'Наши консультанты — не боты. Это живые люди, которые разбираются в технике и готовы помочь с выбором, настройкой или возвратом.',
  },
];

const stats = [
  { number: '500+', label: 'Товаров в каталоге' },
  { number: '2 000+', label: 'Довольных клиентов' },
  { number: '4.9 ★', label: 'Средний рейтинг' },
  { number: '1 день', label: 'Доставка по Бишкеку' },
];

const team = [
  {
    name: 'Айбек Сатаров',
    role: 'Основатель & CEO',
    emoji: '👨‍💻',
    quote: 'Я хотел создать магазин, в котором сам бы с удовольствием покупал.',
  },
  {
    name: 'Аида Токтомаматова',
    role: 'Менеджер по работе с клиентами',
    emoji: '👩‍💼',
    quote: 'Каждый клиент для нас уникален — и это не просто слова.',
  },
  {
    name: 'Жанибек Усупов',
    role: 'Технический консультант',
    emoji: '🛠️',
    quote: 'Помогаю подобрать то, что реально нужно — без лишних переплат.',
  },
];

const About = () => {
  return (
    <div className={styles.page}>

      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.heroBadge}>🛍️ Мы только начинаем — и это лучшее время присоединиться</div>
        <h1 className={styles.heroTitle}>
          ElectronicMarket — <br />
          <span>магазин, созданный с душой</span>
        </h1>
        <p className={styles.heroSub}>
          Мы открылись в 2025 году в Бишкеке с одной простой идеей: продавать технику честно, 
          красиво и с заботой о каждом покупателе. Пока мы молоды — но именно это даёт нам 
          энергию делать всё лучше каждый день.
        </p>
        <div className={styles.heroCta}>
          <Link to="/shop" className={styles.ctaPrimary}>Смотреть каталог</Link>
          <Link to="/contacts" className={styles.ctaSecondary}>Связаться с нами</Link>
        </div>
      </section>

      {/* STATS */}
      <section className={styles.statsSection}>
        <div className={styles.statsGrid}>
          {stats.map((s, i) => (
            <div key={i} className={styles.statCard}>
              <span className={styles.statNumber}>{s.number}</span>
              <span className={styles.statLabel}>{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* STORY */}
      <section className={styles.story}>
        <div className={styles.storyContent}>
          <div className={styles.storyText}>
            <span className={styles.sectionTag}>Наша история</span>
            <h2 className={styles.sectionTitle}>Как всё начиналось</h2>
            <p>
              Идея ElectronicMarket родилась из личного разочарования — когда покупаешь ноутбук 
              онлайн, а получаешь совсем не то, что ожидал. Без поддержки, без гарантии, без 
              честных отзывов.
            </p>
            <p>
              Мы решили сделать иначе. Небольшая команда из Бишкека собрала каталог из 
              проверенных устройств, договорилась напрямую с официальными дистрибьюторами 
              и открыла магазин, в котором сами хотели бы покупать.
            </p>
            <p>
              Сейчас мы на старте — и именно поэтому каждый заказ для нас важен. 
              Мы не крупная корпорация с автоответами. Мы — живые люди, которые любят 
              технику и хотят, чтобы вы были довольны.
            </p>
          </div>
          <div className={styles.storyVisual}>
            <div className={styles.storyCard}>
              <div className={styles.storyCardIcon}><LuPackage size={48} /></div>
              <h3>Официальная гарантия</h3>
              <p>На весь товар действует гарантия производителя. Мы работаем только с лицензированными поставщиками.</p>
            </div>
            <div className={styles.storyCard}>
              <div className={styles.storyCardIcon}><LuMapPin size={48} /></div>
              <h3>Мы в Бишкеке</h3>
              <p>Физический офис на ул. Киевская 148. Вы можете приехать, посмотреть товар и получить консультацию.</p>
            </div>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className={styles.values}>
        <div className={styles.valuesHeader}>
          <span className={styles.sectionTag}>Принципы</span>
          <h2 className={styles.sectionTitle}>Что нас отличает</h2>
        </div>
        <div className={styles.valuesGrid}>
          {values.map((v, i) => (
            <div key={i} className={styles.valueCard}>
              <div className={styles.valueIcon}>{v.icon}</div>
              <h3 className={styles.valueTitle}>{v.title}</h3>
              <p className={styles.valueDesc}>{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TEAM */}
      <section className={styles.team}>
        <div className={styles.teamHeader}>
          <span className={styles.sectionTag}>Команда</span>
          <h2 className={styles.sectionTitle}>Люди за магазином</h2>
          <p className={styles.teamSub}>
            Нас пока немного — но каждый горит своим делом. Познакомьтесь с теми, 
            кто отвечает на ваши вопросы и упаковывает ваши заказы.
          </p>
        </div>
        <div className={styles.teamGrid}>
          {team.map((m, i) => (
            <div key={i} className={styles.teamCard}>
              <div className={styles.teamEmoji}>{m.emoji}</div>
              <h3 className={styles.teamName}>{m.name}</h3>
              <span className={styles.teamRole}>{m.role}</span>
              <p className={styles.teamQuote}>«{m.quote}»</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA BOTTOM */}
      <section className={styles.bottomCta}>
        <h2>Готовы найти идеальный гаджет?</h2>
        <p>Загляните в каталог — или напишите нам, и мы поможем с выбором лично.</p>
        <div className={styles.heroCta}>
          <Link to="/shop" className={styles.ctaPrimary}>Перейти в каталог</Link>
          <Link to="/contacts" className={styles.ctaSecondary}>Написать нам</Link>
        </div>
      </section>

    </div>
  );
};

export default About;