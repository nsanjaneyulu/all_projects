
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1" />
<title>Online Classes</title>

<link rel="stylesheet" type="text/css" media="screen" href="css/milk.css" />
<link rel="stylesheet" type="text/css" media="screen" href="css/stylesheet.css" />
<link rel="stylesheet" type="text/css" media="screen" href="css/tableStyle.css" />


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
			uname: {
			    required: true,
			    alphabets: true,
			},

			email: {
				required: true,
				email: true,
				
			},

			uccode: {
			    required: true,
			    number: true,
				minlength: 1,
			    maxlength: 4,
			},
            umblno:{
			    required: true,
			    number: true,
				minlength: 10,
				maxlength: 10,
			},

			ucity: {
			    required: true,
			    alphabets: true,
			},
			country: {
			    required: true,
			    alphabets: true,
			},

		    select: "required",
			text: "required",
		

		},
		messages: {
			uname: {
			  required: "Enter Your Name.",
			  alphabets: jQuery.format("Must Contain Only Alphabets."),
			
			},

			email: {
				required: "Enter Email.",
				email: "Please enter a valid email address.",
				
			},

			uccode:{
			    required: "Enter Country Code.",
				number: jQuery.format("Enter only Numbers."),
				minlength: jQuery.format("Country Code must contain atleast {0} Numbers."),
				maxlength: jQuery.format("Country Code must not exceed {0} Numbers."),
			},

			umblno:{
			    required: "Enter Phone Number.",
				number: jQuery.format("Enter only Numbers."),
				minlength: jQuery.format("Phone Number must contain 10 digits."),
				maxlength: jQuery.format("Phone Number must contain 10 digits."),
			},

			ucity: {
			  required: "Enter Your City",
			  alphabets: jQuery.format("Must Contain Only Alphabets."),
			
			},
            country: {
			  required: "Enter Your Country.",
			  alphabets: jQuery.format("Must Contain Only Alphabets."),
			
			},
		    select: "Select Your Subject.",
		    text: "Additional Details are Required.",				


			
			
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
	    $.validator.addMethod("userid",function(value,element)
        {
            return this.optional(element) || /^[a-z0-9.]{1,15}$/i.test(value); 
        },"Invalid Username");


    //Customized Rule for File Upload
	    $.validator.addMethod("file",function(value,element)
        {
            return this.optional(element) || /(\.|\/)(doc|docx|rtf)$/i.test(value);     
        },"Unknown file format.");

    //Customized Rule for alphabets
	    $.validator.addMethod("alphabets",function(value,element)
        {
            return this.optional(element) || /^[a-zA-Z]+$/i.test(value); 
        },"Must Contain Alphabets Only");

});
</script> 

</head>
<body>


<div id="main">

<div id="content">

<div style="clear: both;"><div></div></div>
<center><h1 class="banner">Welcome to join Online Classes</h1></center>

<div class="content">
    <div id="signupbox">
       <div id="signuptab">
        <ul>
          <li id="signupcurrent"><a href=" ">Register Here</a></li>
        </ul>
      </div>
      <div id="signupwrap">
      		<form id="signupform" autocomplete="off" method="post" enctype="multipart/form-data" action="./onlineservlet?input=save">
	  		  <table>
	  		  <tr>
	  		  	<td class="label"><label id="urname" for="uname">Your Name</label></td>
	  		  	<td class="field"><input id="uname" name="uname" type="text" value="" maxlength="31" /></td>
	  		  	<td class="status"></td>
	  		  </tr>
	  		  <tr>
	  			<td class="label"><label id="lemail" for="email">Email</label></td>
	  			<td class="field"><input id="email" name="email" type="text" value="" maxlength="35" /></td>
	  			<td class="status" id="display"></td>
	  		  </tr>
	  		  <tr>
	  			<td class="label"><label id="countrycode" for="uccode">Country Code</label></td>
	  			<td class="field"><input id="uccode" name="uccode" type="text" value="" maxlength="31" /></td>
	  			<td class="status" id="display"></td>
	  		  </tr>
	  		  <tr>
	  			<td class="label"><label id="urmblno" for="umblno">Mobile Number</label></td>
	  			<td class="field"><input type="text" id="umblno" name="umblno" maxlength="20"/></td>
	  			<td class="status" id="display"></td>
	  		  </tr>
	  		  <tr>
	  			<td class="label"><label id="urcity" for="ucity">City</label></td>
	  			<td class="field"><input id="ucity" name="ucity" type="text" maxlength="30" value="" /></td>
	  			<td class="status" id="display"></td>
	  		  </tr>

			  <tr>
	  			<td class="label"><label id="urcountry" for="country">Country</label></td>
	  			<td class="field"><input id="country" name="country" type="text" maxlength="30" value="" /></td>
	  			<td class="status" id="display"></td>
	  		  </tr>
	  		  

			  <tr>
	  			<td class="label"><label id="mysubject" for="subject">Subject</label></td>
	  			<td class="field"><select name="select">
	                                   <option value="">Select Subject</option>
                                       <option value="corejava">corejava</option>
                                       <option value="jdbc">jdbc</option>
                                       <option value="servlets">servlets</option>
                                       <option value="jsp">jsp</option>
                                       <option value="hibernate">hibernate</option>
	                                   <option value="spring">spring</option>
	                                   <option value="struts">struts</option>
	                                   <option value="webservices">webservices</option>
                                  </select>
				</td>
	  			<td class="status" id="display"></td>
       		  </tr>

			  <tr>
	  			<td class="label"><label id="mytext" for="text">Additional Details</label></td>
	  			<td class="field"><textarea name= "text" rows="4" cols="28"></textarea></td>
	  			<td class="status" id="display"></td>
	  		  </tr> 
			  

	  		  <tr>
	  			<td class="label"><label id="lsignupsubmit" for="signupsubmit">Register</label></td>
	  			<td class="field" colspan="2">
	            <input id="signupsubmit" name="signup" type="submit" value="Register" />
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