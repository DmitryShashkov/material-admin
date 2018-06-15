export interface ServerError {
    readonly error: string;
    readonly message: string;
    readonly statusCode: number;
}
