export interface riesgo{
  id:number | null;
  idProyecto: number | null;
  nombreProyecto: string;
  nombreRiesgo: string;
  fechaDeteccion:string;
  fechaCierre:string;
  etiquetas:string[];
  descripcionRiesgo:string;
  estadoRiesgo:string;
  audiencia:string;
  categoria:string;
  tipoRiesgo:string;
  detalleTipoRiesgo:string;
  probabilidadDeOcurrenciaDelRiesgo:number;
  impactoDeOcurrenciaDelRiesgo:number;
  descripcionPlanDeMitigacion:string;
  emailsPlanMitigacion: string[];
  descripcionPlanDeContingencia:string;
  emailsPlanContingencia:string[];
  valorCriticidad:number;
  estadoDeVidaDelRiesgo:string;
}
