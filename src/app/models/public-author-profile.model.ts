import { BaseModel, ModelProperty } from 'ts-json-mapper';

export class PublicAuthorProfile extends BaseModel {
    @ModelProperty()
    public id: number;

    @ModelProperty()
    public createdAt: Date;

    @ModelProperty()
    public updatedAt: Date;

    @ModelProperty()
    public displayName: string;

    @ModelProperty()
    public avatar: string;

    @ModelProperty()
    public position: string;

    constructor (options: any) {
        super(options);
    }
}
