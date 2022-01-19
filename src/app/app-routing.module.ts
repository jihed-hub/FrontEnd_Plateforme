import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { HomeComponent } from './components/home/home.component';
import { ContactsComponent } from './components/contacts/contacts.component';
import { AboutComponent } from './components/about/about.component';
import { InterfaceClientComponent } from './components/interface-client/interface-client.component';
import { HomeClientComponent } from './components/interface-client/home-client/home-client.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { DashboardAdminComponent } from './dashboard-admin/dashboard-admin.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { UploadfilesComponent } from './uploadfiles/uploadfiles.component';
import { CompleterprofilComponent } from './components/interface-client/completerprofil/completerprofil.component';
import { TableListComponent } from './table-list/table-list.component';
import { EspaceClientComponent } from './components/interface-client/espace-client/espace-client.component';
import { DashboardComponent } from './components/interface-client/espace-client/dashboard/dashboard.component';
import { ProfileComponent } from './components/interface-client/espace-client/profile/profile.component';
import { ClientsadminComponent } from './clientsadmin/clientsadmin.component';
import { GameComponent } from './components/interface-client/home-client/game/game.component';
import { StoreComponent } from './components/interface-client/store/store.component';
import { StoreAdminComponent } from './store-admin/store-admin.component';
import { GameboardComponent } from './components/interface-client/gameboard/gameboard.component';
import { FilesComponent } from './components/interface-client/files/files.component';
import { SuccessComponent } from './components/interface-client/success/success.component';
import { CancelComponent } from './components/interface-client/cancel/cancel.component';
import { CheckoutComponent } from './components/interface-client/checkout/checkout.component';


const routes: Routes = [
  { path: '', redirectTo: 'Plateforme-Educative/home', pathMatch: 'full' },
  { path: 'Plateforme-Educative', component: LayoutComponent , children : [
    {path: 'home', component: HomeComponent },
    {path: 'contacts', component: ContactsComponent},
    {path: 'aboutus', component: AboutComponent},
    {path: 'client', component: InterfaceClientComponent , children : [
      {path: 'completerprofil', component:CompleterprofilComponent},
      {path : 'gameboard' , component: GameboardComponent},
      {path : 'store' , component: StoreComponent },
      {path : 'success' , component: SuccessComponent },
      {path : 'checkout' , component: CheckoutComponent },
      {path : 'cancel' , component: CancelComponent },
      {path : 'files' , component: FilesComponent},
      {path: 'home', component: HomeClientComponent , children :[
        {path : 'games' , component: GameComponent}        
      ]},
      {path: 'espace-client', component:EspaceClientComponent,children: [
        {path: 'dashboard', component: DashboardComponent},
        {path: 'profil', component: ProfileComponent}
      ]}
  ]},]},

  { path:'dash', component : AdminLayoutComponent, children : [
    {path :'admiin', component : UserProfileComponent},
    {path :'dashboard', component : DashboardAdminComponent},
    {path :'uploadfiles', component : UploadfilesComponent},
    {path:'demandes_inscriptions',component:TableListComponent},
    {path:'clients',component:ClientsadminComponent},
    {path :'store', component:StoreAdminComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
