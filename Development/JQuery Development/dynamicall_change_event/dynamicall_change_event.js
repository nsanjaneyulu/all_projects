$(document).ready(function() 
{
	var color = $('#list').val();
	$('body').css('background',color);
	$('#list').change(function()
	{
		var color = $('#list').val();
		$('body').css('background',color);
	});
});