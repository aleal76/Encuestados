/*
 * Modelo
 */
var Modelo = function () {
  this.preguntas = [];
  this.ultimoId = 0;

  //inicializacion de eventos
  this.preguntaAgregada = new Evento(this);
  this.preguntaEliminada = new Evento(this);
  this.preguntasBorradas = new Evento(this); //ultimo agregado
  this.preguntaEditada = new Evento(this);
};

Modelo.prototype = {
  //se obtiene el id más grande asignado a una pregunta
  obtenerUltimoId: function () {
    var mayorId = 0;
    if (this.preguntas.length == 0) {
      return (-1); // si está vacío 0
    }

    this.preguntas.forEach(function (element) {
      if (mayorId < element.id) {
        mayorId = element.id;
      }

    })
    return (mayorId);
  },

  //se agrega una pregunta dado un nombre y sus respuestas
  agregarPregunta: function (nombre, respuestas) {
    var id = this.obtenerUltimoId();
    id++;
    var nuevaPregunta = { 'textoPregunta': nombre, 'id': id, 'cantidadPorRespuesta': respuestas };
    this.preguntas.push(nuevaPregunta);console
    this.guardar();
    this.preguntaAgregada.notificar();
  },

  borrarPregunta: function (id) {
    if (!isNaN(id)) {
      var idABorrar = this.preguntas.findIndex(function (element) {
        return (element.id == id);
      });
      this.preguntas.splice(idABorrar, 1);
      this.guardar();
      this.preguntaEliminada.notificar();
    }
    return;
  },
  // BORRA TODOS
  borrarTodo: function () {
    if (this.preguntas.length > 0) {
      this.preguntas.splice(0, (this.preguntas.length));
      this.guardar();
      this.preguntaEliminada.notificar();
    }
    return;
  },

  //se guardan las preguntas en localStorage
  guardar: function () {
    localStorage.setItem("preguntasGuardadas", JSON.stringify(this.preguntas));
  },
  //recupera las preguntas del localStorage
  traer: function () {
    if (this.preguntas.length == 0 && localStorage.getItem("preguntasGuardadas") != null) //trae preguntas solo si está vacío y el LS tiene data
    {
      this.preguntas = JSON.parse(localStorage.getItem("preguntasGuardadas"))
    }
  },
  //agregar voto
  agregarVoto: function (nombrePregunta, respuestaSeleccionada) {
    var idPregunta = this.preguntas.findIndex(function (element) {
      return (element.textoPregunta == nombrePregunta);  //busca index de la pregunta
    });
    var idRespuesta = this.preguntas[idPregunta].cantidadPorRespuesta.findIndex(function (element) {
      return (element.textoRespuesta == respuestaSeleccionada); //busca index de la respuesta
    });
    if (idPregunta > -1 && idRespuesta > -1) { //incrementa si hay respuesta
      this.preguntas[idPregunta].cantidadPorRespuesta[idRespuesta].cantidad++;
      this.guardar(); // cada vez que se tocan datos guarda en ls
    }
  },

  editarPregunta: function (idPregunta, nuevaPregunta) {
    if (!isNaN(idPregunta)) {
      var idAEditar = this.preguntas.findIndex(function (element) {
        return (element.id == idPregunta);
      });
      this.preguntas[idAEditar].textoPregunta = nuevaPregunta;
      this.guardar();
      this.preguntaEditada.notificar();
    }
  }

}


// agregar respuesta, eliminar pregunta, sumarle 1 al voto de una respuesta, editar una pregunta, borrar todas las preguntas