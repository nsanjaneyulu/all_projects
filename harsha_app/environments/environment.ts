// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiBase: 'http://50.62.35.149:8200/',
  env: 'dev'
};
const baseUrl = environment.apiBase;
console.log(localStorage.getItem('userData'));
const sessionId = localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData')).user_id : false;
export const endpoints = {
  get: {
    getRecentActivityData: baseUrl + 'getRecentRequestsData/' + sessionId,
    getUserProfile: baseUrl + 'getUserProfile/',
    getUserRequestsData: baseUrl + 'getUserRequestsData/' + sessionId,
    getMasterData: baseUrl + "getMasterData/" + sessionId,
    getRequestDataForPDF: baseUrl + "getRequestDataForPDF/" + sessionId + '/',
    getPreFormLettersList: baseUrl + "getPreFormLettersList/" + sessionId + '/',
    generatePdf: baseUrl + "getDoc/" + sessionId + '/',
    getAllUsers: baseUrl + "getAllUsers",
    getAccessArea: baseUrl + 'getAccessArea/',
  },
  post: {
    login: baseUrl + 'userLogin',
    setPassword: baseUrl + 'setPassword',
    createRequest: baseUrl + 'createRequest/',
    createUser: baseUrl + 'createUser',
    createEntryInGeneration: baseUrl + 'createEntryInGeneration/',
    uploadReqFile: baseUrl + 'uploadReqFile/',
    createCountry: baseUrl + 'createCountry',
    createStore: baseUrl + 'createStore',
    createRole: baseUrl + 'createRole',
    createOrUpdatePermissions: baseUrl + 'createOrUpdatePermissions',
    getFilteredData: baseUrl + 'getFilteredData/',
    updateRequest: baseUrl + 'updateRequest',
    updateUserProfile: baseUrl + 'updateUserProfile',
    updatePasswordByUser: baseUrl + 'updatePasswordByUser'
  },
  uploads: {
    updateRequestResponseAttachment: baseUrl + 'updateRequestResponseAttachment'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
