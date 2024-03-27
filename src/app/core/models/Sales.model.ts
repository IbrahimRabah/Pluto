export interface SalesHistoryResponse {
    statusCode: number;
    status: string;
    message: string;
    isSuccess: boolean;
    data: {
        page: number;
        size: number;
        count: number;
        items: SalesItem[];
    };
}

export interface SalesItem {
    id: string;
    salesId: string;
    salesMan: string;
    date: string;
    canvas: number;
    secondCall: number;
    sell: number;
    follow: number;
    register: number;
    deposit: number;
}
