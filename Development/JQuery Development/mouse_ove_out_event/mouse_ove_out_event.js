$(document).ready(function() 
{
	 $('#show').mouseover(function()
	 {
		 $('#show').val('Put you mouse back to hide it');
		 $('.box').show(4000);	
	 }); 
	 $('#show').mouseout(function()
	 {
		 $('#show').val('Hover to show');
		 $('.box').hide(4000);	
	 });
});