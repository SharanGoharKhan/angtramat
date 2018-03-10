import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { Configuration } from './configuration';

import { AccountService } from './api/account.service';
import { DropDownOptionService } from './api/dropDownOption.service';
import { FilesService } from './api/files.service';
import { NotesService } from './api/notes.service';
import { PortalScreenService } from './api/portalScreen.service';
import { PortalScreenColumnService } from './api/portalScreenColumn.service';
import { ProfilesService } from './api/profiles.service';
import { SidebarItemService } from './api/sidebarItem.service';

@NgModule({
  imports:      [ CommonModule, HttpModule ],
  declarations: [],
  exports:      [],
  providers:    [ AccountService, DropDownOptionService, FilesService, NotesService, PortalScreenService, PortalScreenColumnService, ProfilesService, SidebarItemService ]
})
export class ApiModule {
    public static forConfig(configurationFactory: () => Configuration): ModuleWithProviders {
        return {
            ngModule: ApiModule,
            providers: [ {provide: Configuration, useFactory: configurationFactory}]
        }
    }
}
