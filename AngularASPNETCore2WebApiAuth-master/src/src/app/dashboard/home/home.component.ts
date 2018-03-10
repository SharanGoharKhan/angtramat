import { Component, OnInit, NgZone } from '@angular/core';

import { HomeDetails } from '../models/home.details.interface';
import { DashboardService } from '../services/dashboard.service';
import { PortalScreen } from '../../../clientportal/model/portalScreen';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { RequestOptions } from '@angular/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  panelOpenState: boolean = false;
  portal_screen: PortalScreen;
  portal_screen_items:any;
  homeDetails: HomeDetails;
  binded_items_list = [];
  defaultHeaders = new HttpHeaders();
  constructor(
    private dashboardService: DashboardService,
    private ngZone: NgZone,
    private http: HttpClient ) { }

  ngOnInit() {
    // content list will populate it by getting get on this. https://trabblebackendclientportalapi.azurewebsites.net/api/PortalScreen 
    this.dashboardService.portal_screen_obs$.subscribe(portal_screen => {
      this.ngZone.run(()=>{
        console.log("Portal Screen from home")
        console.log(portal_screen)
        this.portal_screen = portal_screen;
        this.http.get(this.portal_screen.loadContentUrl)
        .subscribe(
          res => {
            this.portal_screen_items = res;
            console.log(res)
            for(var key in this.portal_screen_items) {
              let single_item = this.portal_screen_items[key];
              var json_data_temp = {}
              for(var item_key in single_item) {
                let item_exists: boolean = false;
                for(var column_item_key in portal_screen.columns)
                {
                    if(portal_screen.columns[column_item_key].bindingPropertyName == item_key) {
                      item_exists = true;
                      break;
                    }  
                }
                if (item_exists == true) {
                  json_data_temp[item_key] = single_item[item_key]
                }
              }
              this.binded_items_list.push(json_data_temp)
            }
            console.log(this.binded_items_list)
          })
      })
    })
  }
  generateArray(obj){
    let keys_of_object = Object.keys(obj)
    let list_of_items = []
    let individual_items = {}
    for(var item in keys_of_object) {
      for(var column_item_key in this.portal_screen.columns) {
        if(keys_of_object[item] == this.portal_screen.columns[column_item_key].bindingPropertyName) {
            individual_items = {bindingPropertyName:this.portal_screen.columns[column_item_key].bindingPropertyName,item_value: obj[keys_of_object[item]], canEdit: this.portal_screen.columns[column_item_key].canEdit,expandedViewOnly:this.portal_screen.columns[column_item_key].expandedViewOnly,type:this.portal_screen.columns[column_item_key].type,order:this.portal_screen.columns[column_item_key].order}
            list_of_items.push(individual_items)
            break
        }
      }
    } 
    return (this.sortByAttr(list_of_items,'order')) 
 }
 sortByAttr(array,key) {
  return array.sort(function(a,b) {
    var x = a[key]; 
    var y = b[key];
    return ((x < y) ? -1 : ((x > y) ? 1 : 0));
  })
 }
  add(form:NgForm) {
    //form it into dynamic object
    //send the object
    //post on the same url https://trabblebackendclientportalapi.azurewebsites.net/api/PortalScreen
    this.http.post(this.portal_screen.loadContentUrl,JSON.stringify(form.value),{ headers: this.defaultHeaders.append('Content-Type', 'application/json')})
    .subscribe(
      res => {
        console.log(res)
      })
  }
  //edit function
  //
  // edit(form:NgForm) {
  //   console.log(form.value)
  //   //form it into dynamic object
  //   //send the object
  //   //patch on the same url https://trabblebackendclientportalapi.azurewebsites.net/api/PortalScreen
  // }
  //delete
  // delete(form:NgForm) {
    //delete will take a single id as a single string
  //   console.log(form.value)
  //   //form it into dynamic object
  //   //send the object
  //   //delete on the same url https://trabblebackendclientportalapi.azurewebsites.net/api/PortalScreen/{itemId}
  // }

}
