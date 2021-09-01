import {Dispatch, SetStateAction} from "react";



// tab切换Provider model
export interface CoversInterface {
    alias: AliasEnum,
    setAlias: Dispatch<SetStateAction<AliasEnum>>
}

// tab切换类型
export enum AliasEnum {
    Active,
    Inactive,
    Claims,
    Rewards,
    Invitation
}


// tab model
export interface TabCellModel {
    name: string,
    alias: AliasEnum |null
}



// buy cell model
export interface ListCellMode{
    avatar:string,
    nick:string,
    id:number,
    amount:number,
    premium:number,
    startDate:Date,
    endDate:Date,
    action:boolean,
    grade:GradeEnum,
    name?:string,
}


export enum GradeEnum {
    Level1,
    Level2,
    Level3,
    Level4,
    Level5,


}


// nsure staking model
export interface  NsuerStakingModel{
    title:string,
    titleContent:number,
    titleUnit:string,
    subTitle:string,
    subContent:number|string,
    subUnit:string,
    decimals:number
}


export interface ClaimsCellInterface {
    claim_id: number;
    user_id: string;
    product: string;
    cover_id: string;
    cover_hash: string;
    currency: string;
    amount: string;
    submit_at: Date;
    arbiter_at: Date;
    begin_at: Date;
    end_at: Date;
    status: string;
    notes: string;
}
