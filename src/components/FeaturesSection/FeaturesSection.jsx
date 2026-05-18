import React from 'react';
import { FaShippingFast, FaShieldAlt, FaUndo, FaHeadset } from 'react-icons/fa';
import styles from './FeaturesSection.module.css';

const FeaturesSection = () => {
  const features = [
    {
      icon: <FaShippingFast />,
      title: 'Бесплатная доставка',
      description: 'При заказе от 50 000 сом'
    },
    {
      icon: <FaShieldAlt />,
      title: 'Гарантия качества',
      description: 'Официальная гарантия 1-2 года'
    },
    {
      icon: <FaUndo />,
      title: 'Возврат 14 дней',
      description: 'Без лишних вопросов'
    },
    {
      icon: <FaHeadset />,
      title: 'Поддержка 24/7',
      description: 'Всегда на связи'
    }
  ];

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {features.map((feature, index) => (
            <div key={index} className={styles.feature}>
              <div className={styles.iconWrapper}>
                {feature.icon}
              </div>
              <div className={styles.content}>
                <h4 className={styles.title}>{feature.title}</h4>
                <p className={styles.description}>{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
