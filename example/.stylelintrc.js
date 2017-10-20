module.exports = {
  extends: "stylelint-config-sass-guidelines",
  ignoreFiles: [
    "./node_modules/**/*",
  ],
  rules: {
    "order/properties-alphabetical-order": null,
    "rule-empty-line-before": null,
    "max-nesting-depth": 3, // needed because of BEM, try to not increase this number
  }
};
