import React, { useRef } from "react";
import "./i18n";
import { Trans, useTranslation } from "react-i18next";
import { Button } from "antd";

// 语言切换
const lngs = {
  en: { nativeName: "English" },
  zh: { nativeName: "Chinese" },
};

/**
 *  https://www.i18next.com/
 *  https://locize.com/blog/react-i18next/
 *
 *  npm install i18next react-i18next i18next-browser-languagedetector
 * */
export const I18nextReact = () => {
  const { t, i18n } = useTranslation(); // 使用 hook

  const nativeName = useRef();

  return (
    <div className="App">
      <header className="App-header">
        <div>
          {Object.keys(lngs).map((lng) => (
            <Button
              key={lng}
              style={{
                fontWeight: i18n.resolvedLanguage === lng ? "bold" : "normal",
              }}
              onClick={() => {
                nativeName.current = lngs[lng].nativeName;
                return i18n.changeLanguage(lng);
              }}
            >
              {lngs[lng].nativeName}
            </Button>
          ))}
        </div>
        <p>
          <Trans i18nKey="description.part1">
            {" "}
            {/* 使用 Trans 组件 */}
            Edit <code>src/App.js</code> and save to reload.
          </Trans>
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          {t("description.part2", { nativeName: nativeName.current })}
        </a>
      </header>
    </div>
  );
};
