paypal.minicart.render({

  // configuración inicial
  strings: {         
    button: 'Pagar',
    buttonAlt: 'Total:',
    subtotal: 'Total:',
    empty: 'No hay productos en el carrito'
 
  } 
});


// $('product').click(function(e) {
//   e.stopPropagation();
//   paypal.minicart.view.show();
// });
$('#product').click(function(event) {
  console.log($(this));
  event.stopPropagation();
  paypal.minicart.cart.add({
    business: 'kamaly.kazal@gmail.com', // Correo donde se depositará el dinero
    item_name: $(this).attr('title'),
    amount: $(this).attr('price'),
    currency_code: 'USD',
  });
});