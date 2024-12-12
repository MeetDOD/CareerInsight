import { useEffect, useState } from "react";

const GoogleTranslate = () => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        window.googleTranslateInit = () => {
            if (!window.google.translate.TranslateElement) {
                setTimeout(window.googleTranslateInit, 100);
            } else {
                new window.google.translate.TranslateElement({
                    pageLanguage: 'en',
                    includedLanguages: 'en,hi,pa,sa,mr,ur,bn,ta,te,kn,ml,gu,or,as,ne,si,ks,ma,sd,bo',
                    layout: window.google.translate.TranslateElement.InlineLayout.HORIZONTAL,
                    defaultLanguage: 'en',
                }, 'google_element');
            }
        };

        const loadGoogleTranslateScript = () => {
            if (!document.getElementById("google_translate_script")) {
                const script = document.createElement("script");
                script.type = "text/javascript";
                script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateInit";
                script.id = "google_translate_script";
                script.onerror = () => console.error('Error loading Google Translate script');
                document.body.appendChild(script);
            }
        };

        loadGoogleTranslateScript();

        if (window.google && window.google.translate) {
            window.googleTranslateInit();
        }

    }, []);

    return (
        <div id="google_element" className={`google-translate-container ${isVisible ? '' : 'hidden'}`}></div>
    );
};

export default GoogleTranslate;