import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  // 检测语言，more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // 将i18n实例传递给react-i18next。
  .use(initReactI18next)
  // init i18next，更多选项: https://www.i18next.com/overview/configuration-options
  .init({
    debug: true,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources: {
      en: {
        translation: {
          description: {
            part1: 'Edit <1>src/App.js</1> and save to reload.',
            part2: 'Learn React :: {{nativeName}}',
          },
        },
      },
      zh: {
        translation: {
          description: {
            part1: '编辑<1>src/App.js</1>并保存以重新加载。',
            part2: '学习 React :: {{nativeName}}',
          },
        },
      },
    },
  }).then(() => {
    console.log('i18next ok');
  });

export default i18n;
