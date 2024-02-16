

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1" />
<title>Give Guidance</title>

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
			
			field: {
				required: true,		
			},
			
		    subject: {
				required: true,		
			},
			topic: {
				required: true,		
			},

		},
		messages: {
			
			field: {
				required: "Select any Field",
			},
			subject: {
				required: "Select any Subject",
			},
			topic: {
				required: "Select any Topic",
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
<center><h1 class="banner">Give your Answers for the question in your expert field</h1></center>

<div class="content">
    <div id="signupbox">
      
      <div id="signupwrap">
      		<form id="signupform"  name="f1" action="guidance" method="post">
	  		  <table>
	  		  <tr>
	  		  	<td class="label"><label id="category" for="strCategory">Choose the Filed</label></td>
	  		  	<td class="field"><select id="field" name="field">

                                        <option value="">-select-</option>
                                        <option value=""><%
                                                    ArrayList fields = (ArrayList) request.getAttribute("fields");
                                                    fieldsVo o1 = new fieldsVo();
                                                    Object[] ele = fields.toArray();
                                                    for (int i = 0; i < fields.size(); i = i + 1) {
                                                         o1 = (fieldsVo) ele[i];
                                        %></option>

                                        <option value=""><%=o1.getFieldID()%><%=o1.getName()%>
                                        <%
                                                    }
                                        %>
                                        </option>
                                    </select></td><td class="status"></td>
	  		  </tr>
	  		  <tr>
	  			<td class="label"><label id="mySubject" for="subject">Enter the Subject Name</label></td>
	  			<td class="field"><select id="subject" name="subject">

                                    <option value="">-select-</option>

                                    <option value=" " ></option>
                                    <option value=" " ></option>

                                </select></td>
	           <td class="status"></td>
	  		  </tr>  
			  
			  <tr>
	  			<td class="label"><label id="myMessage" for="strMessage">Enter the Topic Name</label></td>
	  			<td class="field"><select id="topic" name="topic">

                                    <option>-select-</option>

                                    <option value=" " ></option>

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