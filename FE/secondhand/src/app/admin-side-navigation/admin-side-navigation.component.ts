import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-side-navigation',
  templateUrl: './admin-side-navigation.component.html',
  styleUrls: ['./admin-side-navigation.component.scss']
})
export class AdminSideNavigationComponent {
  isCollapsed = false;
  showSubmenu: { [key: string]: boolean } = {
    dashboard: false,
    advertisement: false,
    chat: false,
    userComplaints: false,
    systemAnalysis: false,
    profilesetting: false
  };
  hoverMenu: { [key: string]: boolean } = {
    dashboard: false,
    advertisement: false,
    chat: false,
    userComplaints: false,
    systemAnalysis: false,
    profilesetting: false
  };

  toggleCollapse(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  toggleSubmenu(section: string): void {
    this.showSubmenu[section] = !this.showSubmenu[section];
  }

  showHoverMenu(section: string): void {
    this.hoverMenu[section] = true;
  }

  hideHoverMenu(section: string): void {
    this.hoverMenu[section] = false;
  }
}
