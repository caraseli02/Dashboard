module.exports = {
  // ...other vue-cli plugin options...
  pwa: {
    name: process.env.VUE_APP_APP_NAME,
    themeColor: process.env.VUE_APP_BACKGROUND_COLOR,
    msTileColor: process.env.VUE_APP_PRIMARY_COLOR,
    appleMobileWebAppCapable: "yes",
    appleMobileWebAppStatusBarStyle: "black",
  },
};
