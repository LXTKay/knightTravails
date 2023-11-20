"use strict"

export class Graph {
  constructor(numberOfVertices){
    this.numberOfVertices = numberOfVertices;
    this.adjacentList = new Map(); //key: vertex | value: array of adjacent vertex
  };
  addVertex(vertex){
    this.adjacentList.set(vertex,[])
  };
  addEdge(source, destination){
    //gets array of vertices adjacent to source and adds destination vertex to it, creating an "edge"
    this.adjacentList.get(source).push(destination);
    //same but vice versa
    this.adjacentList.get(destination).push(source);
  };
  printGraph(){
    // get all the vertices
    let keys = this.adjacentList.keys();

    // iterate over the vertices
    for (let i of keys) {
        // get the corresponding adjacency list
        // for the vertex
        let values = this.adjacentList.get(i);
        let string = "";

        // iterate over the adjacency list
        // concatenate the values into a string
        for (var j of values)
            string += j + " ";

        // print the vertex and its adjacency list
        console.log(i + " -> " + string);
    };
  };
  breadthFirstSearch(startNode, callback = null){
    let visited = {};
    let queue = [];
    visited[startNode] = true;
    queue.push(startNode);

    while(queue.length != 0){
      let currentNode = queue.shift();

      //cb
      if(callback !== null) callback(currentNode);

      let currentNodeAdjacentList = this.adjacentList.get(currentNode);

      for (let i in currentNodeAdjacentList) {
        let adjacentNode = currentNodeAdjacentList[i];

        if (!visited[adjacentNode]) {
            visited[adjacentNode] = true;
            queue.push(adjacentNode);
        };
      };
    };
  };
  depthFirstSearch(node, callback = null, visited = {}){
    visited[node] = true;

    //cb
    if(callback !== null) callback(node);
 
    let neighbours = this.adjacentList.get(node);
 
    for (let i in neighbours) {
        let currentNode = neighbours[i];
        if (!visited[currentNode]) this.depthFirstSearch(currentNode, callback, visited);
    };
  };
};

// //Test
// var g = new Graph(6);
// var vertices = [ 'A', 'B', 'C', 'D', 'E', 'F' ];
 
// // adding vertices
// for (var i = 0; i < vertices.length; i++) {
//     g.addVertex(vertices[i]);
// }
 
// // adding edges
// g.addEdge('A', 'B');
// g.addEdge('A', 'D');
// g.addEdge('A', 'E');
// g.addEdge('B', 'C');
// g.addEdge('D', 'E');
// g.addEdge('E', 'F');
// g.addEdge('E', 'C');
// g.addEdge('C', 'F');
 
// // prints all vertex and
// // its adjacency list
// // A -> B D E
// // B -> A C
// // C -> B E F
// // D -> A E
// // E -> A D F C
// // F -> E C
// g.printGraph();
// console.log("BFS");
// g.breadthFirstSearch('A');


// // prints
// // DFS
// // A B C E D F
// console.log("DFS");
// g.depthFirstSearch('A');