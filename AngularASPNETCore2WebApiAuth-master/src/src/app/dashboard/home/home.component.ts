import { Component, OnInit, NgZone } from '@angular/core';
import { DashboardService } from '../services/dashboard.service';
import { PortalScreen } from '../../../clientportal/model/portalScreen';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { RequestOptions } from '@angular/http';
import {MatInput, MatIcon} from '@angular/material'
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { FormComponent } from '../form/form.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  edit_input_model = []
  add_input_model = {}
  portal_screen: PortalScreen;
  portal_screen_items:any;
  binded_items_list = [];
  table_data_items = [];
  loading = false;
  defaultHeaders = new HttpHeaders();
  constructor(
    private dashboardService: DashboardService,
    private ngZone: NgZone,
    private http: HttpClient,
    public dialog: MatDialog ) { }

  ngOnInit() { 
    this.dashboardService.portal_screen_obs$.subscribe(portal_screen => {
      this.loading = true
      this.binded_items_list = []
      this.table_data_items = []
      this.ngZone.run(()=>{
        this.sortByAttr(portal_screen['columns'],'order')
        this.portal_screen = portal_screen;
        this.http.get(this.portal_screen.loadContentUrl)
        .subscribe(
          res => {
            this.portal_screen_items = res;
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
            for (var items in this.binded_items_list) {
              let items_returned = this.generateArray(this.binded_items_list[items])
              this.table_data_items.push(items_returned)
              let array_items = []
              for(var key in items_returned) {
                let property_name_key = 'bindingPropertyName'
                let property_name_value = 'item_value'
                let p_k = items_returned[key][property_name_key]
                let p_v = items_returned[key][property_name_value]
                let dict_item = {[p_k]:p_v}
                array_items.push(dict_item)
              }
              this.edit_input_model.push(array_items)
            }
            this.loading = false;
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
  add(form:any) {
    if(form) {
      this.add_input_model = form
    }
    this.http.post(this.portal_screen.loadContentUrl,JSON.stringify(this.add_input_model),{ headers: this.defaultHeaders.append('Content-Type', 'application/json')})
    .subscribe(
      res => {
        console.log(res)
      })
  }

  edit(index) {
    let edit_portal_screen_item = this.portal_screen_items[index]
    let edit_fields = this.edit_input_model[index]
    for (var itr in edit_fields) {
      let key_in_object = Object.keys(edit_fields[itr])
      edit_portal_screen_item[key_in_object[0]] = edit_fields[itr][key_in_object[0]]
    }
    this.http.patch(this.portal_screen.loadContentUrl,JSON.stringify(edit_portal_screen_item),{ headers: this.defaultHeaders.append('Content-Type', 'application/json')})
    .subscribe(
      res => {
        console.log(res)
      })
  }

  delete(index) {
    let delete_portal_screen_item = this.portal_screen_items[index]
    let id_item = delete_portal_screen_item['id']
    let url = `${this.portal_screen.loadContentUrl}/${id_item}`;
  this.http.delete(url,{ headers: this.defaultHeaders.append('Content-Type', 'application/json')})
  .subscribe(res => {console.log(res)})
  }
  openDialog(): void {
    let dialogRef = this.dialog.open(FormComponent, {
      width: '450px',
      data: { fields: this.portal_screen }
    });
    const sub = dialogRef.componentInstance.add.subscribe((formData) => {
      this.add(formData)
    })

    dialogRef.afterClosed().subscribe(result => {
      sub.unsubscribe();
    });
  }
  

}
