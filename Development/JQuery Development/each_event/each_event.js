$(document).ready(function() 
{
	$('li.one').each(function() 
	{
     	alert($(this).text().length) ;
    });
});