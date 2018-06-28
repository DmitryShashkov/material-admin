import { BaseModel, ModelProperty } from 'ts-json-mapper';

export class TagInstance extends BaseModel {
    @ModelProperty()
    public id: number;

    @ModelProperty()
    public createdAt: Date;

    @ModelProperty()
    public updatedAt: Date;

    @ModelProperty()
    public title: string;

    @ModelProperty()
    public alias: string;

    @ModelProperty()
    public description: string;

    @ModelProperty()
    public parentTagId: number;

    constructor (options: any) {
        super(options);
    }
}
