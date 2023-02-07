export class Usuario {
    _id?: number;
    nombre: string;
    apellido: string;
    semestre: string;
    cedula: number;

    constructor(nombre: string, apellido: string, semestre: string, cedula: number ){
        this.nombre = nombre;
        this.apellido = apellido;
        this.semestre = semestre;
        this.cedula = cedula;
    }
}