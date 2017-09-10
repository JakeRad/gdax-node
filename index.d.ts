declare module "gdax" {
    export type callback<T> = (err, response, data: T) => void;
    
    export type ProductTicker =  {
        trade_id: number,
        price: number,
        size: number,
        bid: number,
        ask: number,
        volume: number,
        time: Date
    }

    type LimitOrder = {
        type: "limit";
        product_id: string;
        price: number;
        size: number;
        time_in_force?: "GTC" | "GTT" | "IOC" | "FOK";
        cancel_after?: string;
    };
    
    type MarketOrder = {
        type: "market";
        product_id: string;
        size: number;
    } | 
    {
        type: "market";
        product_id: string;
        funds: number;
    };

    type StopOrder = {
        type: "stop";
        product_id: string;
        size: number;
    } |
    {
        type: "stop";
        product_id: string;
        funds: number;
    };

    export type BuyOrderParams =  MarketOrder | LimitOrder;

    export type SellOrderParams = MarketOrder | StopOrder;

    export type OrderResult = {
        id: string;
        price: number;
        size: number;
        product_id: string;
        side: "buy" | "sell";
        stp: "dc" | "co" | "cn" | "cb";
        type: "limit" | "market" | "stop";
        time_in_force: "GTC" | "GTT" | "IOC" | "FOK";
        post_only: boolean;
        created_at: string;
        fill_fees: number;
        filled_size: number;
        executed_value: number;
        status: "received" | "open" | "done";
        settled: boolean;
    }

    export type PageArgs = {
        before?: number;
        after?: number;
        limit?: number;
    }

    export type Account = {
        id: string,
        profile_id: string,
        currency: "USD" | "BTC" | "LTC" | "ETH",
        balance: number,
        available: number,
        hold: number    
    };

    export class PublicClient {
        constructor(productId: string);

        getProducts(callback: callback<any>);
        getProducts(): Promise<any>;

        getProductOrderBook(callback: callback<any>);
        getProductOrderBook(): Promise<any>;

        getProductTicker(callback: callback<ProductTicker>);
        getProductTicker(): Promise<ProductTicker>;

        getProductTrades(callback: callback<any>);
        getProductTrades(): Promise<any>;

        getProductTradeStream(callback: callback<any>);
        getProductTradeStream(): Promise<any>;

        getProductHistoricRates(args: any, callback: callback<any[][]>);
        getProductHistoricRates(args: any): Promise<any[][]>;

        getProduct24HrStats(callback: callback<any>);
        getProduct24HrStats(): Promise<any>;

        getCurrencies(callback: callback<any>);
        getCurrencies(): Promise<any>;

        getTime(callback: callback<any>);
        getTime(): Promise<any>;
    }

    export class AuthenticatedClient {
        constructor(key: string, b64secret: string, passphrase: string, apiURI: string);
        // getCoinbaseAccounts(callback: callback<CoinbaseAccount[]>); Does Not Exist Bad Documentation? :
        
        getAccounts(callback: callback<Account[]>);
        getAccounts(): Promise<Account[]>;

        getAccount(accountID: string, callback: callback<Account>);
        getAccount(accountID: string): Promise<Account>;
        
        getAccountHistory(accountID: string, callback: callback<any>);
        getAccountHistory(accountID: string): Promise<any>;

        getAccountHistory(accountID: string, pageArgs: PageArgs, callback: callback<any>)
        getAccountHistory(accountID: string, pageArgs: PageArgs): Promise<any>;
        
        getAccountHolds(accountID: string, callback: callback<any>);
        getAccountHolds(accountID: string): Promise<any>;

        getAccountHolds(accountID: string, pageArgs: PageArgs, callback: callback<any>);
        getAccountHolds(accountID: string, pageArgs: PageArgs): Promise<any>;

        buy(params: BuyOrderParams, callback: callback<OrderResult>);
        buy(params: BuyOrderParams): Promise<OrderResult>;

        sell(params: SellOrderParams, callback: callback<OrderResult>);
        sell(params: SellOrderParams): Promise<OrderResult>;

        cancelOrder(orderID, callback: callback<any>);
        cancelOrder(orderID): Promise<any>;

        cancelAllOrders(args: {product_id:string}, callback: callback<any>);
        cancelAllOrders(args: {product_id:string}): Promise<any>;

        getOrders(callback: callback<any>);
        getOrders(): Promise<any>;

        getOrders(pageArgs: PageArgs, callback: callback<any>);
        getOrders(pageArgs: PageArgs): Promise<any>;

        getFills(callback: callback<any>);
        getFills(): Promise<any>;

        getFills(pageArgs: PageArgs, callback: callback<any>);
        getFills(pageArgs: PageArgs): Promise<any>;

        getFundings(params, callback: callback<any>);
        getFundings(params): Promise<any>;

        repay(params, callback: callback<any>);
        repay(params): Promise<any>;

        marginTransfer(params, callback: callback<any>);
        marginTransfer(params): Promise<any>;

        closePosition(params, callback: callback<any>);
        closePosition(params): Promise<any>;

        deposit(params, callback: callback<any>);
        deposit(params): Promise<any>;

        withdraw(params, callback: callback<any>);
        withdraw(params): Promise<any>;

        getTrailingVolume(callback: callback<any>);
        getTrailingVolume(): Promise<any>;
    }

    export class WebsocketClient {
        constructor(productIds: string[]);
        on(event: 'message', eventHandler: (data) => void);
        on(event: 'error', eventHandler: (err) => void);
        on(event: 'open', eventHandler: () => void);
        on(event: 'close', eventHandler: () => void);
    }
}