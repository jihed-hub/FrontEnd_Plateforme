import { Routes } from '@angular/router';
import { DashboardComponent } from 'src/app/dashboard/dashboard.component';
import { UserProfileComponent } from 'src/app/user-profile/user-profile.component';
import { TableListComponent } from 'src/app/table-list/table-list.component';
import { TypographyComponent } from 'src/app/typography/typography.component';
import { IconsComponent } from 'src/app/icons/icons.component';
import { MapsComponent } from 'src/app/maps/maps.component';
import { UpgradeComponent } from 'src/app/upgrade/upgrade.component';
import { NotificationComponent } from 'src/app/notification/notification.component';
import { UploadfilesComponent } from 'src/app/uploadfiles/uploadfiles.component';
import { ClientsadminComponent } from 'src/app/clientsadmin/clientsadmin.component';
import { StoreAdminComponent } from 'src/app/store-admin/store-admin.component';



export const AdminLayoutRoutes: Routes = [
   
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'demandes_inscriptions',     component: TableListComponent },
    { path: 'uploadfiles',     component: UploadfilesComponent },
    { path: 'clients',     component: ClientsadminComponent },
    { path: 'store',    component:StoreAdminComponent},
    { path: 'typography',     component: TypographyComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'notifications',  component: NotificationComponent },
    { path: 'upgrade',        component: UpgradeComponent },
];
