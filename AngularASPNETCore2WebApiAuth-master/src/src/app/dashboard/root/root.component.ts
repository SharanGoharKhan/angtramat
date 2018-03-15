import { Component, OnInit } from '@angular/core';
import { SidebarItemService } from '../../../clientportal/api/sidebarItem.service';
import { SidebarItem } from '../../../clientportal/model/sidebarItem';
import { PortalScreenService } from '../../../clientportal/api/portalScreen.service';
import { PortalScreen } from '../../../clientportal/model/portalScreen';
import { DashboardService } from '../services/dashboard.service';
import {MatIconRegistry} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss'],
 
})
export class RootComponent implements OnInit {

  private side_bar_items:SidebarItem[] = [];

  constructor(
    private sidebarItemService: SidebarItemService,
    private portalScreenService: PortalScreenService,
    private dashboardService: DashboardService,
    public iconRegistry: MatIconRegistry, public sanitizer: DomSanitizer) { }

  ngOnInit() {
    console.log("Calling api \n")
    this.portalScreenService
    .apiPortalScreenGet()
    .subscribe((data: PortalScreen[])=>{
      this.side_bar_items = data;
      console.log(this.side_bar_items)
      for (let index = 0; index < this.side_bar_items.length; index++) {
        // console.log(this.side_bar_items[index].iconUrl.search('.svg'))
        if (this.side_bar_items[index].iconUrl && this.side_bar_items[index].iconUrl.indexOf('.svg') > -1) {
          this.iconRegistry.addSvgIcon(
            this.side_bar_items[index].title, this.sanitizer.bypassSecurityTrustResourceUrl(this.side_bar_items[index].iconUrl));  
        } else {
          console.log('hello')
        }
      }
    },(error)=>{
      console.log(error)
    })
  }
  sideBarItemClick(sidebarItem: PortalScreen) {
    console.log("clicked")
    console.log(sidebarItem);
    this.dashboardService.setPortalScreen(sidebarItem)
  }

}
