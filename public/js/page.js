
// Usamos libreria page.js para generar nuestras rutas dentro de la misma página
page('/', index);
page('/categories', categories);
page('/categories/:list', categories);
page('/categories/:list/:subLis', categories);
page('*', function() {
  $('#contente-search').html('Page not found :(');
});
page();

// Llamando elementos principales desde el DOM
const $btn = $('#btn-search');
let input = $('#search');

// En la función index, mostramos lo que hará apenas cargue la página
function index() {
  let containerSearch = $('#contente-search');
  containerSearch.html('<h1>Selecciona en nuestras categorias o en nuestro buscador, el producto deseado</h1>');
  $.get('https://api.mercadolibre.com/sites/MLA/categories', function(data, status) {
    data.forEach(element => {
      let listCategories = $('#categories');
      listCategories.append(`<a class="dropdown-item" href="/categories/${element.id}" data-id = "${element.id}">${element.name}</a>`);
    });
  });
}

// En la función categories agregamos un parametro y lo usamos para ingresar al otro URL de la API
function categories(ctx) {
  let containerSearch = $('#contente-search');
  containerSearch.html('');
  $.get(`https://api.mercadolibre.com/categories/${ctx.params.list}`, function(data, status) {
    data.children_categories.forEach(element => {
      console.log(`${ctx.params.list}/${element.id}`);
      containerSearch.append(`
        <a href="/categories/${ctx.params.list}/${element.id}"  type="button" class="btn btn-dark btn-lg">${element.name}</a>  
    `);
    });
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