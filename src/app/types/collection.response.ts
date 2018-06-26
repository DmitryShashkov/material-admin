export interface CollectionResponse<T> {
    readonly items: T[];
    readonly total: number;
}
