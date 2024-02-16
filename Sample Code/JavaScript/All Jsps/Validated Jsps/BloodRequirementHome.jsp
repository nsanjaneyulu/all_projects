
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1" />
<title>Member Form</title>

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
			name: {
			    required: true,
			    alphabets: true,
			},

			address: {
			    required: true,
			},

			email: {
				required: true,
				email: true,
				
			},
			mobno:{
			   required: true,
				number:true,
				minlength:true,
				maxlength:true,
			},
            bloodgroup: "required",
			hospital: "required",
			city: "required",
			reason: "required",			
			

		},
		messages: {
			name: {
			  required: "Enter Your Name",
			  alphabets: jQuery.format("Must Contain Only Alphabets"),
			
			},


			address: {
			  required: "Enter Your Address",
			
			},
			email: {
				required: "Enter Email",
				email: "Please enter a valid email address",
				
			},
			mobno:{
			    required: "Enter Phone Number",
				number: jQuery.format("Enter only Numbers."),
				minlength: jQuery.format("Phone Number must contain 10 digits"),
				maxlength: jQuery.format("Phone Number must contain 10 digits"),
			},
		     bloodgroup: "Select Your Blood Group",			
			 hospital: "Enter Hospital Name",
			 city: "Select Your city",
			 reason: "Reason is Required",
		   
			
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
<center><h1 class="banner">Blood Requirement</h1></center>

<div class="content">
    <div id="signupbox">
       <div id="signuptab">
        <ul>
          <li id="signupcurrent"><a href=" ">Register</a></li>
        </ul>
      </div>
      <div id="signupwrap">
      		<form id="signupform" autocomplete="off" method="post" enctype="multipart/form-data" action="BloodRequirementsSrv">
	  		  <table>
	  		  <tr>
	  		  	<td class="label"><label id="myname" for="name">Name</label></td>
	  		  	<td class="field"><input id="name" name="name" type="text" value="" maxlength="31" /></td>
	  		  	<td class="status"></td>
	  		  </tr>
	  		  <tr>
	  			<td class="label"><label id="myaddress" for="address">Address</label></td>
	  			<td class="field"><textarea name="address" rows='3' cols='20' ></textarea></td>
	  			<td class="status" id="display"></td>
	  		  </tr>
	  		  <tr>
	  			<td class="label"><label id="lemail" for="email">Email</label></td>
	  			<td class="field"><input id="email" name="email" type="text" value="" maxlength="35" /></td>
	  			<td class="status" id="display"></td>
	  		  </tr>
	  		   <tr>
	  			<td class="label"><label id="myphone" for="mobno">Mobile Number</label></td>
	  			<td class="field"><input type="text" id="mobno" name="mobno" maxlength="20"/></td>
	  			<td class="status" id="display"></td>
	  		  </tr>

	  		  <tr>
	  			<td class="label"><label id="mybloodgroup" for="bloodgroup">Blood Group</label></td>
	  			<td class="field"><select name="bloodgroup">
									   <option value="">Select Blood Group</option>
                                       <option value="A+">A+</option>
                                       <option value="A-">A-</option>
                                       <option value="B+">B+</option>
                                       <option value="B-">B-</option>
                                       <option value="O+">O+</option>
                                       <option value="O-">O-</option>
                                       <option value="AB+">AB+</option>
                                       <option value="AB-">AB-</option>
                                       <option value="A1+">A1+</option>
                                       <option value="A1-">A1-</option>
                                       <option value="A2+">A2+</option>
                                       <option value="A2-">A2-</option>
                                       <option value="A1B+">A1B+</option>
                                       <option value="A1B-">A1B-</option>
                                       <option value="A2B+">A2B+</option>
                                       <option value="A2B-">A2B-</option>
                                       <option value="Bombay Blood Group">Bombay Blood Group</option>
								</select></td>
	  			<td class="status" id="display"></td>
	  		  </tr>
	  		  
			  <tr>
	  		  	<td class="label"><label id="hospitalname" for="hospital">Hospital Name</label></td>
	  		  	<td class="field"><input id="hospital" name="hospital" type="text" value="" maxlength="31" /></td>
	  		  	<td class="status"></td>
	  		  </tr>

			  <tr>
	  			<td class="label"><label id="mycity" for="city">City</label></td>
	  			<td class="field"><select name="city" id="city">
		                    <option value="">Select City</option>
                            <option value="ahmedabad">Ahmedabad</option>
                            <option value="bangalore">Bangalore</option>
                            <option value="chandigarh">Chandigarh</option>
                            <option value="chennai">Chennai</option>
                            <option value="coimbattur">Coimbattur</option>
                            <option value="delhi">Delhi</option>
                            <option value="gurgoan">Gurgoan</option>
                            <option value="hyderabad">Hyderabad</option>
                            <option value="kochi">Kochi</option>
                            <option value="kolkata">Kolkata</option>
                            <option value="mangaloore">Mangaloore</option>
                            <option value="mohali">Mohali</option>
                            <option value="mumbai">Mumbai</option>
                            <option value="mysore">Mysore</option>
                            <option value="noida">Noida</option>
                            <option value="pune">Pune</option>
                            <option value="trivandrum">Trivandrum</option>
                            <option value="visakhapatnam">Visakhapatnam</option>                           
                                  </select>
				</td>
	  			<td class="status" id="display"></td>
       		  </tr>

			 
			   <tr>
	  		  	<td class="label"><label id="reasonfor" for="reason">Reason</label></td>
	  		  	<td class="field"> <textarea name="reason" rows='3' cols='20' ></textarea></td>
	  		  	<td class="status"></td>
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