$(document).ready(function() 
{
	$('p').click(function()
	{
		$(this).after("<p>This is another paragraph</p>");
	});
});