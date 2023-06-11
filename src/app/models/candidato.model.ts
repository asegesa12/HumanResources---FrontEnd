
import { Idioma } from "./idioma.model";
import { Puesto } from "./puesto.model";


export class Candidato {
  constructor(
    public cedula: string,
    public nombre: string,
    public idioma?: Idioma,
    public puesto?: Puesto,
    public departamento?: string,
    public salario?: number,
    public competencia?: string,
    public capacitacion?: string,
    public experiencia_Laboral?: string,
    public recomendadoPor?: string,

    public uid?: string

  ) {}
}
