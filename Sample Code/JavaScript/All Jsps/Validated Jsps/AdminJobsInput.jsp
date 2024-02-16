<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1" />
<title>Registration Page</title>

<link rel="stylesheet" type="text/css" media="screen" href="css/milk.css" />
<script type="text/javascript" src="scripts/calendar.js"></script>

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
			companyName: {
			    required: true,
			    username: true,
			},

			jobTitle: {
			    required: true,
			    alphabets: true,
			},

			qualification: {
				required: true,		
			},
			interviewLocation: {
				required: true,
			},
			workLocation: {
				required: true,
			},
			
			lastDatetoApply: {
				   required: true,
			       date: true,
				   },
		    description: {
				required: true,
			},

		},
		messages: {
			companyName: {
			  required: "Enter Comany Name",
			  username: jQuery.format("Inavalid Company Name"),
			
			},


			jobTitle: {
			  required: "Enter Job Title",
			  alphabets: jQuery.format("Must Contain Only Alphabets"),
			
			},
			qualification: {
				required: "Select Your Qualification",
			},
			interviewLocation: {
				required: "Select Interview Location",
			},
			workLocation: {
				required: "Select Work Location",
			},

			lastDatetoApply: {
                 required: "Enter Date",
				 date: jQuery.format("Enter Valid Date."),
				},
		    description: {
				required: "Select Work Location",
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
<center><h1 class="banner">ENTER JOB OPPORTUNITY DETAILS</h1></center>

<div class="content">
    <div id="signupbox">
       <div id="signuptab">
        <ul>
          <li id="signupcurrent"><b>Note: Enter IT/Software related jobs only.</b></li>
        </ul>
      </div>
      <div id="signupwrap">
	   <a href="DisplayJobsToAdmin.jsp"><IMG align="right" SRC="images/icons/restart.png" WIDTH="25" HEIGHT="23" BORDER="0" ALT=""></a>
           <a href="JobsHome.jsp"><IMG align="right" SRC="images/icons/home.png" WIDTH="25" HEIGHT="23" BORDER="0" ALT=""></a>
      		<form id="signupform" name="inputjobs" autocomplete="off" method="post" enctype="multipart/form-data" action="adminInput.do">
	  		  <table>
	  		  <tr>
	  		  	<td class="label"><label id="mycompanyname" for="companyName">Company Name</label></td>
	  		  	<td class="field"><INPUT class="text" TYPE="text" NAME="companyName"></td>
	  		  	<td class="status"></td>
	  		  </tr>
	  		  <tr>
	  			<td class="label"><label id="myjobTitle" for="jobTitle">Job Title</label></td>
	  			<td class="field"><INPUT class="text" TYPE="text" NAME="jobTitle"></td>
	  			<td class="status" id="display"></td>
	  		  </tr>
	  		  <tr>
	  			<td class="label"><label id="myQualification" for="qualification">Qualification</label></td>
	  			<td class="field"><SELECT class="mult" NAME="qualification" size="">
				            <option value="">Select Qualification</option>
                            <option value="BE/B.TECH">BE/B.TECH</option>
                            <option value="BCA">BCA</option>
                            <option value="BSC">BSC</option>
                            <option value="B.Com">B.Com</option>
                            <option value="ME/M.TECH">ME/M.TECH</option>                            
                            <option value="MCA">MCA</option>                            
                            <option value="MSC">MSC</option>
                            <option value="MBA">MBA</option>
                            <option value="Any Graduate">Any Graduate</option>
                        </SELECT></td>
	  			<td class="status" id="display"></td>
	  		  </tr>
	  		  <tr>
	  			<td class="label"><label id="myInterviewLocation" for="interviewLocation">Interview Location</label></td>
	  			<td class="field"><SELECT NAME="interviewLocation" multiple size='5'>
				            <option value="">Select Interview Location</option>
                            <option value="Ahmedabad">Ahmedabad</option>
                            <option value="Bangalore">Bangalore</option>
                            <option value="Chandigarh">Chandigarh</option>
                            <option value="Chennai">Chennai</option>
                            <option value="Coimbattur">Coimbattur</option>
                            <option value="Delhi">Delhi</option>
                            <option value="Gurgoan">Gurgoan</option>
                            <option value="Hyderabad">Hyderabad</option>
                            <option value="Kochi">Kochi</option>
                            <option value="Kolkatta">Kolkatta</option>
                            <option value="Mangaloore">Mangaloore</option>
                            <option value="Mohali">Mohali</option>
                            <option value="Mumbai">Mumbai</option>
                            <option value="Mysore">Mysore</option>
                            <option value="Noida">Noida</option>
                            <option value="Pune">Pune</option>
                            <option value="Trivandrum">Trivandrum</option>
                            <option value="Vishakhapatnam">Vishakhapatnam</option>
                            <option value="Multiple Locations">Multiple Locations</option>
                        </SELECT></td>
	  			<td class="status" id="display"></td>
	  		  </tr>
	  		  <tr>
	  			<td class="label"><label id="myWorkLocation" for="workLocation">Work Location</label></td>
	  			<td class="field"><SELECT NAME="workLocation" multiple size='5'>
				            <option value="">Select Work Location</option>
                            <option value="Ahmedabad">Ahmedabad</option>
                            <option value="Bangalore">Bangalore</option>
                            <option value="Chandigarh">Chandigarh</option>
                            <option value="Chennai">Chennai</option>
                            <option value="Coimbattur">Coimbattur</option>
                            <option value="Delhi">Delhi</option>
                            <option value="Gurgoan">Gurgoan</option>
                            <option value="Hyderabad">Hyderabad</option>
                            <option value="Kochi">Kochi</option>
                            <option value="Kolkatta">Kolkatta</option>
                            <option value="Mangaloore">Mangaloore</option>
                            <option value="Mohali">Mohali</option>
                            <option value="Mumbai">Mumbai</option>
                            <option value="Mysore">Mysore</option>
                            <option value="Noida">Noida</option>
                            <option value="Pune">Pune</option>
                            <option value="Trivandrum">Trivandrum</option>
                            <option value="Vishakhapatnam">Vishakhapatnam</option>
                            <option value="Multiple Locations">Multiple Locations</option>
                        </SELECT></td>
	  			<td class="status" id="display"></td>
	  		  </tr>
	  		  <tr>
	  			<td class="label"><label id="jobLastDateToApply" for="lastDatetoApply">Last Date To Apply</label></td>
	  			<td class="field"><INPUT class="text" TYPE="text" NAME="lastDatetoApply" readonly><IMG SRC="images/icons/calendar.jpg" WIDTH="25" HEIGHT="23" BORDER="0" ALT="" onclick="displayCalendar1(document.forms[0].lastDatetoApply,'yyyy-mm-dd',this)"></td>
	  			<td class="status" id="display"></td>
	  		  </tr>			 

			  <tr>
	  			<td class="label"><label id="jobDescription" for="description">Description</label></td>
	  			<td class="field"><textarea name="description" rows="6" cols="30"></textarea></td>
	  			<td class="status" id="display"></td>
	  		  </tr>

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