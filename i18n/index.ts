import en_US from './en_US.json';

let currentLang = 'English';

interface Translations {
    [key: string]: string;
}

const translations: { [key: string]: Translations } = {
    English: en_US,
};

const setLanguage = (lang: string) => {
    if (!translations[lang]) {
        throw new Error(`Failed to set Language for ${lang}`);
    }

    currentLang = lang;
};

const t = (key: string, lang: string = currentLang) => {
    if (!translations[lang]) {
        throw new Error(`Failed to load Language for ${lang}`);
    }

    // Always default to English
    return translations[lang][key] || translations['English'][key];
};

export {currentLang, setLanguage, t, translations};
