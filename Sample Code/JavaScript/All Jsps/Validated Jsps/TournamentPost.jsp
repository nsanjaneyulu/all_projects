<!DOCtype html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-type" content="text/html; charset=ISO-8859-1" />
<title>Post tournament details</title>

<link rel="stylesheet" type="text/css" media="screen" href="css/milk.css" />
<link rel="stylesheet" type="text/css" media="screen" href="css/stylesheet.css" />
<link rel="stylesheet" type="text/css" media="screen" href="css/tableStyle.css" />


<script src="js/jquery.js" type="text/javascript"></script>
<script src="js/jquery.validate.js" type="text/javascript"></script>
<link type="text/css" rel="stylesheet" href="stylesheets/dhtmlgoodies_calendar.css" media="screen"/>
<script type="text/javascript" src="scripts/calendar.js"></script>
<style type="text/css">
	pre { text-align: left; }
</style>

<script id="demo" type="text/javascript">
$(document).ready(function() {
			   
	// validate signup form on keyup and submit
	var validator = $("#signupform").validate({
		rules: {
			game: {
			    required: true,
			    alphabets: true,
			},

			conductson: {
				required: true,
				mydate: true,                    
				
			},
            lastdate: {
				required: true,
				mydate: true,               
			},
			who: {
			    required: true,
			    alphabets: true,
			},
		    rules: {
			    required: true,
			},
			conductedby: {
			    required: true,
			},
		    contactemail: {
			    required: true,
				email:true,
			},
			contactmobileno:{
			    required: true,
			    number: true,
				minlength: 10,
				maxlength: 10,
			},			
			address: "required",		

		},
		messages: {
			game: {
			  required: "Enter Your Game.",
			  alphabets: jQuery.format("Must Contain Only Alphabets."),
			
			},

			conductson: {
				required: "Enter Date.",
				mail: "Invalid Date Format.",
				
			},
		    lastdate: {
				required: "Enter Date.",
				mail: "Invalid Date Format.",	
			},
			who: {
			  required: "Enter Who can Participate.",
			  alphabets: jQuery.format("Must Contain Only Alphabets."),
			
			},
			rules: {
			  required: "Enter Rules and Regulations.",		  
			},
            conductedby: {
			    required: "This Field is Required.",		  
			},
		    contactemail: {
			    required: "Enter your Email.",		  
				email:"Enter valid Email.",		  
			},
			contactmobileno:{
			    required: "Enter Phone Number.",
				number: jQuery.format("Enter only Numbers."),
				minlength: jQuery.format("Phone Number must contain 10 digits."),
				maxlength: jQuery.format("Phone Number must contain 10 digits."),
			},

		    address: "Enter Tournament Address.",				
			
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



        //Customized Rule for alphabets 
	    $.validator.addMethod("alphabets",function(value,element)
        {
            return this.optional(element) || /^[a-zA-Z]+$/i.test(value); 
        },"Must Contain Alphabets Only");


		//Customized Rule for date format(yyyy-mm-dd)   ^(19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$
       $.validator.addMethod("mydate",function(value,element)
        {
            return this.optional(element) || /^(19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$/i.test(value); 
        },"Invalid Date Format.");

       $.validator.addMethod("enddate", function(value, element) {
            var startdatevalue = $('.conduct').val();
             return Date.parse(startdatevalue) > Date.parse(value);
        }, "LastDate to Apply Should not be greater then Coducting Date.");
});
</script> 

</head>
<body>


<div id="main">

<div id="content">

<div style="clear: both;"><div></div></div>
<center><h1 class="banner">Post Tournament Details</h1>
<pre>
  <a href="TournamentsHome.jsp">BACK<img  src="images/back.jpg" width="35" height="23" border="0" ></a><a href="HOME.jsp">HOME<img src="images/home.png" width="35" height="23" border="0" ></a>
  </pre>
</center>

<div class="content">
    <div id="signupbox">
       <div id="signuptab">
        <ul>
          <li id="signupcurrent">Tournaments</li>
        </ul>
      </div>
      <div id="signupwrap">
      		<form id="signupform" autocomplete="off" method="post" enctype="multipart/form-data" action="./TournamentSrv?input=save" name="tournament">
	  		  <table>
	  		  <tr>
	  		  	<td class="label"><label id="touranamentsgames" for="game">Game</label></td>
	  		  	<td class="field"><input type="text" name="game" /></td>
	  		  	<td class="status"></td>
	  		  </tr>
	  		  <tr>
	  			<td class="label"><label id="coductedon" for="conductson">Conducted On(YYYY-MM-DD)</label></td>
	  			<td class="field"><input  type="text" name="conductson" value="YYYY-MM-DD" class="conduct"><IMG SRC="images/icons/calendar.jpg" WIDTH="25" HEIGHT="23" BORDER="0" ALT="" id="a"></td>
	  			<td class="status" id="display"></td>
	  		  </tr>
	  		  <tr>
	  			<td class="label"><label id="tournamentlastdate" for="lastdte">Last Date to Apply(YYYY-MM-DD)</label></td>
	  			<td class="field"><input  type="text" name="lastdate" value="YYYY-MM-DD"><IMG SRC="images/icons/calendar.jpg" WIDTH="25" HEIGHT="23" BORDER="0" ALT="" id="b"></td>
	  			<td class="status" id="display"></td>
	  		  </tr>
	  		  <tr>
	  			<td class="label"><label id="eligible" for="who">Who Can Participate</label></td>
	  			<td class="field"><input type="text" name="who" /></td>
	  			<td class="status" id="display"></td>
	  		  </tr>
	  		  <tr>
	  			<td class="label"><label id="allowance" for="allowances">Allowances If Any</label></td>
	  			<td class="field"><input type="text" name="allowances" /></td>
	  			<td class="status" id="display"></td>
	  		  </tr>

			  <tr>
	  			<td class="label"><label id="gamerules" for="rules">Rules and Regulations</label></td>
	  			<td class="field"><textarea name="rules" row='15' cols='30' ></textarea></td>
	  			<td class="status" id="display"></td>
	  		  </tr>
	  		  

			  <tr>
	  			<td class="label"><label id="conductby" for="conductedby">Conducted by</label></td>
	  			<td class="field"><input type="text" name="conductedby" />
				</td>
	  			<td class="status" id="display"></td>
       		  </tr>

			  <tr>
	  			<td class="label"><label id="email" for="contactemail">Contact Email</label></td>
	  			<td class="field"><input type="text" name="contactemail" /></td>
	  			<td class="status" id="display"></td>
	  		  </tr> 

			  <tr>
	  			<td class="label"><label id="mobileno" for="contactmobileno">Contact Mobile No</label></td>
	  			<td class="field"><input type="text" name="contactmobileno" />
				</td>
	  			<td class="status" id="display"></td>
       		  </tr>

			  <tr>
	  			<td class="label"><label id="tournamentaddress" for="address">Tournament Address</label></td>
	  			<td class="field"><textarea name="address" row='15' cols='30' ></textarea>
				</td>
	  			<td class="status" id="display"></td>
       		  </tr>
			  

	  		  <tr>
	  			<td class="label"><label id="lsignupsubmit" for="signupsubmit">Register</label></td>
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
