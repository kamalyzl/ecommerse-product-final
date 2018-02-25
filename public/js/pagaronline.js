// Configurando el checkout 

Culqi.publicKey = 'sk_test_v2XDSHbFpfjBRA5q';
Culqi.settings({
  title: 'Culqi Store',
  currency: 'PEN',
  description: 'Polo/remera Culqi lover',
  amount: 3500
  });

Culqi.init();

//Aquí creamos el Token en Culqi con la información de la tarjeta
//Culqi.createToken();

function culqi() {
  if(Culqi.token) { // ¡Token creado exitosamente!
      // Obtener el token ID:
      var token = Culqi.token.id;
      $.ajax({
        url: '',
        data: {
          token: token,
          monto: 200 
        },
        type: 'JSON',
        success: function(data){
          console.log(data);
        },
        error: function(error_data){
          console.log(error_data);
        },
      })
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

