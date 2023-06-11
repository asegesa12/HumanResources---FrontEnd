import { Capacitacion } from "../models/capacitacion.model";

export interface CapacitacionForm{
   descripcion: string | null,
   NivelCapacitacion: string | null,
   FechaDesde: Date | null,
   fechaHasta: Date | null,
   Institucion: string | null,
}

export interface CargarCapacitacion {
  total: number;
  capacitacion: Capacitacion[];
}
