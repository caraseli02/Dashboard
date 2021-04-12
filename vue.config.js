module.exports = {
  // ...other vue-cli plugin options...
  pwa: {
    manifestOptions: {
      name: process.env.VUE_APP_APP_NAME,
      short_name: process.env.VUE_APP_SHORT_NAME,
      start_url: process.env.VUE_APP_START_URL,
      display: "standalone",
      theme_color: process.env.VUE_APP_PRIMARY_COLOR,
      background_color: process.env.VUE_APP_BACKGROUND_COLOR,
      iconPaths: {
        favicon32: `"img/icons/${process.env.VUE_APP_LOGO}-32x32.png"`,
        favicon16: `"img/icons/${process.env.VUE_APP_LOGO}-16x16.png"`,
        appleTouchIcon: `"img/icons/${process.env.VUE_APP_LOGO}-152x152.png"`,
        maskIcon: `"img/icons/${process.env.VUE_APP_LOGO}-safari.svg"`,
        msTileImage: `"img/icons/${process.env.VUE_APP_LOGO}-144x144.png"`,
      },
      icons: [
        {
          src: `"img/icons/${process.env.VUE_APP_LOGO}-192x192.png"`,
          sizes: "192x192",
          type: "image/png",
        },
        {
          src: `"img/icons/${process.env.VUE_APP_LOGO}-512x512.png"`,
          sizes: "512x512",
          type: "image/png",
        },
      ],
    },
  },
  // pwa: {
  //   name: "Caraseli App",
  //   themeColor: "#FFFFFF",
  //   msTileColor: "#0C33F5",
  //   appleMobileWebAppCapable: "yes",
  //   appleMobileWebAppStatusBarStyle: "black",
  // },
};
