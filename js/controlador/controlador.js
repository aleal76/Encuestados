/*
 * Controlador
 */
var Controlador = function (modelo) {
  this.modelo = modelo;
};

Controlador.prototype = {
  agregarPregunta: function (pregunta, respuestas) {
    this.modelo.agregarPregunta(pregunta, respuestas);
  },
  borrarPregunta: function (id) {
     this.modelo.borrarPregunta(id);
  },
  borrarTodo: function () {
     this.modelo.borrarTodo();
  },
  traer: function () {  //recupera preguntas del local storage 
     this.modelo.traer();
  },
  agregarVoto: function (nombrePregunta, respuestaSeleccionada) {  //agregavoto a una pregunta
    this.modelo.agregarVoto(nombrePregunta, respuestaSeleccionada);
  },
  editarPregunta: function (id,nuevaPregunta) {  //modifica pregunta id
    this.modelo.editarPregunta(id,nuevaPregunta);
  },

};
