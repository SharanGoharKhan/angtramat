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

import { CommonResWithDataModelListNoteResModel } from '../model/commonResWithDataModelListNoteResModel';
import { CommonResWithDataModelNoteResModel } from '../model/commonResWithDataModelNoteResModel';
import { CommonWithoutDataResModel } from '../model/commonWithoutDataResModel';
import { NoteAddModel } from '../model/noteAddModel';

import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';
import { CustomHttpUrlEncodingCodec }                        from '../encoder';


@Injectable()
export class NotesService {

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
     * @param model 
     */
    public notesAdd(model?: NoteAddModel): Observable<CommonWithoutDataResModel> {

        let headers = this.defaultHeaders;

        return this.httpClient.post<any>(`${this.basePath}/api/notes`, model, 
        {
            headers: headers,
            withCredentials: this.configuration.withCredentials,
        });
    }

    /**
     * 
     * 
     * @param id 
     */
    public notesDelete(id: string): Observable<CommonWithoutDataResModel> {
        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling notesDelete.');
        }

        let headers = this.defaultHeaders;

        return this.httpClient.delete<any>(`${this.basePath}/api/notes/${encodeURIComponent(String(id))}`, 
        {
            headers: headers,
            withCredentials: this.configuration.withCredentials,
        });
    }

    /**
     * 
     * 
     * @param id 
     */
    public notesDetail(id: string): Observable<CommonResWithDataModelNoteResModel> {
        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling notesDetail.');
        }

        let headers = this.defaultHeaders;

        return this.httpClient.get<any>(`${this.basePath}/api/notes/${encodeURIComponent(String(id))}`, 
        {
            headers: headers,
            withCredentials: this.configuration.withCredentials,
        });
    }

    /**
     * 
     * 
     * @param id 
     * @param model 
     */
    public notesEdit(id: string, model?: NoteAddModel): Observable<CommonWithoutDataResModel> {
        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling notesEdit.');
        }

        let headers = this.defaultHeaders;

        return this.httpClient.put<any>(`${this.basePath}/api/notes/${encodeURIComponent(String(id))}`, model, 
        {
            headers: headers,
            withCredentials: this.configuration.withCredentials,
        });
    }

    /**
     * 
     * 
     */
    public notesListNote(): Observable<CommonResWithDataModelListNoteResModel> {

        let headers = this.defaultHeaders;

        return this.httpClient.get<any>(`${this.basePath}/api/notes`, 
        {
            headers: headers,
            withCredentials: this.configuration.withCredentials,
        });
    }

}
