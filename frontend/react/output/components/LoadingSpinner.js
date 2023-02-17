import React from "react";
export default function LoadingSpinner({
  setLoadingWords
}) {
  return /*#__PURE__*/React.createElement("div", {
    key: "spinnerContainer",
    className: "spinnerContainer"
  }, /*#__PURE__*/React.createElement("h1", {
    key: "loadingWords",
    className: "loadingWords"
  }, setLoadingWords), /*#__PURE__*/React.createElement("div", {
    key: "loadingSpinner",
    className: "loadingSpinner"
  }));
}