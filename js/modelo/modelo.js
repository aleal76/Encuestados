/*
 * Modelo
 */
var Modelo = function () {
  this.preguntas = [];
  this.ultimoId = 0;

  //inicializacion de eventos
  this.preguntaAgregada = new Evento(this);
  this.preguntaEliminada = new Evento(this);
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
    this.preguntas.push(nuevaPregunta);
    this.guardar();
    this.preguntaAgregada.notificar();
  },

  borrarPregunta: function (id) {
    console.log("en borrar", id);
    if (!isNaN(id)) {
      var idABorrar = this.preguntas.find(function (element) {
        if (element.id == id) {
          console.log("debugiando id en find",element.id);
          return (element.id); 
        }
      });
      console.log("borrando",idABorrar);
      this.preguntas.splice(idABorrar, 1);
      this.guardar();
      this.preguntaEliminada.notificar();
    }
    return;
  },


  //se guardan las preguntas
  guardar: function () {
  },
};
