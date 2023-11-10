type Vertex<T> = {
  value: T;
  edges: Set<T>;
};

export class Graph<T> {
  private vertices: Map<T, Vertex<T>> = new Map();

  public addVertex(value: T): void {
    this.vertices.set(value, { value, edges: new Set() });
  }

  public addEdge(from: T, to: T): void {
    const fromVertex = this.vertices.get(from);
    const toVertex = this.vertices.get(to);

    if (!fromVertex || !toVertex) {
      throw new Error("Invalid vertices");
    }

    fromVertex.edges.add(to);
    toVertex.edges.add(from);
  }

  public removeVertex(value: T): void {
    const vertex = this.vertices.get(value);

    if (!vertex) {
      throw new Error("Invalid vertex");
    }

    for (const adjacentVertex of vertex.edges) {
      this.removeEdge(value, adjacentVertex);
    }

    this.vertices.delete(value);
  }

  public removeEdge(from: T, to: T): void {
    const fromVertex = this.vertices.get(from);
    const toVertex = this.vertices.get(to);

    if (!fromVertex || !toVertex) {
      throw new Error("Invalid vertices");
    }

    fromVertex.edges.delete(to);
    toVertex.edges.delete(from);
  }

  public getVertices(): T[] {
    return Array.from(this.vertices.keys());
  }

  public getEdges(value: T): T[] {
    const vertex = this.vertices.get(value);

    if (!vertex) {
      throw new Error("Invalid vertex");
    }

    return Array.from(vertex.edges);
  }

  public getVertex(value: T): Vertex<T> {
    const vertex = this.vertices.get(value);

    if (!vertex) {
      throw new Error("Invalid vertex");
    }

    return vertex;
  }
}
