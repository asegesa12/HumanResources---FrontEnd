import { Competencia } from "../models/competencia.model";

export interface CompForm{
  descripcion: string | null;
}

export interface CargarCompetencia {
  total: number;
  competencia: Competencia[];
}
