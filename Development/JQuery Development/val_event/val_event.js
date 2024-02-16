$(document).ready(function() 
{
	$('#checktextVal').click(function()
	{
		var textVal = $('#textVal').val();
		if ( textVal == "" )
		{
			alert("Please enter a Value");
		}
	});
});