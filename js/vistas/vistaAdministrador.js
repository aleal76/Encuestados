/*
 * Vista administrador
 */
var VistaAdministrador = function (modelo, controlador, elementos) {
  this.modelo = modelo;
  this.controlador = controlador;
  this.elementos = elementos;
  var contexto = this;

  // suscripción de observadores
  this.modelo.preguntaAgregada.suscribir(function () {
    contexto.reconstruirLista();
  });
  this.modelo.preguntaEliminada.suscribir(function () {
    contexto.reconstruirLista();
  });
  this.modelo.preguntasBorradas.suscribir(function () { //agregada aa
    contexto.reconstruirLista();
  });
  this.modelo.preguntaEditada.suscribir(function () { //agregada aa
    contexto.reconstruirLista();
  });

};


VistaAdministrador.prototype = {
  //lista
  inicializar: function () {
    this.controlador.traer();
    this.reconstruirLista();
    this.configuracionDeBotones();
    validacionDeFormulario();
  },

  construirElementoPregunta: function (pregunta) {
    var contexto = this;
    var nuevoItem;
    nuevoItem = $("<li>", {
      class: "list-group-item", id: pregunta.id, text: pregunta.textoPregunta
    }); //agregado ok
    //completar
    //asignar a nuevoitem un elemento li con clase "list-group-item", id "pregunta.id" y texto "pregunta.textoPregunta"
    var interiorItem = $('.d-flex');
    var titulo = interiorItem.find('h5');
    titulo.text(pregunta.textoPregunta);
    interiorItem.find('small').text(pregunta.cantidadPorRespuesta.map(function (resp) {
      return " " + resp.textoRespuesta;
    }));
    nuevoItem.html($('.d-flex').html());
    return nuevoItem;
  },

  reconstruirLista: function () {
    var lista = this.elementos.lista;
    lista.html('');
    this.modelo.traer();
    preguntas = this.modelo.preguntas;

    for (var i = 0; i < preguntas.length; ++i) {
      lista.append(this.construirElementoPregunta(preguntas[i]));
    }
  },

  configuracionDeBotones: function () {
    var e = this.elementos;
    var contexto = this;

    //asociacion de eventos a boton
    e.botonAgregarPregunta.click(function () {
      var value = e.pregunta.val();
      var respuestas = [];
      if (value == '' || $('[name="option[]"]').val() == '') {
        return; // valida pregunta y respesta 
      }
      $('[name="option[]"]').each(function () {
        respuesta = $(this).val();
        nuevaRespuesta = { 'textoRespuesta': respuesta, 'cantidad': 0 };
        if (nuevaRespuesta.textoRespuesta != '') {
          respuestas.push(nuevaRespuesta);
        }
      });
      contexto.limpiarFormulario();
      contexto.controlador.agregarPregunta(value, respuestas);
    });
    //boton borrarPregunta 
    e.botonBorrarPregunta.click(function () {
      var id = parseInt($(".list-group-item.active").attr("id"));
      contexto.controlador.borrarPregunta(id);
      contexto.limpiarFormulario();
    });

    e.borrarTodo.click(function () {
      contexto.controlador.borrarTodo();
      contexto.limpiarFormulario();
    });

    e.botonEditarPregunta.click(function () {
      var id = parseInt($(".list-group-item.active").attr("id"));
      if (id > -1) {
        var nuevaPregunta = prompt("Ingrese el nuevo texto de la pregunta");
        if (nuevaPregunta != '') {
          contexto.controlador.editarPregunta(id, nuevaPregunta);
          contexto.limpiarFormulario();
        }
        else {
          alert("Ingrese una pregunta válida");
        }
      }
    });
  },

  limpiarFormulario: function () {
    $('.form-group.answer.has-feedback.has-success').remove();
  },
};
