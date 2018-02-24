page('/', index); 
page('/categories', categories);
// page('/user/:userName', user);
page('*', notfound);
page();

// let container = document.querySelector('p');

function index() {
  $.get('https://api.mercadolibre.com/sites/MLA/categories', function(data, status) {
    data.forEach(element => {
      //  console.log(element); 
      let listCategories = $('#categories');
      listCategories.append(`<a class="dropdown-item" href="/${element.id}">${element.name}</a>`);
      
      // Mostramos todas las categorias y guardamos el id en un atributo data para luego al hacerle click mostrar el contenido
    });
  }); 
}

function categories() {
  console.log('categories')
  $.get(`https://api.mercadolibre.com/sites/MLA/search?condition=new&q=${input.val()}`, function(data, status) {
    console.log(data);
  });
}


function user(ctx) {
  $('p').text('Pagina user' + (ctx.params.userName)); 
}

function notfound() {
  $('p').text('PÁGINA AUN SIN CONTENIDO - ESTAMOS TRABAJANDO PARA UD -- SALUDOS!'); 
}


