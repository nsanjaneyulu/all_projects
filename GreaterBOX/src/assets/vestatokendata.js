VestTokenService = function(serviceURL, accountName, cardNumber,cb_onSuccess,cb_onFailed) {  
  vestatoken.init({
    ServiceURL: serviceURL,
    AccountName: accountName
  });  
  vestatoken.getcreditcardtoken({
    ChargeAccountNumber: cardNumber,
    onSuccess : cb_onSuccess,
    onFailed : cb_onFailed,
    onInvalidInput : cb_onFailed
    //   return {
    //     IsSuccess: true,
    //     ResponseText: "Success",
    //     ChargeAccountNumberToken: data.ChargeAccountNumberToken,
    //     PaymentDeviceLast4: data.PaymentDeviceLast4,
    //     PaymentDeviceTypeCD: data.PaymentDeviceTypeCD
    //   };
  });
};
