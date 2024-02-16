const { template } = require("../assets/templateFn");

export const environment = {
  production: true,
  serverURL: "https://uwdyscvz9f.execute-api.us-west-2.amazonaws.com/Prod/Api/",
  // tslint:disable-next-line:max-line-length
  dataCollectorURL: template`https://collectorsvc.ecustomersupport.com/DCCSProxy/Service/vdccs.js?AccountName=${0}&SessionID=${1}`,
  dataFingerPrintingURL: template`https://h.online-metrix.net/tags.js?org_id=${0}&session_id=${1}`,
  vestaServiceURL:
    "https://vsafe1token.ecustomerpayments.com/GatewayV4ProxyJSON/Service",
  AccountName: "newseasonsmarket",
};
