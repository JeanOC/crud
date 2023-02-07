import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from '../../models/usuario';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UsuarioService } from '../../services/usuario.service';


@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.css']
})
export class CrearUsuarioComponent implements OnInit{
  usuarioForm: FormGroup;
  titulo = 'Crear Usuario';
  id: string | null;

  constructor(private fb: FormBuilder,
              private router: Router,
              private toastr: ToastrService,
              private _usuarioService: UsuarioService,
              private aRouter: ActivatedRoute) {
    this.usuarioForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      semestre: ['', Validators.required],
      cedula: ['', Validators.required],
    })
    this.id = this.aRouter.snapshot.paramMap.get('id');
  }

  agregarUsuario() {
 
    const USUARIO: Usuario = {
      nombre: this.usuarioForm.get('nombre')?.value,
      apellido: this.usuarioForm.get('apellido')?.value,
      semestre: this.usuarioForm.get('semestre')?.value,
      cedula: this.usuarioForm.get('cedula')?.value,
    }

    if(this.id !== null){
      this._usuarioService.editarUsuario(this.id, USUARIO).subscribe(data =>{
        this.toastr.info('Usuario actualizado con exito!', 'Usuario Actualizado!');
        this.router.navigate(['/']);
      }, error => {
        console.log(error);
        this.usuarioForm.reset();
      })
    } else {
      console.log(USUARIO);
      this._usuarioService.guardarUsuario(USUARIO).subscribe(data => {
      this.toastr.success('Usuario agregado con exito!', 'Usuario Agregado!');
      this.router.navigate(['/']);
    }, error => {
      console.log(error);
      this.usuarioForm.reset();
    })
    }

    

    
  }
  ngOnInit(): void {
    this.esEditar();
  }
  esEditar(){
    if(this.id !== null){
      this.titulo = 'Editar Usuario';
      this._usuarioService.obtenerUsuario(this.id).subscribe(data => {
        this.usuarioForm.setValue({
          nombre: data.nombre,
          apellido: data.apellido,
          semestre: data.semestre,
          cedula: data.cedula
        })
      })
    }
 }
}
