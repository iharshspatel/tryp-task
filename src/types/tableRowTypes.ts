export interface tableRow {
    timestamp:number,
    purchase_id:number,
    name:string,
    mail:string,
    source:string,
    status: 'paid' | 'waiting' | 'failed' | 'success',
    select:boolean,
    [key: string]: any; 
}

export interface sortedHeaderType {
    [key: string]: any;
}
  