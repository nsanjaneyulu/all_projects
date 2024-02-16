// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiBase: 'http://50.62.35.149:8200/',
  basicURL: 'https://devapi.workruit.com/api/',
  imgURL: 'https://devimages.workruit.com/resources',
  env: 'dev'
  
};
export const baseUrl = environment.basicURL;
export const imgURL = environment.imgURL;
// console.log(localStorage.getItem('userData'));
const sessionId = "5fdc55b08b77423e896f55a0cbdb5961";
export const endpoints = {
  get: {
    getCompanyProfile: '/getCompanyProfile',
    profiles:'/profiles',
    job:'job/',
    user:'user/',
    viewPostedJobs:'/viewPostedJobs',
    recruiterInterestedProfiles: '/recruiterInterestedProfiles',
    recruiterApplicantMatches: '/recruiterApplicantMatches',
    recruiterSavedProfiles: '/recruiterSavedProfiles',
    getRecruiterProfile: '/getRecruiterProfile',
    getRecInterviewsList: '/getRecInterviewsList',
    masterData: 'masterData',
    dashboardLogout: 'dashboardLogout'
  
  },
  post: {
    dashboardLogin:'dashboardLogin',
    recruiterSignup:'recruiterSignup',
    saveCompany: 'saveCompany',
    resetPasswordLinkToEmail: 'resetPasswordLinkToEmail',
    updateUserPassword: '/updateUserPassword',
    postjob: '/postjob',
    updateRecruiterProfile: '/updateRecruiterProfile'
  },
  uploads: {
    
  }
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
