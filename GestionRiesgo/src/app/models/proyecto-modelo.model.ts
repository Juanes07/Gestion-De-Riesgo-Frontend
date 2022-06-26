export interface proyecto{
  id:number | null;
  nombre: string;
  fechaInicio:string;
  fechaFin:string;
  etiquetas:string[];
  responsables:string[];
  descripcion:string;
  liderProyecto:string;
  estado:string;
}
