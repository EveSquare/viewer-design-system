const en = require("./translations.en.json");
const ja = require("./translations.ja.json");
const ja_kana = require("./translations.ja_kana.json");

const i18n = {
    translations: {
        en,
        ja,
        ja_kana,
    },
    defaultLang: "ja",
    useBrowserDefault: true,
};

module.exports = i18n;