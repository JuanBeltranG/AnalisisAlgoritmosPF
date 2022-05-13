

  function cuentaOcurrencias() {

    const input = document.getElementById("texto");
    const texto = input.value;

    var ocurrencias = new Map();

    for (var i = 0; i < texto.length; i++) {

        currChar = texto.charAt(i);

        if (ocurrencias.has(currChar)) {
            //El caracter ya ha sido guardado en el map
            ocurrencias.set(currChar, ocurrencias.get(currChar) + 1);

        } else {
            //No hay ningun registro de ese caracter en el map
            ocurrencias.set(currChar, 1);
        }

    }

    //Con este nuevo mapa tendremos los caracteres ordenados de acuerdo a su frecuencia
    //Esto nos servira al momento de imprimir los primeros nodos
    var ocurrenciasOrdenadas = new Map([...ocurrencias.entries()].sort((a, b) => a[1] - b[1]));
    console.log(ocurrenciasOrdenadas);


    //Aqui declaramos nuestro espacio donde el grafo sera dibujado asi como las proiedades de estilo
    var cy = cytoscape({
    container: document.getElementById('cy'),
    /*elements: [
      { data: { id: 'a' } },
      { data: { id: 'b' } },
      {
        data: {
          id: 'ab',
          source: 'a',
          target: 'b'
        }
      }],*/
      style: [
        {
          selector: 'node',
          css: {
            'content': 'data(id)',
            'text-valign': 'center',
            'text-halign': 'center'
          }
        }]
  });



  //Añadimos los nodos a nuestro grafo, los cuales seran igual a los n caracteres diferentes que se ingresen
  for (let [key, value] of ocurrenciasOrdenadas) {
   
    cy.add({
      data: { id: key + "/" + value }
    });

  }

  //Se configura el layout como de tipo grid ya que esto permite que inicialmente todos los nodos
  //aparezcan en una sola linea horizontal
  var layout = cy.layout({
    name: 'grid',
    rows: 1
  });

  layout.run();



}