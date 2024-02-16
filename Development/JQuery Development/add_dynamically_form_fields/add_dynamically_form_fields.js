$(document).ready(function() 
{
	$('#clickMe').click(function()
	{
		var label = prompt('Enter Label');
		var inputType = prompt('Enter input type');
		if(label && inputType)
		{
		$('p.first').append("<p>"+label+"<input type='"+inputType+"' />"+"</p>");
		}
	});
});