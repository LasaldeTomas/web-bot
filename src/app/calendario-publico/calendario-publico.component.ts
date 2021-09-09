import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EventoService } from 'src/app/services/evento.service';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario-publico.component.html',
  styleUrls: ['./calendario-publico.component.css']
})
export class CalendarioPublicoComponent implements OnInit {
  eventos: any[] = [];

  editarEvento: FormGroup;

  eventoElegidoEditar: any = "";
  
  constructor(private _eventoService: EventoService, private fb: FormBuilder, private router: Router) {
    this.editarEvento = this.fb.group({
      nombre: ['', Validators.required],
      fecha: ['', Validators.required],
      descripcion: ['', Validators.required]
    });
  }
  

  ngOnInit(): void {
    this.getEventos();
  }

  getEventos(){
    this._eventoService.getEventos().subscribe(data => {
      this.eventos = [];
      data.forEach((element:any, index:any) => {
        if(element.data()["publico"] == false){
          console.log(index);
          //this.eventos.splice(index,1)
        };
        let urlImagen = element.payload.doc.data().imgUrl ?? 'https://discordapp.com/assets/322c936a8c8be1b803cd94861bdfa868.png';
        let fecha: Date = new Date(element.payload.doc.data().fecha);
        let date: string = fecha.getDate() < 10 ? '0' + fecha.getDate() : fecha.getDate().toString();
        let mes: string = fecha.getMonth() < 10 ? '0' + fecha.getMonth() : fecha.getMonth().toString();
        let hora: string = fecha.getHours() < 10 ? '0' + fecha.getHours() : fecha.getHours().toString();
        let minutos: string = fecha.getMinutes() < 10 ? '0' + fecha.getMinutes() : fecha.getMinutes().toString();
        let segundos: string = fecha.getSeconds() < 10 ? '0' + fecha.getSeconds() : fecha.getSeconds().toString();
        let fechaArreglada: string = fecha.getFullYear() + '-' + mes + '-' + date + ' ' + hora + ':' + minutos + ':' + segundos;
        this.eventos.push({
          id: element.payload.doc.id,
          url: urlImagen,
          fechaArreglada,
          ...element.payload.doc.data()
        })
      });
    });
  }

  mostrarEditar = (opcion: string, eventoId: any) => {
    const editarContainer: any = document.getElementById(opcion);
    editarContainer.style.display = 'flex';
    this.eventoElegidoEditar = eventoId;
  }

  modificarEvento = (opcion: string) => {
    let obj = {};
    
    if (opcion == 'nombre') {
      obj = {
        nombre: this.editarEvento.value.nombre
      };
    }
    else if (opcion == 'fecha') {
      const fechaEvento: string= new Date(this.editarEvento.value.fecha).toString();
      obj = {
        fecha: fechaEvento
      };
    }
    else {
      obj = {
        descripcion: this.editarEvento.value.descripcion
      };
    }

    this._eventoService.actualizarEvento(this.eventoElegidoEditar, obj)
      .then(() => {
        console.log("Evento editado");
        alert("Evento editado");
        this.router.navigate(['/principal'])
      })
      .catch(error => {
        console.log(error);
      })
  }

  eliminarEvento = (eventoId: any) => {
    this._eventoService.eliminarEvento(eventoId)
      .then(() => {
        console.log("Evento eliminado");
        alert("Evento eliminado");
      })
      .catch(error => {
        console.log(error);
      })
  }

  buscar(){
    
  }

}


