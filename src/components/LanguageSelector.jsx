const LanguageSelector =({ language, setLanguage }) => (
    <div className="flex gap-2">
        <button onClick={() => setLanguage('tr')} className={language === 'tr' ? 'font-bold' : ''}>Türkçe</button>
        <button onClick={() => setLanguage('en')} className={language === 'en' ? 'font-bold': ''}>English</button>
    </div>
);
export default LanguageSelector;