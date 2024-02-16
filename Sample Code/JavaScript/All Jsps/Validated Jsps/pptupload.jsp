




<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1" />
<title>Paper Presentation Upload</title>

<link rel="stylesheet" type="text/css" media="screen" href="css/milk.css" />
<link rel="stylesheet" type="text/css" media="screen" href="css/stylesheet.css" />
<link rel="stylesheet" type="text/css" media="screen" href="css/tableStyle.css" />
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core" %>

<%@ page import="net.tanesha.recaptcha.ReCaptcha" %>
   <%@ page import="net.tanesha.recaptcha.ReCaptchaFactory" %>
   <script type="text/javascript">
 var RecaptchaOptions = {
    theme:'white'};
 </script>

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
		    title: {
			    required: true,
			    alphabets: true,
			},
            description: "required",
			uploadfile1:{
				required: true,
				file: true,
				},
			uemail: {
				required: true,
				email: true,
				
			},

			uccode: {
				
				required: true,
				number: true,
				minlength: 1,
			    maxlength: 4,
				
			},
			ucity: {
				required: true,
				alpahabets: true,
			},
			umblno:{
			    required: true,
			    number: true,
				minlength: 10,
				maxlength: 10,
			},
			country: {
			    required: true,
			    alphabets: true,
			},
			
            select: "required",
			
			

		},
		messages: {
			title: {
			  required: "Enter Title.",
			  alphabets: jQuery.format("Title Must Contain Only Alphabets."),
			
			},
			description: "Enter the Description.",	
			uploadfile1:{
			  required: "File is Required.",
			  file: "Invalid File Format",
			},

            uemail: {
				required: "Enter Email.",
				email: "Please enter a valid email address.",
				
			},
			uccode: {
				required: "Country Code is Required.",
				number: jQuery.format("Enter only Numbers."),
			    minlength: jQuery.format("Enter at least {0} Numbers."),
                maxlength: jQuery.format("Country Code should not exceed {0} Numbers."),
				
			},
			ucity: {
				required: "Enter Your City.",
				alphabets: jQuery.format("City Must Contain Alphabets Only.")
			},
			umblno:{
			    required: "Enter Phone Number.",
				number: jQuery.format("Enter only Numbers."),
				minlength: jQuery.format("Phone Number must contain 10 digits."),
				maxlength: jQuery.format("Phone Number must contain 10 digits."),
			},
			
			country: {
			  required: "Enter Your Country.",
			  alphabets: jQuery.format("Country Name Must Contain Only Alphabets."),
			
			},
		    select: "Select Your Technology.",

			
			
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
	
	    

       //Customized Rule for alphabets
	    $.validator.addMethod("alphabets",function(value,element)
        {
            return this.optional(element) || /^[a-zA-Z]+$/i.test(value); 
        },"Must Contain Alphabets Only.");

		 //Customized Rule for File Upload
	    $.validator.addMethod("file",function(value,element)
        {
            return this.optional(element) || /(\.|\/)(doc|docx|pdf|rtf)$/i.test(value);     
        },"Unknown file format.");

});
</script> 

</head>
<body>


<div id="main">

<div id="content">

<div style="clear: both;"><div></div></div>
<center><h1 class="banner">Upload Paper Presentations</h1></center>

<div class="content">
    <div id="signupbox">
       <div id="signuptab">
        <ul>
          <li id="signupcurrent">Paper Presentations</li>
        </ul>
      </div>
      <div id="signupwrap">
      		<center>
  <pre>
  <a href="paperpresentationshome.jsp">BACK<img  src="images/back.jpg" width="35" height="23" border="0" ></a><a href="HOME.jsp">HOME<img src="images/home.png" width="35" height="23" border="0" ></a>
  </pre>
  </center>
      <form  id="signupform" action="./pptupload?category=upload" name="pptupload" method="post" enctype="multipart/form-data">
  <table align="center">
	  		  <table>
	  		  <tr>
	  		  	<td class="label"><label id="mytitle" for="title">Title</label></td>
	  		  	<td class="field"><input type="text" name="title" /></td>
	  		  	<td class="status"></td>
	  		  </tr>
	  		  <tr>
	  			<td class="label"><label id="mydescription" for="description">Description</label></td>
	  			<td class="field"><textarea name="description" rows='5' cols='35' ></textarea></td>
	  			<td class="status" id="display"></td>
	  		  </tr>
	  		  <tr>
	  			<td class="label"><label id="uploadfile" for="uploadfile1">Upload File(Ex: doc|docx|pdf|rtf)</label></td>
	  			<td class="field"><input type="file" name="uploadfile1"></td>
	  			<td class="status" id="display"></td>
	  		  </tr>
	  		  <tr>
	  			<td class="label"><label id="urcity" for="ucity">Enter The Code Shown in Image</label></td>
	  			<td class="field"><% ReCaptcha c = ReCaptchaFactory.newReCaptcha("6Lc5DcsSAAAAAN73shlGo5riRU-Io-TBBCDn3oY3 ","6Lc5DcsSAAAAADq3nu-Sxd3zD4x0FNB8Ykx8ffRG" , false);
         out.print(c.createRecaptchaHtml(null, null));
       %></td>
	  			<td class="status" id="display"></td>
	  		  </tr>

			     <c:if test="${param.captcha eq 'false'}" >
                <tr>
                <td><font color="red">Error:</font></td>
                <td><font color="red">incorrect code try again</font></td>
                </tr>
                  </c:if>

	  		 


	  		  <tr>
	  			<td class="label"><label id="lsignupsubmit" for="signupsubmit"></label></td>
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