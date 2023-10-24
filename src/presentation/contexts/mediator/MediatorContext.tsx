import { createContext } from "react";
import { Mediator } from "../../../application/mediator/Mediator";

export const MediatorContext = createContext<Mediator | null>(null);
