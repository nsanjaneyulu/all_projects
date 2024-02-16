<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1" />
<title>User Login Page</title>

<link rel="stylesheet" type="text/css" media="screen" href="css/milk.css" />


<script src="js/jquery.js" type="text/javascript"></script>
<script src="js/jquery.validate.js" type="text/javascript"></script>

<style type="text/css">
	pre { text-align: left; }
</style>

<script id="demo" type="text/javascript">
$(document).ready(function() {
			   
	// validate signup form on keyup and submit
	var validator = $("#signupform").validate({
		rules: {
			
			aname: {
				username: true,
				required: true,
				minlength: 6,
			    maxlength: 15,
				
			},
			apassword: {
				required: true,
				minlength: 6,
				maxlength: 15,
			},
			
		},
		messages: {
			
			aname: {
				required: "Username is Required",
					minlength: jQuery.format("Enter at least {0} characters"),
                maxlength: jQuery.format("Username should not exceed {0} charactertcs"),
				
			},
			apassword: {
				required: "Provide a password",
				rangelength: jQuery.format("Enter at least {0} characters"),
				maxlength: jQuery.format("Password should not exceed {0} charactertcs"),
			},
					
		},

		 
		// the errorPlacement has to take the table layout into account
		errorPlacement: function(error, element) {
           
			if ( element.is(":radio") )
				
				error.appendTo( element.parent().next() );
			else if ( element.is(":checkbox") )
				error.appendTo ( element.next() );
			else
				$().removeClass("");
				error.appendTo( element.parent().next() );
		},
		// specifying a submitHandler prevents the default submit
		submitHandler: function() {
			alert("submitted!");
		},
		// set this class to error-labels to indicate valid fields
		success: function(label) {
			// set &nbsp; as text for IE
			label.html("&nbsp;").addClass("checked");

		}
	});
	
	    //Customized Rule for username
	    $.validator.addMethod("username",function(value,element)
        {
            return this.optional(element) || /^[a-z0-9.]{1,15}$/i.test(value); 
        },"Invalid Username");


    

});
</script> 

</head>
<body>


<div id="main">

<div id="content">

<div style="clear: both;"><div></div></div>
<center><h1 class="banner">Login Form</h1></center>

<div class="content">
    <div id="signupbox">
       <div id="signuptab">
        <ul>
          <li id="signupcurrent"><a href=" ">Admin Login</a></li>
        </ul>
      </div>
      <div id="signupwrap">
      		<form id="signupform" autocomplete="off" method="post" enctype="multipart/form-data" action="./adminlogin">
	  		  <table>
	  		 
	  		  <tr>
	  			<td class="label"><label id="lusername" for="username">Username</label></td>
	  			<td class="field"><input id="username" name="aname" type="text" value="" maxlength="31" /></td>
	  			<td class="status" id="display"></td>
	  		  </tr>
	  		  <tr>
	  			<td class="label"><label id="lpassword" for="password">Password</label></td>
	  			<td class="field"><input id="password" name="apassword" type="password" maxlength="30" value="" /></td>
	  			<td class="status" id="display"></td>
	  		  </tr>
	  		 
	  		  <tr>
	  			<td class="label"><label id="lsignupsubmit" for="signupsubmit">Login</label></td>
	  			<td class="field" colspan="2">
	            <input id="signupsubmit" name="signup" type="submit" value="Submit" />
	            <input id="signupsubmit" name="signup" type="Reset" value="Reset" />
	  			</td>
	  		  </tr>

	  		  </table>
          </form>
      </div>
    </div>
</div>

</div>

</div>


</body>
</html>