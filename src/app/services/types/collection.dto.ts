interface StringKeyed { [key: string]: any; }

export interface CollectionDto extends StringKeyed {
    readonly limit: number;
    readonly offset: number;
}
