app.config(['$routeProvider',function($routeProvider) {
    $routeProvider
        .when("/home", {
            templateUrl: "template/home.html"
        })
        .when("/services", {
            templateUrl: "template/services.html"
        })
        .when("/contact", {
            templateUrl: "template/contact.html"
        })
    	.otherwise("/home");
}])