/*
 * Vista usuario
 */
var VistaUsuario = function (modelo, controlador, elementos) {
  this.modelo = modelo;
  this.controlador = controlador;
  this.elementos = elementos;
  var contexto = this;

  //suscripcion a eventos del modelo
  this.modelo.preguntaAgregada.suscribir(function () { 
    contexto.reconstruirLista();
    contexto.reconstruirGrafico(); // también se usa para resp. agregada
  });
  this.modelo.preguntaEliminada.suscribir(function () { //agregada aa
    contexto.reconstruirLista();
    contexto.reconstruirGrafico();
  });
  this.modelo.preguntasBorradas.suscribir(function () { //agregada aa
    contexto.reconstruirLista();
    contexto.reconstruirGrafico();
  });
  this.modelo.preguntaEditada.suscribir(function () { //agregada aa
    contexto.reconstruirLista();
    contexto.reconstruirGrafico();
  });
};

VistaUsuario.prototype = {
  //muestra la lista por pantalla y agrega el manejo del boton agregar
  inicializar: function () {
    console.log("inicializando vu");
    var elementos = this.elementos;
    var contexto = this;
    contexto.controlador.traer();// hace que modelo lea del
    this.reconstruirLista();
    elementos.botonAgregar.click(function () {
      contexto.agregarVotos();
    });

    this.reconstruirGrafico();
  },

  //reconstruccion de los graficos de torta
  reconstruirGrafico: function () {
    var contexto = this;
    var preguntas = this.modelo.preguntas;
    preguntas.forEach(function (clave) {
      var listaParaGrafico = [[clave.textoPregunta, 'Cantidad']];
      var respuestas = clave.cantidadPorRespuesta;
      respuestas.forEach(function (elemento) {
        listaParaGrafico.push([elemento.textoRespuesta, elemento.cantidad]);
      });
      contexto.dibujarGrafico(clave.textoPregunta, listaParaGrafico);
    })
  },


  reconstruirLista: function () {
    var listaPreguntas = this.elementos.listaPreguntas;
    listaPreguntas.html('');
    var contexto = this;
    var preguntas = this.modelo.preguntas;
    preguntas.forEach(function (clave) {
      nuevoItem = $("<div>", {
        value: clave.textoPregunta, id: clave.id, text: clave.textoPregunta
      }); //
      listaPreguntas.append(nuevoItem);
      var respuestas = clave.cantidadPorRespuesta;
      contexto.mostrarRespuestas(listaPreguntas, respuestas, clave);
    })
  },

  //muestra respuestas
  mostrarRespuestas: function (listaPreguntas, respuestas, clave) {
    respuestas.forEach(function (elemento) {
      listaPreguntas.append($('<input>', {
        type: 'radio',
        value: elemento.textoRespuesta,
        name: clave.id,
      }));
      listaPreguntas.append($("<label>", {
        for: elemento.textoRespuesta,
        text: elemento.textoRespuesta
      }));
    });
  },
  agregarVotos: function () {
    var contexto = this;
    $('#preguntas').find('div').each(function () {
      var nombrePregunta = $(this).attr('value');
      var id = $(this).attr('id');
      var respuestaSeleccionada = $('input[name=' + id + ']:checked').val();
     //$('input[name=' + id + ']').prop('checked', false); ya se lmpia con la reconstrucción
      if (respuestaSeleccionada != undefined) {
        contexto.controlador.agregarVoto(nombrePregunta, respuestaSeleccionada)
      };
    });
    this.reconstruirLista();//inicializo para que se actualice todo
    this.reconstruirGrafico();
  },


  dibujarGrafico: function (nombre, respuestas) {
    var seVotoAlgunaVez = false;
    for (var i = 1; i < respuestas.length; ++i) {
      if (respuestas[i][1] > 0) {
        seVotoAlgunaVez = true;
      }
    }
    var contexto = this;
    google.charts.load("current", { packages: ["corechart"] });
    google.charts.setOnLoadCallback(drawChart);
    function drawChart() {
      var data = google.visualization.arrayToDataTable(respuestas);

      var options = {
        title: nombre,
        is3D: true,
      };
      var ubicacionGraficos = contexto.elementos.graficosDeTorta;
      var id = (nombre.replace(/\W/g, '')).split(' ').join('') + '_grafico';
      if ($('#' + id).length) { $('#' + id).remove() }
      var div = document.createElement('div');
      ubicacionGraficos.append(div);
      div.id = id;
      div.style.width = '400';
      div.style.height = '300px';
      var chart = new google.visualization.PieChart(div);
      if (seVotoAlgunaVez) {
        chart.draw(data, options);
      }
    }
  },
};
