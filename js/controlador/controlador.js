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
    console.log("encontrolador",id);
    this.modelo.borrarPregunta(id);
  },
  borrarTodo: function () {
    console.log("encontrolador");
    this.modelo.borrarTodo();
  },
  traer: function () {  //recupera preguntas del local storage 
    console.log("encontroladortraer");
    this.modelo.traer();
  },
  agregarVoto: function () {  //agregavoto a una pregunta
    console.log("encontroladoragregavoto");
    this.modelo.agregarVoto();
  },


};
