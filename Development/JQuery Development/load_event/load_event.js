$(document).ready(function() 
{
	$('#loadExternal').click(function()
	{
		$('#externalContent').load('external_load_event.html');
	});
});