import React, { useState } from 'react';
import { LuPhone, LuMail, LuMapPin, LuClock, LuSend, LuInstagram, LuFacebook, LuMessageCircle } from 'react-icons/lu';
import styles from './Contacts.module.css';

const contacts = [
  {
    icon: <LuPhone size={24} />,
    title: 'Телефон',
    lines: ['+996 (555) 01-02-03', '+996 (700) 10-20-30'],
    hint: 'Пн – Сб, 9:00 – 20:00',
  },
  {
    icon: <LuMail size={24} />,
    title: 'Email',
    lines: ['support@elecmarket.kg', 'sales@elecmarket.kg'],
    hint: 'Ответим в течение часа',
  },
  {
    icon: <LuMapPin size={24} />,
    title: 'Адрес',
    lines: ['Кыргызстан, г. Бишкек', 'ул. Киевская 148, офис 3'],
    hint: 'Рядом с ТЦ Ала-Тоо',
  },
  {
    icon: <LuClock size={24} />,
    title: 'Режим работы',
    lines: ['Пн – Пт: 9:00 – 20:00', 'Сб – Вс: 10:00 – 18:00'],
    hint: 'Без обеда и выходных',
  },
];

const socials = [
  { icon: <LuInstagram size={22} />, label: 'Instagram', handle: '@elecmarket.kg', href: '#' },
  { icon: <LuFacebook size={22} />, label: 'Facebook', handle: 'ElectronicMarket KG', href: '#' },
  { icon: <LuMessageCircle size={22} />, label: 'WhatsApp', handle: '+996 555 010 203', href: '#' },
];

const Contacts = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setSent(true);
  };

  return (
    <div className={styles.page}>

      {/* HERO */}
      <section className={styles.hero}>
        <span className={styles.heroBadge}>📬 Всегда на связи</span>
        <h1 className={styles.heroTitle}>
          Свяжитесь с нами — <br />
          <span>мы рядом</span>
        </h1>
        <p className={styles.heroSub}>
          Есть вопрос по товару, заказу или доставке? Хотите получить консультацию 
          перед покупкой? Напишите или позвоните — мы ответим быстро и по делу.
        </p>
      </section>

      {/* CONTACT CARDS */}
      <section className={styles.cardsSection}>
        <div className={styles.cardsGrid}>
          {contacts.map((c, i) => (
            <div key={i} className={styles.contactCard}>
              <div className={styles.cardIcon}>{c.icon}</div>
              <h3 className={styles.cardTitle}>{c.title}</h3>
              {c.lines.map((line, j) => (
                <p key={j} className={styles.cardLine}>{line}</p>
              ))}
              <span className={styles.cardHint}>{c.hint}</span>
            </div>
          ))}
        </div>
      </section>

      {/* FORM + MAP */}
      <section className={styles.mainSection}>
        <div className={styles.mainGrid}>

          {/* FORM */}
          <div className={styles.formBlock}>
            <span className={styles.sectionTag}>Напишите нам</span>
            <h2 className={styles.sectionTitle}>Форма обратной связи</h2>

            {sent ? (
              <div className={styles.successMsg}>
                <span className={styles.successEmoji}>✅</span>
                <h3>Сообщение отправлено!</h3>
                <p>Мы получили ваш запрос и свяжемся с вами в ближайшее время. Спасибо!</p>
                <button className={styles.resetBtn} onClick={() => { setSent(false); setForm({ name: '', email: '', subject: '', message: '' }); }}>
                  Отправить ещё одно
                </button>
              </div>
            ) : (
              <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label>Ваше имя *</label>
                    <input
                      type="text"
                      name="name"
                      placeholder="Алибек"
                      value={form.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Email *</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="example@mail.kg"
                      value={form.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className={styles.formGroup}>
                  <label>Тема обращения</label>
                  <input
                    type="text"
                    name="subject"
                    placeholder="Вопрос о доставке / Выбор ноутбука / Гарантия..."
                    value={form.subject}
                    onChange={handleChange}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Сообщение *</label>
                  <textarea
                    name="message"
                    rows={5}
                    placeholder="Расскажите, чем можем помочь..."
                    value={form.message}
                    onChange={handleChange}
                    required
                  />
                </div>
                <button type="submit" className={styles.submitBtn}>
                  <LuSend size={16} />
                  Отправить сообщение
                </button>
              </form>
            )}
          </div>

          {/* INFO SIDE */}
          <div className={styles.infoBlock}>
            <span className={styles.sectionTag}>Соцсети</span>
            <h2 className={styles.sectionTitle}>Мы в мессенджерах</h2>
            <p className={styles.infoText}>
              Предпочитаете общаться в соцсетях? Найдите нас в Instagram, Facebook 
              или напишите в WhatsApp — отвечаем оперативно.
            </p>

            <div className={styles.socialsStack}>
              {socials.map((s, i) => (
                <a key={i} href={s.href} className={styles.socialRow}>
                  <div className={styles.socialIcon}>{s.icon}</div>
                  <div>
                    <div className={styles.socialLabel}>{s.label}</div>
                    <div className={styles.socialHandle}>{s.handle}</div>
                  </div>
                </a>
              ))}
            </div>

            <div className={styles.mapBlock}>
              <span className={styles.sectionTag} style={{ marginTop: 40, display: 'block' }}>Как нас найти</span>
              <h3 className={styles.mapTitle}>г. Бишкек, ул. Киевская 148</h3>
              <div className={styles.mapEmbed}>
                <iframe
                  title="ElectronicMarket на карте"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2925.4!2d74.5897!3d42.8700!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x389eb7def6b7cbf9%3A0x1a94f7a42b3e3f3a!2z0YPQuy4g0JrQuNC10LLRgdC60LDRjyAxNDgsINCR0LjRiNC60LXQug!5e0!3m2!1sru!2skg!4v1718000000000!5m2!1sru!2skg"
                  width="100%"
                  height="220"
                  style={{ border: 0, borderRadius: 16 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Contacts;