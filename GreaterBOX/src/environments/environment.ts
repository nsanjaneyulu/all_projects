// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

const { template } = require("../assets/templateFn");

export const environment = {
  production: false,
  serverURL: "https://localhost:44385/Api/",
  dataCollectorURL: template`https://riskcsproxy.ecustomersupport.com/DCCSProxy/Service/vdccs.js?AccountName=${0}&SessionID=${1}`,
  dataFingerPrintingURL: template`https://h.online-metrix.net/tags.js?org_id=${0}&session_id=${1}`,
  vestaServiceURL:
    "https://vsafesandboxtoken.ecustomersupport.com/GatewayV4ProxyJSON/Service",
  AccountName: "rvN0xDQSFhrsMqBt5AGIKQ==",
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
