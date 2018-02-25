page('/', index);
page('/categories', categories);
// page('/user/:userName', user);
page('*', notfound);
page();

// Llamando elementos principales desde el DOM
const $btn = $('#btn-search');
let input = $('#search');
// let containerSearch = $('#contente-search');
// let container = document.querySelector('p');

function index() {
  let containerSearch = $('#contente-search');
  containerSearch.html('<h1>Selecciona en nuestras categorias o en nuestro buscador, el producto deseado</h1>');
  $.get('https://api.mercadolibre.com/sites/MLA/categories', function(data, status) {
    data.forEach(element => {
      //  console.log(element); 
      let listCategories = $('#categories');
      listCategories.append(`<a class="dropdown-item" href="/${element.id}" data-id = "${element.id}">${element.name}</a>`);

      // Mostramos todas las categorias y guardamos el id en un atributo data para luego al hacerle click mostrar el contenido
    });
  });
}


function notfound() {
  let containerSearch = $('#contente-search');
  containerSearch.html('<p> cargando...</p>');
}


function user(ctx) {
  $('p').text('Pagina user' + (ctx.params.userName));
}


$('#categories').on('click', 'a', categories);

function categories() {
  let containerSearch = $('#contente-search');
  let id = $(this).data('id');
  console.log($(this));
  console.log(id);

  $.get(`https://api.mercadolibre.com/categories/${id}`, function(data, status) {
    console.log(containerSearch.html(`${data.name}`));
  });
}


// Evento click para el buscador de productos 
$btn.click(function(event) {
  let containerSearch = $('#contente-search');
  containerSearch.html('');
  console.log('click');
  event.preventDefault();
  $.get(`https://api.mercadolibre.com/sites/MLA/search?condition=new&q=${input.val()}`, function(data, status) {
    console.log(data.results);
    data.results.forEach(element => {
      containerSearch.append(` <div class="card m-2" style="width: 18rem;">
      <img class="card-img-top" src="${element.thumbnail}" alt="Card image cap">
      <div class="card-body">
        <h5 class="card-title">S/. ${element.price}</h5>
        <p class="card-text">${element.title}.</p>
        <a href="#" class="btn btn-primary" id="btn-pay">Comprar</a>
      </div>
    </div>`);
    });
  });
});