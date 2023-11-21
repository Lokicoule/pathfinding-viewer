import { Node } from "../../environment/entities/Node";

export interface AlgorithmRunner {
  run(): Node[];
}
