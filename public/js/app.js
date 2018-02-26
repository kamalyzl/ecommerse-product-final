

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
  let containerSearch = $('#contente-search');

  containerSearch.html('<h1 class = "text-center"> Bienvenido a Tienda Online </h1>');
  $.get('https://api.mercadolibre.com/sites/MPE/categories', function(data, status) {
    // console.log(data);
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
  let name = $('.dropdown-item').data('name');
  let id = $('#categories').data('id');
  console.log(ctx.params.categories);
  // console.log(id);
  
  containerList.html('');
  containerSearch.html('');
  $.get(`https://api.mercadolibre.com/categories/${ctx.params.categories}`, function(data, status) {   
    console.log(data);
    containerSearch.append(`      
      <figure>
      <img src="${data.picture}"class="img-fluid" alt="">     
      </figure>
    `);
    data.children_categories.forEach(element => {    
      localStorage.setItem('producto', element.name);
      containerSearch.append(`
      <li class="nav-item active">
        <a class="nav-link" href="/${ctx.params.categories}/${element.id}" data-namelist ="${element.name}" id ="nameList">${element.name}<span class="sr-only">(current)</span></a>
      </li>
       `);
    });
  });
}
 
// Funcion que lista los productos de cada categoria al momento de seleccionar
function list(ctx) {
  let containerList = $('#contente-list');
  let id = ctx.params.list;
  let nameList = $('#nameList').data('namelist');
  
  console.log(nameList);
  // containerList.text(localStorage.usuario);
  // $.get(`https://api.mercadolibre.com/sites/MPE/search?category=${localStorage.usuario}`, function(data, status) {
     

  //   data.results.forEach(element => {
  //     containerList.append(` <div class="card m-2" style="width: 18rem;">
  //     <img class="card-img-top" src="${element.thumbnail}" alt="Card image cap">
  //     <div class="card-body">
  //       <h5 class="card-title">S/. ${element.price}</h5>
  //       <p class="card-text">${element.title}.</p>
  //       <a href="#" class="btn btn-primary" id="btn-pay">Comprar</a>
  //     </div>
  //   </div>`);
  //   }); 
  // });
}

// Evento click para el buscador de productos 
$btn.click(function(event) {
  event.preventDefault();
  let containerSearch = $('#contente-search');

  containerSearch.html('');
  $.get(`https://api.mercadolibre.com/sites/MPE/search?condition=new&q=${input.val()}`, function(data, status) {
    data.results.forEach(element => {
      console.log(element);
      containerSearch.append(` <div class="card m-2" style="width: 18rem;">
      <img class="card-img-top" src="${element.thumbnail}" alt="Card image cap">
      <div class="card-body">
        <h5 class="card-title">S/. ${element.price}</h5>
        <h6 class="card-title">${element.listing_type_id}</h6>
        <p class="card-text">${element.title}.</p>
        <a class="btn btn-primary" id="product" price = "${element.price}" title = "${element.listing_type_id}">Comprar</a>
      </div>
    </div>`);
    });
  });
});


