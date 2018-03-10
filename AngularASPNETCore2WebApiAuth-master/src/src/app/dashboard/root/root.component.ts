import { Component, OnInit } from '@angular/core';
import { SidebarItemService } from '../../../clientportal/api/sidebarItem.service';
import { SidebarItem } from '../../../clientportal/model/sidebarItem';
import { PortalScreenService } from '../../../clientportal/api/portalScreen.service';
import { PortalScreen } from '../../../clientportal/model/portalScreen';
import { DashboardService } from '../services/dashboard.service';
 

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
    private dashboardService: DashboardService) { }

  ngOnInit() {
    console.log("Calling api \n")
    this.portalScreenService
    .apiPortalScreenGet()
    .subscribe((data: PortalScreen[])=>{
      this.side_bar_items = data;
      console.log(this.side_bar_items)
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
