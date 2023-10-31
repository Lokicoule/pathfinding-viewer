import { Node } from "../entities/Node";

export interface Algorithm {
  run(): Node[];
}
