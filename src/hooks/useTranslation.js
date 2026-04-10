import { useLanguage } from '../context/LanguageContext';
import en from '../translations/en.json';
import fr from '../translations/fr.json';
import ar from '../translations/ar.json';

const translations = {
    en,
    fr,
    ar
};

export const useTranslation = () => {
    const { language } = useLanguage();

    const t = (key) => {
        const keys = key.split('.');
        let value = translations[language];

        for (const k of keys) {
            if (value && typeof value === 'object') {
                value = value[k];
            } else {
                return key; // fallback to key if translation not found
            }
        }

        return value || key;
    };

    return { t, language };
};
