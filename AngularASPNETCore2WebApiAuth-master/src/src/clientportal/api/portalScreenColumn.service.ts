/**
 * Trabble Client Portal API
 * No description provided (generated by Swagger Codegen https://github.com/swagger-api/swagger-codegen)
 *
 * OpenAPI spec version: v1
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
/* tslint:disable:no-unused-variable member-ordering */

import { Inject, Injectable, Optional }                      from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams }               from '@angular/common/http';

import { Observable }                                        from 'rxjs/Observable';
import '../rxjs-operators';

import { PortalScreenColumn } from '../model/portalScreenColumn';

import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';
import { CustomHttpUrlEncodingCodec }                        from '../encoder';


@Injectable()
export class PortalScreenColumnService {

    protected basePath = 'https://localhost';
    public defaultHeaders = new HttpHeaders();
    public configuration = new Configuration();

    constructor(protected httpClient: HttpClient, @Optional()@Inject(BASE_PATH) basePath: string, @Optional() configuration: Configuration) {
        if (basePath) {
            this.basePath = basePath;
        }
        if (configuration) {
            this.configuration = configuration;
            this.basePath = basePath || configuration.basePath || this.basePath;
        }
    }

    /**
     * @param consumes string[] mime-types
     * @return true: consumes contains 'multipart/form-data', false: otherwise
     */
    private canConsumeForm(consumes: string[]): boolean {
        const form = 'multipart/form-data';
        for (let consume of consumes) {
            if (form === consume) {
                return true;
            }
        }
        return false;
    }



    /**
     * 
     * 
     * @param itemId 
     */
    public apiPortalScreenColumnByItemIdDelete(itemId: string): Observable<{}> {
        if (itemId === null || itemId === undefined) {
            throw new Error('Required parameter itemId was null or undefined when calling apiPortalScreenColumnByItemIdDelete.');
        }

        let headers = this.defaultHeaders;

        return this.httpClient.delete<any>(`${this.basePath}/api/PortalScreenColumn/${encodeURIComponent(String(itemId))}`, 
        {
            headers: headers,
            withCredentials: this.configuration.withCredentials,
        });
    }

    /**
     * 
     * 
     * @param itemId 
     */
    public apiPortalScreenColumnByItemIdGet(itemId: string): Observable<{}> {
        if (itemId === null || itemId === undefined) {
            throw new Error('Required parameter itemId was null or undefined when calling apiPortalScreenColumnByItemIdGet.');
        }

        let headers = this.defaultHeaders;

        return this.httpClient.get<any>(`${this.basePath}/api/PortalScreenColumn/${encodeURIComponent(String(itemId))}`, 
        {
            headers: headers,
            withCredentials: this.configuration.withCredentials,
        });
    }

    /**
     * 
     * 
     */
    public apiPortalScreenColumnGet(): Observable<{}> {

        let headers = this.defaultHeaders;

        return this.httpClient.get<any>(`${this.basePath}/api/PortalScreenColumn`, 
        {
            headers: headers,
            withCredentials: this.configuration.withCredentials,
        });
    }

    /**
     * 
     * 
     * @param item 
     */
    public apiPortalScreenColumnPatch(item?: PortalScreenColumn): Observable<{}> {

        let headers = this.defaultHeaders;

        return this.httpClient.patch<any>(`${this.basePath}/api/PortalScreenColumn`, item, 
        {
            headers: headers,
            withCredentials: this.configuration.withCredentials,
        });
    }

    /**
     * 
     * 
     * @param item 
     */
    public apiPortalScreenColumnPost(item?: PortalScreenColumn): Observable<{}> {

        let headers = this.defaultHeaders;

        return this.httpClient.post<any>(`${this.basePath}/api/PortalScreenColumn`, item, 
        {
            headers: headers,
            withCredentials: this.configuration.withCredentials,
        });
    }

}
