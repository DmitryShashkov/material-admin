import { BaseModel } from 'ts-json-mapper';

export class Storage<T extends BaseModel> {
    private static readonly APP_PREFIX = 'app';

    private readonly key: string;

    constructor (storageKey: string) {
        this.key = `${Storage.APP_PREFIX}:${storageKey}`;
    }

    public save (data: BaseModel) : void {
        if (!data) {
            return localStorage.removeItem(this.key);
        }

        localStorage.setItem(this.key, JSON.stringify(data.toJSON()));
    }

    public restoreAs (type: { new(options: any): T ; }) : T {
        const data: string = localStorage.getItem(this.key);

        if (!data) { return null; }

        return new type(JSON.parse(data));
    }
}
