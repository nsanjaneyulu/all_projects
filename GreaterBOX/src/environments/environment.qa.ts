const { template } = require("../assets/templateFn");

export const environment = {
  production: false,
  serverURL: "https://dnjeuh97z0.execute-api.us-west-2.amazonaws.com/Prod/Api/",
  dataCollectorURL: template`https://riskcsproxy.ecustomersupport.com/DCCSProxy/Service/vdccs.js?AccountName=${0}&SessionID=${1}`,
  dataFingerPrintingURL: template`https://h.online-metrix.net/tags.js?org_id=${0}&session_id=${1}`,
  vestaServiceURL:
    "https://vsafesandboxtoken.ecustomersupport.com/GatewayV4ProxyJSON/Service",
  AccountName: "rvN0xDQSFhrsMqBt5AGIKQ==",
};
