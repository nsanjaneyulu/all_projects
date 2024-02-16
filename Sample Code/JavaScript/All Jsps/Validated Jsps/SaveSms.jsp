
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
			
			strCategory: {
				required: true,		
			},
			
		    strMessage: {
				required: true,
			},

		},
		messages: {
			
			strCategory: {
				required: "Select any Occasion",
			},
			
		    strMessage: {
				required: "Enter Your SMS text",
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
	
	
});
</script> 

</head>
<body>


<div id="main">

<div id="content">

<div style="clear: both;"><div></div></div>
<center><h1 class="banner">Post Your SMS</h1></center>

<div class="content">
    <div id="signupbox">
      
      <div id="signupwrap">
      		<form id="signupform" name="f1" autocomplete="off" method="post" enctype="multipart/form-data" action="./insert?param2=insertsms">
	  		  <table>
	  		  <tr>
	  		  	<td class="label"><label id="category" for="strCategory">Choose Category: </label></td>
	  		  	<td class="field"><select name="strCategory" id="strCategory">
           <option value="">Select Occasion</option>
           <option value="Friendship">Friendship</option>
             <option value="Best Wishes">Best Wishes</option>
           <option value="Good Luck">Good Luck</option>
            <option value="Good Morning">Good Morning</option>
            <option value="Good Night">Good Night</option>
            <option value="Get Well Soon">Get Well Soon</option>
            <option value="Love">Love</option>
            <option value="Sardar">Sardar</option>
            <option value="Santa-Banta">Santa-Banta</option>
            <option value="Wise Words">Wise Words</option>
            <option value="Smile Sms">Smile Sms</option>
            <option value="Missing You">Missing You</option>
            <option value="Independence Day">Independence Day</option>
            <option value="New Year">New Year</option>
            <option value="Anniversary">Anniversary</option>
           <option value="Others">Others</option>
         </select></td><td class="status"></td>
	  		  </tr>
	  		  <tr>
	  			<td class="label"><label id="myMessage" for="strMessage">* Type Your SMS</label></td>
	  			<td class="field"><textarea name="strMessage" id="strMessage" rows="6" cols="30" ></textarea></td>
	<td class="status"></td>
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