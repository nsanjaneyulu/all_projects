$(document).ready(function() {
    $("#forgotPasswordForm").validate({
        rules: {
            email: {
                required: true
            }
        },
        messages: {
            email: {
                required: "Please provide valid email address"
            }
        }
    });
    $("#loginForm").validate({
        rules: {
            userName: {
                required: true
            },
            password: {
                required: true
            }
        },
        messages: {
            userName: {
                required: "Please provide valid user name"
            },
            password: {
                required: "Please provide valid password"
            }
        }
    });
     $("#newPasswordGenerate").validate({
        rules: {
                  
           
            email: {
                required: true
            },
             currentPassword: {
                required: true
            },
            newPassword: {
                required: true
            },
            confirmPassword: {
                required: true
            }
        },
        messages: {
             email: {
                required: "Please provide valid email address"
            },
            currentPassword: {
                required: "Please provide valid Current Password"
            },
            newPassword: {
                required: "Please provide valid New Password"
            },
            confirmPassword: {
                required: "Please provide valid Confirm Password"
                
            }
        }
    });
    $("#registerPTH").validate({
        rules: {
            firstName: {
                required: true
            },          
            contactNumber: {
                required: true
            },
            email: {
                required: true
            },
            password: {
                required: true
            },
            confirmPassword: {
                required: true
            }
        },
        messages: {
            firstName: {
                required: "Please provide valid First Name"
            },
            contactNumber: {
                required: "Please provide valid Contact Number"
            },
            email: {
                required: "Please provide valid email address"
            },
            password: {
                required: "Please provide valid password"
            },
            confirmPassword: {
                required: "Please provide valid password"
                
            }
        }
    });
});