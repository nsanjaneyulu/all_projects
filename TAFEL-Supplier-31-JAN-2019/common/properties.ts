var env = 'PROD';
// serviceEndPoint is equivalent to profile service endpoint
export var supplier_access_url;
export var Order_Service_Url;
export var admin_service_endpoint;
export var supplier_item_refund;
export var TAFEL_API_KEY;

export const imageEndPoint = 'https://s3.ap-south-1.amazonaws.com/tafel-images';
if(env === 'PROD'){
    supplier_access_url = 'https://61x07c1tek.execute-api.ap-south-1.amazonaws.com/v1';
    Order_Service_Url = 'https://7av5eqnrx4.execute-api.ap-south-1.amazonaws.com/v1';
    admin_service_endpoint = 'https://isktearpp0.execute-api.ap-south-1.amazonaws.com/v1';
    TAFEL_API_KEY = 'P1MLcx67VI2wv9BpY9gVG4hZcjLA4LFT7aQyn5JQ';   
}
else if(env === 'DEV'){
    supplier_access_url = 'https://qzaup79pdf.execute-api.us-east-1.amazonaws.com/d1';    
    Order_Service_Url =  'https://rzhao30okc.execute-api.us-east-1.amazonaws.com/d1';
    admin_service_endpoint = 'https://t5ckjv4i3i.execute-api.us-east-1.amazonaws.com/d1';
    TAFEL_API_KEY = 'P1MLcx67VI2wv9BpY9gVG4hZcjLA4LFT7aQyn5JQ';   
}
else{
    admin_service_endpoint = 'https://ah92mm3nd2.execute-api.ap-southeast-1.amazonaws.com/dm';
    Order_Service_Url = 'https://45vgzicdcf.execute-api.ap-southeast-1.amazonaws.com/dm';
    supplier_access_url = 'https://i4l9gagh7d.execute-api.ap-southeast-1.amazonaws.com/dm';
    supplier_item_refund = 'https://ffk7oq352d.execute-api.ap-southeast-1.amazonaws.com/dm';
    TAFEL_API_KEY = 'P1MLcx67VI2wv9BpY9gVG4hZcjLA4LFT7aQyn5JQ';
}