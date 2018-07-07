export interface TransformableTextNodeClass<T> {
    new (data: { text: string }) : T;
}
