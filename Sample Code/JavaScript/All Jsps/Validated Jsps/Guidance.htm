
<%@ page contentType="text/html"%>
<%@ page pageEncoding="UTF-8"%>
<%@ page import="java.sql.ResultSet" %>
<%@ page import="java.util.ArrayList" %>
<%@ page import="dto.fieldsVo" %>




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
			

			field: {
				required: true,		
			},
		    subject: {
				required: true,		
			},
			topic: {
				required: true,		
			},
			
		    question: {
				required: true,
			},

		},
		messages: {
			
			field: {
				required: "Select Your Field",
			},
		    subject: {
				required: "Select Your Subject",
			},
			topic: {
				required: "Select Your Topic",
			},
			
		    question: {
				required: "Enter The Question",
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
<center><h1 class="banner">Post Your Question And Get Guidance</h1></center>

<div class="content">
    <div id="signupbox">
       
      <div id="signupwrap">
	   <a href="DisplayJobsToAdmin.jsp"><IMG align="right" SRC="images/icons/restart.png" WIDTH="25" HEIGHT="23" BORDER="0" ALT=""></a>
           <a href="JobsHome.jsp"><IMG align="right" SRC="images/icons/home.png" WIDTH="25" HEIGHT="23" BORDER="0" ALT=""></a>
      		<form id="signupform" name="inputjobs" autocomplete="off" method="post" enctype="multipart/form-data" action="adminInput.do">
	  		  <table>
	  		  <tr>
	  		  	<td class="label"><label id="chooseit" for="field">Choose The Field: </label></td>
	  		  	<td class="field"><select id="field" name="field">
                                        <option value="">-select-</option>
                                        <%
                                                    ArrayList fields = (ArrayList) request.getAttribute("fields");
                                                    fieldsVo o1 = new fieldsVo();
                                                    Object[] ele = fields.toArray();
                                                    for (int i = 0; i < fields.size(); i = i + 1) {
                                                        o1 = (fieldsVo) ele[i];
                                        %>

                                        <option value="<%=o1.getFieldID()%>" ><%=o1.getName()%></option>
                                        <%
                                                    }
                                        %>
                                    </select></td>
	  		  	<td class="status"></td>
	  		  </tr>
	  		  <tr>
	  			<td class="label"><label id="mysubject" for="subject">Select the Subject Name: </label></td>
	  			<td class="field"><select id ="subject" name="subject" class="txt">
                                    <option value="">-select-</option>
                                 </select></td>
	  			<td class="status" id="display"></td>
	  		  </tr>
	  		  <tr>
	  			<td class="label"><label id="myQualification" for="qualification">Select The Topic Name: </label></td>
	  			<td class="field"><select id="topic" name="topic" class="txt" >
                                    <option value="">-select-</option>
                                    <option value=" " ></option>
                                </select></td>
	  			<td class="status" id="display"></td>
	  		  </tr>
	  		  <tr>
	  			<td class="label"><label id="myquestion" for="question">Enter Your Question: </label></td>
	  			<td class="field"><textarea name="question" rows="4" cols="40" class="txt">
                                </textarea></td>
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