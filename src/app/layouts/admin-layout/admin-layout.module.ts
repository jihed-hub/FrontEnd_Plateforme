import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatRippleModule} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSelectModule} from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule} from '@angular/material/checkbox';
import {DropdownModule} from 'primeng/dropdown';
import {TableModule} from 'primeng/table';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ToastModule} from 'primeng/toast';
import {MultiSelectModule} from 'primeng/multiselect';
import {MatIconModule } from '@angular/material/icon';
import { DashboardComponent } from 'src/app/dashboard/dashboard.component';
import { UserProfileComponent } from 'src/app/user-profile/user-profile.component';
import { TableListComponent } from 'src/app/table-list/table-list.component';
import { TypographyComponent } from 'src/app/typography/typography.component';
import { IconsComponent } from 'src/app/icons/icons.component';
import { MapsComponent } from 'src/app/maps/maps.component';
import { UpgradeComponent } from 'src/app/upgrade/upgrade.component';
import { FooterAdminComponent } from './footer-admin/footer-admin.component';
import { HeaderAdminComponent } from './header-admin/header-admin.component';
import { NavbarAdminComponent } from './navbar-admin/navbar-admin.component';
import { SidebarAdminComponent } from './sidebar-admin/sidebar-admin.component';
import { NotificationComponent } from 'src/app/notification/notification.component';
import { AdminLayoutRoutes } from './admin-layout.routing';



@NgModule({
  imports: [
    MultiSelectModule,
    MatIconModule,
    DropdownModule,
    ConfirmDialogModule,
    MatCheckboxModule,
    MatRadioModule,
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    TableModule,
    ToastModule
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    TableListComponent,
    TypographyComponent,
    IconsComponent,
    MapsComponent,
    NotificationComponent,
    UpgradeComponent,
    FooterAdminComponent,
    HeaderAdminComponent,
    NavbarAdminComponent,
    SidebarAdminComponent ,
  ]
})

export class AdminLayoutModule {}
