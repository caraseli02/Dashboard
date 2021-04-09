module.exports = {
  // ...other vue-cli plugin options...
  //pwa: {
  // manifestOptions: {
  //   name: process.env.VUE_APP_APP_NAME,
  //   short_name: process.env.VUE_APP_SHORT_NAME,
  //   start_url: process.env.VUE_APP_START_URL,
  //   display: "standalone",
  //   theme_color: process.env.VUE_APP_PRIMARY_COLOR,
  //   background_color: process.env.VUE_APP_BACKGROUND_COLOR,
  //   icons: [
  //     {
  //       src: `src/assets/${process.env.VUE_APP_LOGO}-192x192.png`,
  //       sizes: "192x192",
  //       type: "image/png",
  //     },
  //     {
  //       src: `src/assets/${process.env.VUE_APP_LOGO}-512x512.png`,
  //       sizes: "512x512",
  //       type: "image/png",
  //     },
  //   ],
  // },
  //},
  pwa: {
    name: "Apimosa App",
    themeColor: "#FFFFFF",
    msTileColor: "#0C33F5",
    appleMobileWebAppCapable: "yes",
    appleMobileWebAppStatusBarStyle: "black",
  },
};
