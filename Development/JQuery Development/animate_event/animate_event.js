$(document).ready(function() 
{
	$('.one').mouseover(function()
	{
		$(this).stop().animate(
			{
				width:"200px"
			}
			);
	});
	$('.one').mouseout(function()
	{
		$(this).stop().animate(
			{
				width:"100px"
			}
			);
	});	
});