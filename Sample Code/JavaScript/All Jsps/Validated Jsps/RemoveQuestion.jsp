<%@ page contentType="text/html; charset=utf-8" language="java" import="java.sql.*" errorPage="errorHandler.jsp" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core" %>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>


<link rel="stylesheet" type="text/css" media="screen" href="css/milk.css" />
<link rel="stylesheet" type="text/css" media="screen" href="css/stylesheet.css" />
<link rel="stylesheet" type="text/css" media="screen" href="css/tableStyle.css" />

<style type="text/css">
	pre { text-align: left; }
</style>

<script src="js/jquery.js" type="text/javascript"></script>
<script src="js/jquery.validate.js" type="text/javascript"></script>
<script id="demo" type="text/javascript">
$(document).ready(function() {
			   
	// validate signup form on keyup and submit
	var validator = $("#signupform").validate({
		rules: {

         check: "required",

		},
		messages: {
						check: " "
			
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
<script type="text/javascript" src="scripts/tableStyle.js" ></script>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Remove Question</title>
<body >
<center>
<a href="QuestionManagement.jsp"><img  src="images/back.jpg" width="35" height="23" border="0" ></a>
<c:if test="${param.del eq 'false'}" >
 <font color="#FF3366"><c:out value="select atleast one question" />
 </font>
 </c:if>
<c:if test="${param.edit=='false'}"><font color="#CC3333" size="3"><c:out value="select only one question at a time if you want to edit" /></font></c:if><br>
<font size='4' color="blue">Page No:
<c:forEach begin="0" end="${noofpages-1}" varStatus="count" >
<c:set var="index" value="${((count.count)-1)*10}" />
<a href="RemoveQuestion.jsp?begin=<c:out value='${index}'/>&end=<c:out value='${index+9}'/> "><c:out value="${count.count}" /></a>
</c:forEach>
 </font>
 <c:if test="${param.from ne 'false'}" > 
<c:set var="begin" value="${param.begin}" scope="session"/>
<c:set var="end" value="${param.end}" scope="session"/>
</c:if>
<table >
  <tr>
    <th ><b>QID</b></th>
    <th ><b>QUESTION</b></th>
    <th ><b>select</b></th>
  </tr>
  <form method="get" action="./removeeditquestion">
  <c:forEach var="question" items="${questionsbycategory}" varStatus="count" begin='${begin}' end='${end}' >
  <tr>
    <td ><b><c:out value="${question.qid}" /></b></td>
    <td ><c:out value="${question.question}" escapeXml="false"  /></td>
    <td class="field"><input type="checkbox" name="check" id="check" /></td><td class="status"></td>
  </tr>
  </c:forEach>
   </table>
  <br>
  <center>
    <input type="submit" name="REMOVE" id="REMOVE" value="REMOVE" /><input type="submit" name="EDIT" id="REMOVE" value="EDIT" />
  </center>  
  
  </form>

 
</center>

</body>
</html>
