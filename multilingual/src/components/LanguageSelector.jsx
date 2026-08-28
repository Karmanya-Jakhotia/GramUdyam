import React, { useEffect } from "react";

function LanguageSelector() {
  useEffect(() => {
    // Google Translate initialization
    window.googleTranslateElementInit = () => {
      if (
        window.google &&
        window.google.translate &&
        document.getElementById("google_translate_element")
      ) {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "en",

            // Indian languages supported by our module
            includedLanguages:
              "en,hi,mr,ta,te,ml,kn,gu,bn,pa,or,as,ur",

            autoDisplay: false,
          },
          "google_translate_element"
        );
      }
    };

    // Check whether the script is already loaded
    const existingScript = document.getElementById(
      "google-translate-script"
    );

    if (!existingScript) {
      const script = document.createElement("script");

      script.id = "google-translate-script";
      script.src =
        "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;

      document.body.appendChild(script);
    }

    return () => {
      window.googleTranslateElementInit = null;
    };
  }, []);

  return (
    <div className="language-selector">
      <span>🌐 Language:</span>

      <div id="google_translate_element"></div>
    </div>
  );
}

export default LanguageSelector;