class TreeNode{
  constructor(){
    this.key = null;
    this.val = null;
    this.left = null;
    this.right = null;
  }
}

class MinHeap {

  constructor() {
    // Se inicicializa el array heap y se le agrega un dummy element
    this.heap = [null]
  }

  getMin() {
    // Regresa el elemnto minimo
    return this.heap[1]
  }

  insert(node) {

    // Inserta un nuevo nodo al final del array
    this.heap.push(node)

    // Encontramos la posicion correcta para el nuevo nodo

    if (this.heap.length > 1) {
      let current = this.heap.length - 1

      // Se viaja a traves de los ancestros del nodo actual hasta que el nodo actual sea mayor que uno de sus ancestros
      while (current > 1 && this.heap[Math.floor(current / 2)].val > this.heap[current].val) {

        // Se cambian de posicion los nodos usando la sintaxis de desestructuración
        [this.heap[Math.floor(current / 2)], this.heap[current]] = [this.heap[current], this.heap[Math.floor(current / 2)]]
        current = Math.floor(current / 2)
      }
    }
  }

  remove() {
    // el elemnto mas chico esta el la primera posicion del arreglo
    let smallest = this.heap[1]

    /* Cuando hay mas de dos elementos en el arreglo, ponemos el elemento mas a la derecha en la primera posicion
        y empezamos a comparar con los nodos hijos
    */
    if (this.heap.length > 2) {
      this.heap[1] = this.heap[this.heap.length - 1]
      this.heap.splice(this.heap.length - 1)

      if (this.heap.length === 3) {
        if (this.heap[1].val > this.heap[2].val) {
          [this.heap[1], this.heap[2]] = [this.heap[2], this.heap[1]]
        }
        return smallest
      }

      let current = 1
      let leftChildIndex = current * 2
      let rightChildIndex = current * 2 + 1

      while (this.heap[leftChildIndex] &&
        this.heap[rightChildIndex] &&
        (this.heap[current].val > this.heap[leftChildIndex].val ||
          this.heap[current].val > this.heap[rightChildIndex].val)) {
        if (this.heap[leftChildIndex].val < this.heap[rightChildIndex].val) {
          [this.heap[current], this.heap[leftChildIndex]] = [this.heap[leftChildIndex], this.heap[current]]
          current = leftChildIndex
        } else {
          [this.heap[current], this.heap[rightChildIndex]] = [this.heap[rightChildIndex], this.heap[current]]
          current = rightChildIndex
        }

        leftChildIndex = current * 2
        rightChildIndex = current * 2 + 1
      }
    }

    // Si solo hay dos elemntos en el array simplemente sacamos el primero del array

    else if (this.heap.length === 2) {
      this.heap.splice(1, 1)
    } else {
      return null
    }

    return smallest
  }
}

function generaArbol() {

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

  /*
  //Con este nuevo mapa tendremos los caracteres ordenados de acuerdo a su frecuencia
  //Esto nos servira al momento de imprimir los primeros nodos
  var ocurrenciasOrdenadas = new Map([...ocurrencias.entries()].sort((a, b) => a[1] - b[1]));
  console.log(ocurrenciasOrdenadas);
  */


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

  // Cosas Kevin

  var min_heap = new MinHeap();
  var number_nodes = 0;

  for (let [key, value] of ocurrencias){
    var aux_mode = new TreeNode();
    aux_mode.key = key;
    aux_mode.val = value;
    min_heap.insert(aux_mode);

    cy.add({
      data: { id: key + "/" + value }
    });

    number_nodes++;
  }

  while(min_heap.heap.length > 2){
    var current_node = new TreeNode();
    current_node.left = min_heap.remove();
    current_node.right = min_heap.remove();

    current_node.key = current_node.left.key + "-" + current_node.right.key;
    current_node.val = current_node.left.val + current_node.right.val;

    min_heap.insert(current_node);

    number_nodes++;

    cy.add({
      data: { id: current_node.key + "/" + current_node.val }
    });

    cy.add({
      data: {
        id: current_node.key + current_node.left.key,
        source: current_node.key + "/" + current_node.val,
        target: current_node.left.key + "/" + current_node.left.val
      }
    });
    cy.add({
      data: {
        id: current_node.key + current_node.right.key,
        source: current_node.key + "/" + current_node.val,
        target: current_node.right.key + "/" + current_node.right.val
      }
    });
    
  }
  //Fin Cosas Kevin

  /*
  //Añadimos los nodos a nuestro grafo, los cuales seran igual a los n caracteres diferentes que se ingresen
  for (let [key, value] of ocurrenciasOrdenadas) {

    cy.add({
      data: { id: key + "/" + value }
    });

  }
  */

  //Se configura el layout como de tipo grid ya que esto permite que inicialmente todos los nodos
  //aparezcan en una sola linea horizontal
  var layout = cy.layout({
    name: 'grid',
    rows: Math.log(number_nodes)/Math.LN2
  });

  layout.run();


}