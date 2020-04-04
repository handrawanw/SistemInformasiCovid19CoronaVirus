import {createContext} from "react";

const url="https://covid19.mathdro.id/api";

export const urlContext=createContext(url);
export let covidContext=createContext({});
