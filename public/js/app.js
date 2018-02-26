
// Usamos libreria page.js para generar nuestras rutas dentro de la misma página
page('/', index);
page('/:categories', categories);
page('/:categories/:id', list);
page('*', function() {
  $('#contente-search').html('No existe contenido en la sección');
});
page();

// Llamando elementos principales desde el DOM
const $btn = $('#btn-search');
let input = $('#search');

// En la función index, mostramos lo que hará apenas cargue la página
function index() {
  $('#contente-list').html('');
  $('#container-search').html('');
  $('#contente-search').html(''); 

  $('#container-search').html('<h1> Bienvenido a Tienda Online </h1>');
  $.get('https://api.mercadolibre.com/sites/MPE/categories', function(data, status) {
    data.forEach(element => {     
      let listCategories = $('#categories');
      listCategories.append(`
        <a class="dropdown-item" href="/${element.id}" data-id = "${element.id}" data-name = "${element.name}">${element.name}</a> `);
    });
  });
}


// En la función categories agregamos un parametro y lo usamos para ingresar al otro URL de la API
function categories(ctx) {
  let containerSearch = $('#contente-search');
  let containerList = $('#contente-list');
  
  containerList.html('');
  containerSearch.html('');
  $('#container-search').html('');
  $.get(`https://api.mercadolibre.com/categories/${ctx.params.categories}`, function(data, status) {   
    containerSearch.append(`      
      <figure>
      <img src="${data.picture}"class="img-fluid" alt="">     
      </figure>
    `);
    data.children_categories.forEach(element => {  
      containerSearch.append(`
      <li class="nav-item active">
        <a class="nav-link" href="/${ctx.params.categories}/${element.id}" data-namelist ="${element.name}" id ="nameList">${element.name}<span class="sr-only">(current)</span></a>
      </li>
       `);
    });
  });
}


// Evento click para el buscador de productos 
$btn.click(function(event) {
  event.preventDefault();
  $('#contente-list').html('');
  $('#contente-search').html('');
  $('#container-search').html('');
  $.get(`https://api.mercadolibre.com/sites/MPE/search?condition=new&q=${input.val()}`, function(data, status) {
    data.results.forEach(element => {
      $('#container-search').append(` <div class="card m-2" style="width: 18rem;">
      <img class="card-img-top" src="${element.thumbnail}" alt="Card image cap">
      <div class="card-body">
      <h5 class="card-title">S/. ${element.price}</h5>
      <h6 class="card-title">${element.listing_type_id}</h6>
      <p class="card-text">${element.title}.</p>
      <a class="btn btn-primary" id="product" price = "${element.price}" title = "${element.listing_type_id}">Comprar</a>
      </div>
      </div>`);
    });
    input.val('');
  });  
});


// Funcion que lista los productos de cada categoria al momento de seleccionar
function list(ctx) {
  $('#contente-list').html('');
  let id = ctx.params.list;
  let nameList = $('#nameList').data('namelist');
  console.log($(this));
  console.log(nameList);
  console.log(id); 

  /*
  $.get(`https://api.mercadolibre.com/sites/MPE/search?category=${nameList}`, function(data, status) {
    data.results.forEach(element => {
      $('#contente-list').append(` <div class="card m-2" style="width: 18rem;">
      <img class="card-img-top" src="${element.thumbnail}" alt="Card image cap">
      <div class="card-body">
        <h5 class="card-title">S/. ${element.price}</h5>
        <p class="card-text">${element.title}.</p>
        <a href="#" class="btn btn-primary" id="btn-pay">Comprar</a>
      </div>
    </div>`);
    }); 
  }); 
  */
}