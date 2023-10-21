import { createContext } from "react";
import { Mediator } from "../Mediator";

export const MediatorContext = createContext<Mediator | null>(null);
