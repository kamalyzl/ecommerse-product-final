/*  Configurando el checkout */

Culqi.publicKey = 'pk_test_FP96YFVHPBdhfKqt';
Culqi.init();

//Aquí creamos el Token en Culqi con la información de la tarjeta
//Culqi.createToken();

function culqi() {
  if(Culqi.token) { // ¡Token creado exitosamente!
      // Obtener el token ID:
      var token = Culqi.token.id;
      alert('Se ha creado un token:' + token);

  }else{ // ¡Hubo algún problema!
      // Mostramos JSON de objeto error en consola
      console.log(Culqi.error);
      alert(Culqi.error.user_mensaje);
  }
};

$(document).ready(function(){
  $('#culqi-card-form').on('submit', function(e){
    e.preventDefault();
    Culqi.createToken();
  });
})



