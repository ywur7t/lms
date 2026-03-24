export type BaseGroup = {
    min_result: number;
    max_result: number;
    avg_result: number;
    
}[];

export type Group<T> = (BaseGroup & T)[];