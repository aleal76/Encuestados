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
      var idABorrar = this.preguntas.findIndex(function (element) {
        return (element.id==id);
      });
      console.log("borrando",idABorrar);
      this.preguntas.splice(idABorrar, 1);
      this.guardar();
      this.preguntaEliminada.notificar();
    }
    return;
  },
// BORRA TODOS
  borrarTodo: function () {
    console.log("en borrartodo modelo");
    if (this.preguntas.length>0) {
      console.log("borrando");
      this.preguntas.splice(0,(this.preguntas.length));
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
  if(this.preguntas.length==0  && localStorage.getItem("preguntasGuardadas")!=null) //trae preguntas solo si está vacío y el LS tiene data
    {
      console.log("cargando datos de ls");
      this.preguntas=JSON.parse(localStorage.getItem("preguntasGuardadas"))
    }
},
//agregar voto
agregarVotos: function (nombre, respuestas) {
  var id = this.obtenerUltimoId();
  id++;
  var nuevaPregunta = { 'textoPregunta': nombre, 'id': id, 'cantidadPorRespuesta': respuestas };
  this.preguntas.push(nuevaPregunta);
  this.guardar();
  this.preguntaAgregada.notificar();
},




};


// agregar respuesta, eliminar pregunta, sumarle 1 al voto de una respuesta, editar una pregunta, borrar todas las preguntas