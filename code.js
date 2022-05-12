var cy = cytoscape({
    container: document.getElementById('cy'),
    elements: [
      { data: { id: 'a' } },
      { data: { id: 'b' } },
      {
        data: {
          id: 'ab',
          source: 'a',
          target: 'b'
        }
      }],
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

    //console.log(ocurrencias);


  for (let [key, value] of ocurrencias) {
   
    cy.add({
      data: { id: key + "/" + value }
    });

  }



}