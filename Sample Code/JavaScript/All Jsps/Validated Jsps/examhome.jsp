

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
			examTopic: {				
				required: true,
			},
		},
		messages: {			
			examTopic: {
				required: "Select a Topic",					
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
<center><h1 class="banner">Online Test</h1></center>

<div class="content">
    <div id="signupbox">
       <div id="signuptab">
        <ul>
          <li id="signupcurrent"><b>Select a topic to take Online Test</b></li>
        </ul>
      </div>
      <div id="signupwrap">
	  <a href="HOME.jsp">BACK<img  src="images/back.jpg" width="35" height="23" border="0" ></a>
      		<form id="signupform" autocomplete="off" method="post" enctype="multipart/form-data" action="./enterexam.jsp" name="ItemList">
	  		  <table>
	  		 
	  		  <tr>
	  			<td class="label"><label id="myexamTopic" for="examTopic">Select topic:</label></td>
	  			<td class="field"><select name="examTopic" size="1" id="topic" >
	                                     <option value="">Select a Topic</option>
                                         <option value="corejava"   >Core Java</option>
                                         <option value="jdbc">jdbc</option>
                                         <option value="jsp">Jsp</option>
                                         <option value="servlet">Servlets</option>
                                         <option value="struts">Struts</option>
		                                 <option value="spring">Spring</option>
		                                 <option value="hibernate">Hibernate</option>
		                                 <option value="html">Html</option>
		                                 <option value="c">C</option>
		                                 <option value="cpp">C++</option>
                                         <option value="generalawareness">General Awareness</option>
		  
                                   </select></td>
	  			<td class="status" id="display"></td>
	  		  </tr>
	  		  
	  		 
	  		  <tr>
	  			<td class="label"><label id="lsignupsubmit" for="signupsubmit">Exam Topic</label></td>
	  			<td class="field" colspan="2">
	            <input id="signupsubmit" name="signup" type="submit" value="Submit" />
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