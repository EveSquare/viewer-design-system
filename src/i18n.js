import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
    en: {
        translation: {
            "Welcome to React": "Welcome to React and react-i18next",
            "閉じる": "Close",
        }
    },
};

i18n
    .use(Backend) // lazy loads translations from /public/locales
    .use(LanguageDetector) // detect user language
    .init({
        fallbackLng: 'ja-JP',
        debug: true,
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;