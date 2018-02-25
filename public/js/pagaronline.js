// Seteando valores de config

Culqi.publicKey = 'pk_test_FP96YFVHPBdhfKqt'; // Colocar tu Código de Comercio (llave pública)
Culqi.init();

Culqi.settings({
  title: 'Culqi Store',
  currency: 'PEN', // Código de la moneda, 'PEN' o 'USD'
  description: 'Polo/remera Culqi lover', // Descripción acerca de la compra
  amount: 3500 // Monto de la compra (sin punto decimal, en este caso 35.00 soles)
});
$('#buyButton').on('click', function (e) {
  // Abre el formulario con las opciones de Culqi.settings
  Culqi.open();
  e.preventDefault();
});
// Recibimos el token desde los servidores de Culqi
function culqi() {
  if (Culqi.token) { // Token creado exitosamente!
    // Obtener el token ID
    var token = Culqi.token.id;
    alert('Se ha creado un token: ' + token);
  } else { // Hubo algun problema!
    // Mostramos JSON de objeto error en consola
    console.log(Culqi.error);
    alert(Culqi.error.mensaje);
  }
};

/* 

// Configura el formulario
Culqi.publicKey = 'pk_test_FP96YFVHPBdhfKqt';
Culqi.init();
Culqi.createToken();

Culqi.settings({
  title: 'Culqi Store',
  currency: 'PEN',
  description: 'Polo Culqi lover',
  amount: 3500
});

// Muestra el Checkout de Culqi
$('#buyButton').on('click', function (e) {
  // Abre el formulario con las opciones de Culqi.settings
  Culqi.open();
  e.preventDefault();
});

// Envia el token hacia tu servidor
function culqi() {
  if (Culqi.token) { // ¡Token creado exitosamente!
    // Get the token ID:
    var token = Culqi.token.id;
    alert('Se ha creado un token:'.token);

  } else { // ¡Hubo algún problema!
    // Mostramos JSON de objeto error en consola
    console.log(Culqi.error);
    alert(Culqi.error.mensaje);
  }
}; */