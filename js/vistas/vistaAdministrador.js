/*
 * Vista administrador
 */
var VistaAdministrador = function(modelo, controlador, elementos) {
  this.modelo = modelo;
  this.controlador = controlador;
  this.elementos = elementos;
  var contexto = this;

  // suscripción de observadores
  this.modelo.preguntaAgregada.suscribir(function() {
    contexto.reconstruirLista();
  });
  this.modelo.preguntaEliminada.suscribir(function() { 
    contexto.reconstruirLista(); });
  this.modelo.preguntasBorradas.suscribir(function () { //agregada aa
    contexto.reconstruirLista();
  });
  this.modelo.preguntaEditada.suscribir(function () { //agregada aa
    contexto.reconstruirLista();
  });

};


VistaAdministrador.prototype = {
  //lista
  inicializar: function() {
    //llamar a los metodos para reconstruir la lista, configurar botones y validar formularios
    //this.controlador.traer(); //actualiza la preguntas 
    this.controlador.traer();
    this.reconstruirLista();
    this.configuracionDeBotones();
    validacionDeFormulario();
  },

  construirElementoPregunta: function(pregunta){
    var contexto = this;
    var nuevoItem;
    nuevoItem = $("<li>", {
      class: "list-group-item", id: pregunta.id, text: pregunta.textoPregunta}); //agregado ok
    //completar
    //asignar a nuevoitem un elemento li con clase "list-group-item", id "pregunta.id" y texto "pregunta.textoPregunta"
    var interiorItem = $('.d-flex');
    var titulo = interiorItem.find('h5');
    titulo.text(pregunta.textoPregunta);
    interiorItem.find('small').text(pregunta.cantidadPorRespuesta.map(function(resp){
      return " " + resp.textoRespuesta;
    }));
    nuevoItem.html($('.d-flex').html());
    return nuevoItem;
  },

  reconstruirLista: function() {
    var lista = this.elementos.lista;
    lista.html('');
    this.modelo.traer();
    preguntas=this.modelo.preguntas;
    
    for (var i=0;i<preguntas.length;++i){
      lista.append(this.construirElementoPregunta(preguntas[i]));
    }
  },

  configuracionDeBotones: function(){
    var e = this.elementos;
    var contexto = this;

    //asociacion de eventos a boton
    e.botonAgregarPregunta.click(function() {
      var value = e.pregunta.val();
      var respuestas = [];
      var cantVotos=0;
      if (value==''){ // no se crea value está vacío
        return}
      $('[name="option[]"]').each(function() {
        //completar
        respuesta = $(this).val();
      if (respuesta!=''){ // no agrega si respusta está vacío
        respuestas.push({'textoRespuesta': respuesta, 'cantidad': cantVotos});       
      }
      })
      contexto.limpiarFormulario();
      contexto.controlador.agregarPregunta(value, respuestas);
    });
    //boton borrarPregunta 
    e.botonBorrarPregunta.click(function() {
      var id = parseInt($(".list-group-item.active").attr("id"));
      console.log("en vista",id);
      contexto.controlador.borrarPregunta(id);      
      contexto.limpiarFormulario();
    });

    e.borrarTodo.click(function() {
      console.log("en vista");
      contexto.controlador.borrarTodo();      
      contexto.limpiarFormulario();
    });

    e.botonEditarPregunta.click(function() {
      var id = parseInt($(".list-group-item.active").attr("id"));
      console.log("en editar preugfdsafs", id);
      var nuevaPregunta = prompt("Ingrese el nuevo texto de la pregunta");
      contexto.controlador.editarPregunta(id,nuevaPregunta);
      contexto.limpiarFormulario();
    });

  },

  limpiarFormulario: function(){
    $('.form-group.answer.has-feedback.has-success').remove();
  },
};
