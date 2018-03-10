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
import { PortalScreenColumn } from './portalScreenColumn';


export class PortalScreen {
    title?: string;
    iconUrl?: string;
    hasSidebar?: boolean;
    sidebarContentUrl?: string;
    loadingMessage?: string;
    loadContentUrl?: string;
    hasSearch?: boolean;
    columns?: Array<PortalScreenColumn>;
    upsertType?: string;
    actions?: string;
    createdAt?: Date;
    updatedAt?: Date;
    deleted?: boolean;
    id?: string;
}