





<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1" />
<title>Share Your Interview Experience</title>

<link rel="stylesheet" type="text/css" media="screen" href="css/milk.css" />
<link rel="stylesheet" type="text/css" media="screen" href="css/stylesheet.css" />
<link rel="stylesheet" type="text/css" media="screen" href="css/tableStyle.css" />

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
            cname: "required",
			date: {
			    required: true,
			    mydate: true,
			},

			cloc: {
				required: true,
				alphabets: true,
				
			},
            exampattn:"required",
			sugg:"required",
			remquest:"required",
			expintervw:"required",


		},
		messages: {

		    cname: "Enter Company Name.",
			date: {
			  required: "Enter Date.",
			  mydate: jQuery.format("Enter Valid Date."),
			
			},

            cloc: {
				required: "Enter Interview Location.",
				alphabets: "Must Contain Alphabets Only.",
				
			},
			exampattn:"Enter Exam Pattern.",
			sugg:"Enter Your Suggestions.",
			remquest:"Enter Remembered Questions.",
			expintervw:"Enter Interview Experience.",
					
			
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

		
		//Customized Rule for date format(yyyy-mm-dd)   ^(19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$
       $.validator.addMethod("mydate",function(value,element)
        {
            return this.optional(element) || /^(19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$/i.test(value); 
        },"Invalid Date Format.");

});
</script> 

</head>
<body>


<div id="main">

<div id="content">

<div style="clear: both;"><div></div></div>
<center><h1 class="banner">Share Your Interview Experience</h1></center>

<div class="content">
    <div id="signupbox">
       <div id="signuptab">
        <ul>
          <li id="signupcurrent">Pattern-details</li>
        </ul>
      </div>
      <div id="signupwrap">
      		<form name="f1" id="signupform" autocomplete="off" method="post" action="./save?param=savepaper" method="POST">
	  		  <table>
	  		  <tr>
	  		  	<td class="label"><label id="compname" for="compname">Company Name</label></td>
	  		  	<td class="field"><select name="cname" class="txt">
                                            <option value="">Select Company</option>
                                            <option value="Wipro">Wipro</option>
                                            <option value="IBM">IBM</option>
                                            <option value="Sun">Sun</option>
                                            <option value="TCS">TCS</option>
                                            <option value="Infosys">Infosys</option>
                                            <option value="Syntel">Syntel</option>
                                            <option value="KeaneIndia">KeaneIndia</option>
                                            <option value="Gameloft">Gameloft</option>
                                            <option value="Microsoft">Microsoft</option>
                                            <option value="Others">Others</ption>
                                    </select></td>
	  		  	<td class="status"></td>
	  		  </tr>
	  		  <tr>
	  			<td class="label"><label id="cdate" for="date">Conducted Date(YYYY-MM-DD)</label></td>
	  			<td class="field"><input type="text" id="date" name="date"/><IMG SRC="images/calendar2.jpg" WIDTH="25" HEIGHT="23" BORDER="0" ALT="calendar"></td>
	  			<td class="status" id="display"></td>
	  		  </tr>
	  		  <tr>
	  			<td class="label"><label id="clocation" for="cloc">Location</label></td>
	  			<td class="field"><input type="text" name="cloc" value="" class="txt" /></td>
	  			<td class="status" id="display"></td>
	  		  </tr>
	  		  <tr>
	  			<td class="label"><label id="exampattern" for="exampattn">Exam Pattern</label></td>
	  			<td class="field"><textarea name="exampattn" rows="6" cols="50" class="txt"></textarea></td>
	  			<td class="status" id="display"></td>
	  		  </tr>
	  		  <tr>
	  			<td class="label"><label id="suggest" for="sugg">Suggest</label></td>
	  			<td class="field"><textarea name="sugg" rows="6" cols="50" class="txt"></textarea></td>
	  			<td class="status" id="display"></td>
	  		  </tr>
	  		  <tr>
	  			<td class="label"><label id="rememberques" for="remquest">Remembered Questions</label></td>
	  			<td class="field"><textarea name="remquest" rows="6" cols="50" class="txt"></textarea></td>
	  			<td class="status" id="display"></td>
	  		  </tr>

			  <tr>
	  			<td class="label"><label id="expininterview" for="expininterw">Experience in Interview</label></td>
	  			<td class="field"><textarea name="expintervw" rows="6" cols="50" class="txt"></textarea>
				</td>
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






