export interface riesgo{
  id:number;
  idProyecto: number;
  creadorRiesgo: string;
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
  emailsPlanDeMitigacion: string[];
  descripcionPlanDeContingencia:string;
  emailsPlanDeContingencia:string[];
  valorCriticidad:number;
  estadoDeVidaDelRiesgo:string;
}
