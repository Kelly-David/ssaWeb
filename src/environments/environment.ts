// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  firebase: {
    projectId: 'dev-ssa-web',
    appId: '1:101932149228:web:5c5f8d652788ecf74bb8c9',
    databaseURL: 'https://dev-ssa-web-default-rtdb.europe-west1.firebasedatabase.app',
    storageBucket: 'dev-ssa-web.appspot.com',
    locationId: 'europe-west',
    apiKey: 'AIzaSyC8ZcWlLq-18KRqk7rfNknymS0tvWvAWwM',
    authDomain: 'dev-ssa-web.firebaseapp.com',
    messagingSenderId: '101932149228',
  },
  production: false
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
