$(document).ready(function() 
{
	$('#slideMe').click(function()
	{
		$('.first').slideUp(4000);
	});
	$('#stopMe').click(function()
	{
		$('.first').stop(2000);
	});
});