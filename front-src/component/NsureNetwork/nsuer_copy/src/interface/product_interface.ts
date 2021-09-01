

export interface ProductInformationInterface extends RadarModel{
    imgName:string,
    name:string,
    address:string,
    team?:string,
    exposure?:string,
    risLevel:number,

    amount:string,
    audit?:string,
    code_quality?:string,
    developer?:string,
    logo:{filename:string},
    onDismiss?:() => void;
    website:string,
    uid:number,
    minDuration:number,
    maxDuration:number,
    coverAvailableAmount?:string,
}




export interface RadarModel{
    no1:number,
    no2:number,
    no3:number,
    no4:number,
    no5:number,
}
