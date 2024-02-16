$(document).ready(function() 
{
	$('#start').click(function()
	{
		$('.one').text('put your mouse over here to hide it');
		$('.one').bind("mouseover", function()
		{
			$(this).hide(4000);
		});
	});
	$('#stop').click(function()
	{
		$('.one').unbind("mouseover");
		$('.one').text('This will not working');
	});
});