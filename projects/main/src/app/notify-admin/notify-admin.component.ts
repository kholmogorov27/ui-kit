import { Component } from '@angular/core';
import { faBell } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-notify-admin',
  templateUrl: './notify-admin.component.html',
  styleUrls: ['./notify-admin.component.scss'],
})
export class NotifyAdminComponent {
  icon = faBell;
}
