import { Candidato } from "../models/candidato.model";
import { Idioma } from "../models/idioma.model";
import { Puesto } from "../models/puesto.model";


export interface CandidatoForm{
    cedula: string | null,
     nombre: string | null,
     idioma: Idioma | null,
     puesto: Puesto | null,
     departamento: string | null,
     salario: number | null,
     competencia: string| null,
     capacitacion: string | null,
     experiencia_Laboral: Number | null,
     recomendadoPor: string | null,
}

export interface CargarCandidato {
 total: number;
 candidato: Candidato[];
}
