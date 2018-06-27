export interface DataTableAction<T> {
    readonly title: string;
    readonly handler: (entry: T) => void;
    readonly icon?: string;
}
