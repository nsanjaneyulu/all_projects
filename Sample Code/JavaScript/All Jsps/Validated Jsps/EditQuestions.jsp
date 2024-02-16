
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1" />
<title>Edit Question Form</title>

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
			
			question: "required",
			option1: "required",
			option2: "required",
			option3: "required",
			option4: "required",
			explanation: "required",
			radio:{
			  required:true,
			},

		},
		messages: {
			
			question: "Enter The Question.",
			option1: "Enter The First Option.",
			option2: "Enter The Second Option.",
			option3: "Enter The Third Option.",
			option4: "Enter The Fourth Option.",
			explanation: "Give The Explanation.",
			radio:{
			  required: "Select the Answer.",
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
	
	    

       //Customized Rule for alphabets
	    $.validator.addMethod("alphabets",function(value,element)
        {
            return this.optional(element) || /^[a-zA-Z]+$/i.test(value); 
        },"Must Contain Alphabets Only.");

});
</script> 

</head>
<body background="images/blackboard_6.jpg">


<div id="main">

<div id="content">

<div style="clear: both;"><div></div></div>
<center><h1 class="banner">Edit Question Form</h1></center>

<div class="content">
    <div id="signupbox">
       <div id="signuptab">
        <ul>
          <li id="signupcurrent"><a href=" ">Edit Question</a></li>
        </ul>
      </div>
	  <c:set var="added" value="${param.add}" />


      <div id="signupwrap">
      		<form action="./editquestion" method="post" name="addquestion" >
			<c:set var="question" value="${editquestions[0]}" />
            <input type=hidden name="qid" value='<c:out value="${question.qid}" />' >
	  		  <table>
	  		  
			  <tr>
              <th class="mainHeading"><c:out value="${examtopic}" />
               -Edit Question-<c:out value="${question.qid}" />
              </th>
              </tr>
                 
			  <tr>
	  			<td class="label"><label id="myquestion" for="question">Question</label></td>
	  			<td class="field"><textarea name= "question" id="question" rows="6" cols="70"><c:out value="${question.question}" /></textarea></td>
	  			<td class="status"></td>
	  		  </tr>

			  <tr>
	  			<td class="label"><label id="myoption1" for="option1">option1</label></td>
	  			<td class="field"><textarea name= "option1" id="option1" rows="6" cols="70"><c:out value="${question.option1}" /></textarea></td>
	  			<td class="status"></td>
	  		  </tr>

			  <tr>
	  			<td class="label"><label id="myoption2" for="option2">option2</label></td>
	  			<td class="field"><textarea name= "option2" id="option2" rows="6" cols="70"><c:out value="${question.option2}" /></textarea></td>
	  			<td class="status"></td>
	  		  </tr>

			  <tr>
	  			<td class="label"><label id="myoption3" for="option3">option3</label></td>
	  			<td class="field"><textarea name= "option3" id="option3" rows="6" cols="70"><c:out value="${question.option3}" /></textarea></td>
	  			<td class="status"></td>
	  		  </tr>

			  <tr>
	  			<td class="label"><label id="myoption4" for="question">option4</label></td>
	  			<td class="field"><textarea name= "option4" id="option4" rows="6" cols="70"><c:out value="${question.option4}" /></textarea></td>
	  			<td class="status"></td>
	  		  </tr>

			  <tr>
	  			<td class="label"><label id="myexplanation" for="explanation">Explanation</label></td>
	  			<td class="field"><textarea name= "explanation" id="explanation" rows="6" cols="70"><c:out value="${question.hint}" /></textarea></td>
	  			<td class="status"></td>
	  		  </tr>
              
			  <tr>
	  			<td class="label"><label id="ansradio" for="radio">Answer</label></td>
				<td class="field">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
	A&nbsp;<input type="radio" name="radio" value="A"/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
	B&nbsp;<input type="radio" name="radio" value="B"/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
	C&nbsp;<input type="radio" name="radio" value="C" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
	D&nbsp;<input type="radio" name="radio" value="D" /></td>
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
