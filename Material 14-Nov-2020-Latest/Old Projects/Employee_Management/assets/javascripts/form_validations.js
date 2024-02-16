$.validator.setDefaults({
    submitHandler: function() {
        alert("submitted!");
    }
});
$(document).ready(function() {
    $("#loginform").validate({
        rules: {
            firstname: "required",
            lastname: "required",
            username: {
                required: true,
                minlength: 2
            },
            date: {
                required: true,
                
            },
            contactNumber: {
                required: true,
                minlength: 10
                
            },
            date01: {
                required: true,
                
            },
            password: {
                required: true,
                minlength: 5
            },
            confirm_password: {
                required: true,
                minlength: 5,
                equalTo: "#password"
            },
            email: {
                required: true,
                email: true
            },
            agree: "required"
        },
        messages: {
            firstname: "Please enter your firstname",
            lastname: "Please enter your lastname",
            username: {
                required: "Please enter a username",
               
            },
            date: {
                required: "Please provide a date",
                minlength: "Your password must be at least 1 characters long"
            },
            contactNumber: {
                required: "Please provide a contactNumber",
                minlength: "Your contactNumber must be at least 10 characters long"
            },
            date01: {
                required: "Please provide a date",
                minlength: "Your password must be at least 1 characters long"
            },
            password: {
                required: "Please provide a password",
                minlength: "Your password must be at least 5 characters long"
            },
            confirm_password: {
                required: "Please provide a password",
                minlength: "Your password must be at least 5 characters long",
                equalTo: "Please enter the same password as above"
            },
            email: "Please enter a valid email address",
            agree: "Please accept our policy"
        },
        errorElement: "p",
    });
});