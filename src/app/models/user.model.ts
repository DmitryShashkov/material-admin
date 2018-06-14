import { BaseModel, ModelProperty } from 'ts-json-mapper';

export class UserModel extends BaseModel {
    @ModelProperty()
    public id: number;

    @ModelProperty()
    public createdAt: Date;

    @ModelProperty()
    public updatedAt: Date;

    @ModelProperty()
    public email:string;

    @ModelProperty()
    public displayName: string;

    @ModelProperty()
    public avatar: string;

    @ModelProperty()
    public position: string;

    @ModelProperty()
    public isAdmin: boolean;

    @ModelProperty()
    public currentToken: string;

    constructor (options: any) {
        super(options);
    }
}
