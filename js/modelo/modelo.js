/*
 * Modelo
 */
var Modelo = function() {
  this.preguntas = [];
  this.ultimoId = 0;

  //inicializacion de eventos
  this.preguntaAgregada = new Evento(this);
  this.preguntaEliminada = new Evento(this);
};

Modelo.prototype = {
   //se obtiene el id más grande asignado a una pregunta
   obtenerUltimoId: function() {
    var mayorId=0;
    if(this.preguntas.length==0)
      {
          return(0); // si está vacío 0
      }
    
    this.preguntas.forEach(function(element) {
        if (mayorId<element.id) 
        {
          mayorId=element.id;
        }

    })
  return(mayorId);
  },

  //se agrega una pregunta dado un nombre y sus respuestas
  agregarPregunta: function(nombre, respuestas) {
    var id = this.obtenerUltimoId();
    id++;
    var nuevaPregunta = {'textoPregunta': nombre, 'id': id, 'cantidadPorRespuesta': respuestas};
    this.preguntas.push(nuevaPregunta);
    this.guardar();
    this.preguntaAgregada.notificar();
  },
  borrarPregunta: function(id) {
    console.log(id); 
    this.preguntas.

    this.guardar();
    this.preguntaEliminada.notificar();
  },


  //se guardan las preguntas
  guardar: function(){
  },
};
