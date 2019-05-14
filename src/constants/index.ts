export const USER_ACTION = 'USER_ACTION';
export type USER_ACTION = typeof USER_ACTION;

export const BINDINDPHONE_ACTION = 'BINDINDPHONE_ACTION';
export type BINDINDPHONE_ACTION = typeof BINDINDPHONE_ACTION;

export const FINDEMPLOEEBYID_ACTION = 'FINDEMPLOEEBYID_ACTION';
export type FINDEMPLOEEBYID_ACTION = typeof FINDEMPLOEEBYID_ACTION;

export const FINDORGANIZATIONBYIDORNO_ACTION = 'FINDORGANIZATIONBYIDORNO_ACTION';
export type FINDORGANIZATIONBYIDORNO_ACTION = typeof FINDORGANIZATIONBYIDORNO_ACTION;

export enum RoleType {
    Clerk = 1,
    Member = 2,
    Shopowner = 4
}

export enum StoreStatuType {
    Normol = 0
}

export enum ClerkStatuType {
    NonActive =0,
    Normol = 1,
    Frozen = 2,
    Deny = 3
}