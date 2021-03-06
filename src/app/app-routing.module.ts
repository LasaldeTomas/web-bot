import { ProcesarPagoComponent } from './components/procesar-pago/procesar-pago.component';
import { PremiumComponent } from './components/premium/premium.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService as AuthGuard } from './auth/auth-guard.service';
import { CalendarioPublicoComponent } from './components/calendario-publico/calendario-publico.component';
import { CalendarioComponent } from './components/calendario/calendario.component';
import { ComandosComponent } from './components/comandos/comandos.component'
import { CrearEventoComponent } from './components/crear-evento/crear-evento.component';
import { LoginComponent } from './components/login/login.component';
import { MisEventosComponent } from './components/mis-eventos/mis-eventos.component';
import { PrincipalComponent } from './components/principal/principal.component';


const routes: Routes = [
  {path:'calendario', component:CalendarioComponent},
  {path:'calendarioPublico', component:CalendarioPublicoComponent},
  {path:'comandos', component:ComandosComponent},
  {path:'principal', component:PrincipalComponent},
  {path:'crear-evento', component:CrearEventoComponent},
  {path: 'login', component: LoginComponent},
  {path: 'mis-eventos', component: MisEventosComponent, canActivate: [AuthGuard]},
  {path: 'premium', component: PremiumComponent, canActivate: [AuthGuard]},
  {path: 'procesar-pago', component: ProcesarPagoComponent, canActivate: [AuthGuard]},
  {path:'', redirectTo: '/principal',pathMatch:'full'},
  {path: '**', redirectTo: '/principal', pathMatch: 'full'},
  
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
