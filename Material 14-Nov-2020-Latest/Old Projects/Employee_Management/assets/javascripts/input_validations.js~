  $('.date').mask('00/00/0000');
  $('.time').mask('00:00:00');
  $('.date_time').mask('00/00/0000 00:00:00');
  $('.cep').mask('00000-000');
  $('.phone').mask('0000-0000');
  // $('.phone_with_ddd').mask('00/00/00/00/00/00/00/00');
  // $('.phone_with_ddd')
$(".phone_with_ddd").keyup(function(e){  
 
 setTimeout(function(){
   var regex = "/^-?\d*(\.\d+)?$/";
   var value = $(".phone_with_ddd").val();

   if(value < 1) {
    $(".phone_with_ddd").unmask();
   }
   
   var pointAllow = parseFloat(value);
   
   console.log(pointAllow > 0 && pointAllow < 1)
  console.log(value >= 1 );

  if(value >= 1) {
    console.log("Mask")
      $('.phone_with_ddd').mask('00/00/00/00/00/00/00/00'); 
      return;
  }
   
   if(pointAllow) { 
      $(".phone_with_ddd").parent().removeClass("has-error");
   } else {
      $(".phone_with_ddd").parent().addClass("has-error");
      $(".phone_with_ddd").unmask();
   }
   
 }, 1)
})

  $('.phone_us').mask('(000) 000-0000');
  $('.mixed').mask('AAA 000-S0S');
  $('.cpf').mask('000.000.000-00', {reverse: true});
  $('.cnpj').mask('00.000.000/0000-00', {reverse: true});
  $('.money').mask('000.000.000.000.000,00', {reverse: true});
  $('.money2').mask("#.##0,00", {reverse: true});
  $('.ip_address').mask('0ZZ.0ZZ.0ZZ.0ZZ', {
    translation: {
      'Z': {
        pattern: /[0-9]/, optional: true
      }
    }
  });
  $('.ip_address').mask('099.099.099.099');
  $('.percent').mask('##0,00%', {reverse: true});
  $('.clear-if-not-match').mask("00/00/0000", {clearIfNotMatch: true});
  $('.placeholder').mask("00/00/0000", {placeholder: "__/__/____"});
  $('.fallback').mask("00r00r0000", {
      translation: {
        'r': {
          pattern: /[\/]/,
          fallback: '/'
        },
        placeholder: "__/__/____"
      }
    });
  $('.selectonfocus').mask("00/00/0000", {selectOnFocus: true});
