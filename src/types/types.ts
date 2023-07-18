export interface TableRow {
    timestamp:number,
    purchase_id:number,
    name:string,
    mail:string,
    source:string,
    status: 'paid' | 'waiting' | 'failed' | 'success',
    select:boolean,
    [key: string]: any; 
}

export interface SortedHeaderType {
    [key: string]: any;
}

export type TableCellProps = {
    column: string;
    value: string | number;
};

export type TableDataProps = {
    header: string[];
    caption?: string;
    rows: TableRow[];
    sortable?: boolean;
    pagination?: boolean;
  };
  
  