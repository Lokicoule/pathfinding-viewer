import { createContext } from "react";
import { GridStore } from "../GridStore";

export const GridStoreContext = createContext<GridStore | null>(null);
