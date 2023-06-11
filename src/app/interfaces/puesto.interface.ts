import { Puesto } from "../models/puesto.model";

export interface PuestoForm {

    nombre: string | null
     NivelRiesgo: string | null,
     SalarioMin: number | null,
     SalarioMax: number | null
}

export interface CargarPuesto {
  total: number;
  puesto: Puesto[];
}
