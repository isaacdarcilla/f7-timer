# Event Timer for Android

🔥 A time management application built with Framework7 and Javascript

![](https://framework7.io/i/brand-logos/pwa-red.svg)

Event Timer is a simple application for a synchronized and centralized time designed and developed by <b>Isaac D. Arcilla</b> of the College of Engineering using web technologies.

## API

Live Server at [Heroku](https://event-timer.herokuapp.com/). Message me for API documentation.

## NPM Scripts

* 🔥 `start` - run development server
* 🔧 `dev` - run development server
* 🔧 `build-dev` - build web app using development mode (faster build without minification and optimization)
* 🔧 `build-prod` - build web app for production
* 📱 `build-dev-cordova` - build cordova app using development mode (faster build without minification and optimization)
* 📱 `build-prod-cordova` - build cordova app
* 📱 `build-dev-cordova-ios` - build cordova iOS app using development mode (faster build without minification and optimization)
* 📱 `build-prod-cordova-ios` - build cordova iOS app
* 📱 `build-dev-cordova-android` - build cordova Android app using development mode (faster build without minification and optimization)
* 📱 `build-prod-cordova-android` - build cordova Android app
* 🖥 `build-dev-cordova-electron` - build cordova Electron app using development mode (faster build without minification and optimization)
* 🖥 `build-prod-cordova-electron` - build cordova Electron app
* 🖥 `cordova-electron` - launch quick preview (without full build process) of Electron app in development mode

## WebPack

There is a webpack bundler setup. It compiles and bundles all "front-end" resources. You should work only with files located in `/src` folder. Webpack config located in `build/webpack.config.js`.

Webpack has specific way of handling static assets (CSS files, images, audios). You can learn more about correct way of doing things on [official webpack documentation](https://webpack.js.org/guides/asset-management/).

## PWA

This is a PWA. Don't forget to check what is inside of your `service-worker.js`. It is also recommended that you disable service worker (or enable "Update on reload") in browser dev tools during development.

## Cordova

Cordova project located in `cordova` folder. You shouldn't modify content of `cordova/www` folder. Its content will be correctly generated when you call `npm run cordova-build-prod`.

## Cordova Electron

There is also cordova Electron platform installed. To learn more about it and Electron check this guides:

* [Cordova Electron Platform Guide](https://cordova.apache.org/docs/en/latest/guide/platforms/electron/index.html)
* [Official Electron Documentation](https://electronjs.org/docs)

## Assets

Assets (icons, splash screens) source images located in `assets-src` folder. To generate your own icons and splash screen images, you will need to replace all assets in this directory with your own images (pay attention to image size and format), and run the following command in the project directory:

```
framework7 generate-assets
```

Or launch UI where you will be able to change icons and splash screens:

```
framework7 generate-assets --ui
```

## Screenshot

![Screenshot](https://github.com/isaacdarcilla/f7-timer/blob/master/src/assets/_home_isaac_Desktop_Dev_identification-scanner-vue_www_index.html.png)

## Documentation & Resources

* [Framework7 Core Documentation](https://framework7.io/docs/)
* [Framework7 Vue Documentation](https://framework7.io/vue/)

* [Framework7 Icons Reference](https://framework7.io/icons/)
* [Community Forum](https://forum.framework7.io)

## Support Framework7

Love Framework7? Support project by donating or pledging on patreon:
https://patreon.com/vladimirkharlampidi

## Android Package

📱 Download the android APK http://bit.ly/3amZt4M
