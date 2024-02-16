$(document).ready(function() 
{
     $('#password').keyup(function()
	 {
		 var len = $('#password').val().length;
		 <!-- $('.first').text(len); -->
		 if (len<=1)
		 {
			 $('.first').text('');
			 $('.first').removeClass('blue'); 
			 $('.first').removeClass('red');
			 $('.first').removeClass('green')
		 }
		 else if (len<=4)
		 {
			 $('.first').text('week');
			 $('.first').addClass('red');
			 $('.first').removeClass('blue'); 
			 $('.first').removeClass('blue');
		 }
		 else if (len<=8)
		 {
			 $('.first').text('good');
			 $('.first').addClass('blue');
			 $('.first').removeClass('red'); 
			 $('.first').removeClass('green');
		 }
		 else
		 {
			 $('.first').text('strong');
			 $('.first').addClass('green');
			 $('.first').removeClass('red'); 
			 $('.first').removeClass('blue');    
		 }
	 });
});