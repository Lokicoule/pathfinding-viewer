import { createContext } from "react";
import { Node } from "../../../domain/entities/Node";

export const GridStoreContext = createContext<Node[][] | null>(null);
