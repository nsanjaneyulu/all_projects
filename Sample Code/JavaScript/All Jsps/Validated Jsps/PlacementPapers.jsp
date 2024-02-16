
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1" />
<title>Online Classes</title>

<link rel="stylesheet" type="text/css" media="screen" href="css/milk.css" />
<link rel="stylesheet" type="text/css" media="screen" href="css/stylesheet.css" />
<link rel="stylesheet" type="text/css" media="screen" href="css/tableStyle.css" />

<script type="text/javascript" src="scripts/tableStyle.js" ></script>
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
			
			selectCompany: {
				required: true,		
			},
			
		},
		messages: {
			
			selectCompany: {
				required: "Select any Occasion",
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

<center><img src="bg/title.jpg"width = "100%" height ="80"> <br/><br/>
<div id="main">

<div id="content">

<div style="clear: both;"><div></div></div>
<center><h1 class="banner">Select the Company Name to get its Interview Experiences</h1></center>

<div class="content">
    <div id="signupbox">
      
      <div id="signupwrap">
      		<form id="signupform" name="f1" autocomplete="off" method="post" enctype="multipart/form-data" action="save?param=selectpapers">
	  		  <table>
	  		  <tr>
	  		  	<td class="label"><label id="company" for="selectCompany">Select Company : </label></td>
	  		  	<td class="field"><select name="selectCompany" class="txt">
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