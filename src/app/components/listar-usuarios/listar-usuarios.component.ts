import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-listar-usuarios',
  templateUrl: './listar-usuarios.component.html',
  styleUrls: ['./listar-usuarios.component.css']
})
export class ListarUsuariosComponent implements OnInit {
  listUsuarios: Usuario[] = [];

  constructor(private _usuarioService: UsuarioService,
              private toastr: ToastrService) {}

  ngOnInit(): void {
    this.obtenerUsuarios();
  }

  obtenerUsuarios() {
    this._usuarioService.getUsuarios().subscribe(data =>{
      console.log(data);
      this.listUsuarios = data;
    }, error => {
      console.log(error);
    })
  }

  eliminarUsuario(id: any) {
    this._usuarioService.eliminarUsuario(id).subscribe(data => {
      this.toastr.error('Usuario eliminado con exito', 'Usuario Eliminado');
      this.obtenerUsuarios();
    }, error => {
      console.log(error);
    })
  }
}
