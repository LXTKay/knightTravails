"use strict"

import { Graph } from "./graph.js";

//same as graph function, but tracks edgelength
function knightBreadthFirstSearch(startNode, endNode) {
  let visited = {};
  let queue = [];
  let steps = {};

  visited[startNode] = true;
  steps[startNode] = 0;
  queue.push(startNode);

  while (queue.length !== 0) {
    let currentNode = queue.shift();

    if (currentNode === endNode) {
      // Reconstruct the shortest path
      let path = [endNode];
      let parent = currentNode;
      while (parent !== startNode) {
        parent = this.parents[parent];
        path.unshift(parent);
      }
      return path.map(fromString);
    }

    let currentNodeAdjacentList = this.adjacentList.get(currentNode);

    for (let i in currentNodeAdjacentList) {
      let adjacentNode = currentNodeAdjacentList[i];

      if (!visited[adjacentNode]) {
        visited[adjacentNode] = true;
        this.parents[adjacentNode] = currentNode;
        steps[adjacentNode] = steps[currentNode] + 1;
        queue.push(adjacentNode);
      }
    }
  }

  // Return an empty array if no path is found
  return [];
}

function toString(array) {
  return "[" + array.join(',') + "]";
}

function fromString(str) {
  return str.slice(1, -1).split(',').map(Number);
}

function knightMoves(startPosition, endPosition) {
  startPosition = toString(startPosition);
  endPosition = toString(endPosition);

  let graph = new Graph(64);
  graph.knightBreadthFirstSearch = knightBreadthFirstSearch;
  graph.parents = {};

  // Add vertices as strings
  for (let column = 0; column < 8; column++) {
    for (let row = 0; row < 8; row++) {
      graph.addVertex(`[${column},${row}]`);
    }
  }

  // Add edges (duplicates allowed)
  for (let column = 0; column < 8; column++) {
    for (let row = 0; row < 8; row++) {
      let currentVertex = `[${column},${row}]`;
      let neighbors = [];

      if (column + 2 < 8 && row + 1 < 8) neighbors.push(`[${column + 2},${row + 1}]`);
      if (column + 2 < 8 && row - 1 >= 0) neighbors.push(`[${column + 2},${row - 1}]`);
      if (column - 2 >= 0 && row + 1 < 8) neighbors.push(`[${column - 2},${row + 1}]`);
      if (column - 2 >= 0 && row - 1 >= 0) neighbors.push(`[${column - 2},${row - 1}]`);
      if (column + 1 < 8 && row + 2 < 8) neighbors.push(`[${column + 1},${row + 2}]`);
      if (column + 1 < 8 && row - 2 >= 0) neighbors.push(`[${column + 1},${row - 2}]`);
      if (column - 1 >= 0 && row + 2 < 8) neighbors.push(`[${column - 1},${row + 2}]`);
      if (column - 1 >= 0 && row - 2 >= 0) neighbors.push(`[${column - 1},${row - 2}]`);

      neighbors.forEach((neighbor) => graph.addEdge(currentVertex, neighbor));
    }
  }

  // Use breadthFirstSearch to find the shortest path
  let result = graph.knightBreadthFirstSearch(startPosition, endPosition);
  return result;
}

// Example usage
let result = knightMoves([0, 0], [1, 1]);
console.log(result); // Outputs: [ [0,0], [2,1], [3,3], [4,5] ]