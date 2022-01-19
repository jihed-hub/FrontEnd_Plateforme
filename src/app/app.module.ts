import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutComponent } from './layout/layout.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { ContactsComponent } from './components/contacts/contacts.component';
import { authInterceptorProviders } from './_helpers/auth-interceptor.service';
import { JwtModule, JwtModuleOptions, JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';
import { RegistredialogComponent } from './components/registredialog/registredialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatNativeDateModule} from '@angular/material/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MultiSelectModule} from 'primeng/multiselect';

import {PanelMenuModule} from 'primeng/panelmenu';
import {MenubarModule} from 'primeng/menubar';
import {DialogModule} from 'primeng/dialog';
import {ButtonModule} from 'primeng/button';
import {DropdownModule} from 'primeng/dropdown';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {TooltipModule} from 'primeng/tooltip';
import {CheckboxModule} from 'primeng/checkbox';
import {ToastModule} from 'primeng/toast';
import {FileUploadModule} from 'primeng/fileupload';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {MatIconModule } from '@angular/material/icon';
import { MDBBootstrapModule ,WavesModule, ButtonsModule, IconsModule} from 'angular-bootstrap-md';
import { InterfaceClientComponent } from './components/interface-client/interface-client.component';
import { HomeClientComponent } from './components/interface-client/home-client/home-client.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { DashboardAdminComponent } from './dashboard-admin/dashboard-admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TableListComponent } from './table-list/table-list.component';
import { TypographyComponent } from './typography/typography.component';
import { IconsComponent } from './icons/icons.component';
import { MapsComponent } from './maps/maps.component';
import { NotificationComponent } from './notification/notification.component';
import { UpgradeComponent } from './upgrade/upgrade.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { FooterAdminComponent } from './layouts/admin-layout/footer-admin/footer-admin.component';
import { HeaderAdminComponent } from './layouts/admin-layout/header-admin/header-admin.component';
import { SidebarAdminComponent } from './layouts/admin-layout/sidebar-admin/sidebar-admin.component';
import { NavbarAdminComponent } from './layouts/admin-layout/navbar-admin/navbar-admin.component';
import { UploadfilesComponent } from './uploadfiles/uploadfiles.component';
import {MatTableModule} from '@angular/material/table';
import { CompleterprofilComponent } from './components/interface-client/completerprofil/completerprofil.component';
import { NgSelectModule } from '@ng-select/ng-select';
import {MatStepperModule} from '@angular/material/stepper';
import {TableModule} from 'primeng/table';
import { EspaceClientComponent } from './components/interface-client/espace-client/espace-client.component';
import { ProfileComponent } from './components/interface-client/espace-client/profile/profile.component';
import { NavigationComponent } from './components/interface-client/espace-client/navigation/navigation.component';
import { ClientsadminComponent } from './clientsadmin/clientsadmin.component';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import { GameComponent } from './components/interface-client/home-client/game/game.component';
import { StoreComponent } from './components/interface-client/store/store.component';
import { StoreAdminComponent } from './store-admin/store-admin.component';
import { BookComponent } from './components/interface-client/store/book/book.component';
import { GameboardComponent } from './components/interface-client/gameboard/gameboard.component';
import { FilesComponent } from './components/interface-client/files/files.component';
import { OrderItemComponent } from './store-admin/order-item/order-item.component';
import { SuccessComponent } from './components/interface-client/success/success.component';
import { CheckoutComponent } from './components/interface-client/checkout/checkout.component';
import { CancelComponent } from './components/interface-client/cancel/cancel.component';




@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    AboutComponent,
    ContactsComponent,
    RegistredialogComponent,
    InterfaceClientComponent,
    HomeClientComponent,
    UserProfileComponent,
    DashboardAdminComponent,
    DashboardComponent,
    TableListComponent,
    TypographyComponent,
    IconsComponent,
    MapsComponent,
    NotificationComponent,
    UpgradeComponent,
    AdminLayoutComponent,
    FooterAdminComponent,
    HeaderAdminComponent,
    SidebarAdminComponent,
    NavbarAdminComponent,
    UploadfilesComponent,
    CompleterprofilComponent,
    EspaceClientComponent,
    ProfileComponent,
    NavigationComponent,
    ClientsadminComponent,
    GameComponent,
    StoreComponent,
    StoreAdminComponent,
    BookComponent,
    GameboardComponent,
    FilesComponent,
    OrderItemComponent,
    SuccessComponent,
    CheckoutComponent,
    CancelComponent
    
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatInputModule,
    MatNativeDateModule,
    MatToolbarModule,
    MatCardModule,
    MatAutocompleteModule,
    MatTabsModule,
    MatTooltipModule,
    MultiSelectModule,
    PanelMenuModule,
    MenubarModule,
    DialogModule,
    ButtonModule,
    DropdownModule,
    AutoCompleteModule,
    ProgressSpinnerModule,
    TooltipModule,
    CheckboxModule,
    ToastModule,
    FileUploadModule,
    MessagesModule,
    MessageModule,
    MatIconModule,
    MDBBootstrapModule.forRoot(),
    WavesModule,
    ButtonsModule,
    IconsModule,
    MatTableModule,
    NgSelectModule,
    MatStepperModule,
    TableModule,
    ConfirmDialogModule
  ],
  providers: [authInterceptorProviders, { provide: JWT_OPTIONS, useValue: JWT_OPTIONS }, JwtHelperService],
  bootstrap: [AppComponent]
})
export class AppModule { }
