import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BlogService } from '../../../../services/blog.service';
import { CommonComponent } from '../../../../classes/CommonComponent';
import { SubscriptionsContract } from '../../../../contracts/subscriptions.contract';
import { CollectionResponse } from '../../../../types/collection.response';
import { TagInstance } from '../../../../models/tag-instance.model';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { TagEditingDto } from '../../types/tag-editing.dto';

@Component({
    selector: 'app-configure-tags',
    templateUrl: './configure-tags.component.html',
    styleUrls: ['./configure-tags.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfigureTagsComponent extends CommonComponent implements OnInit {
    public tagsList: BehaviorSubject<TagInstance[]> = new BehaviorSubject<TagInstance[]>(([]));

    public  tagsEditingEntries: { [key: string]: TagEditingDto } = { };

    @Input()
    public initiallySelected: number[] = [];

    @Output()
    public onChanged: EventEmitter<number[]> = new EventEmitter<number[]>();

    constructor (
        private blogService: BlogService,
    ) {
        super();
    }

    public ngOnInit () : void {
        this.updateSubscription(
            SubscriptionsContract.ConfigureArticle.GET_TAGS,
            this.blogService.getTags().subscribe(this.saveTags.bind(this)),
        );
    }

    private saveTags (res: CollectionResponse<TagInstance>) : void {
        this.tagsList.next(res.items);

        for (const tag of res.items) {
            const checked: boolean = (this.initiallySelected)
                ? this.initiallySelected.includes(tag.id)
                : false;
            const disabled: boolean = false;

            this.tagsEditingEntries[tag.alias] = { checked, disabled };
        }

        for (const tag of res.items) {
            if (this.tagsEditingEntries[tag.alias].checked) {
                this.updateTagsAvailability(tag.alias);
            }
        }
    }

    public updateTagsAvailability (tagAlias: string, shouldEmit: boolean = false) : void {
        const targetTag: TagInstance = this.getTagInstanceByAlias(tagAlias);
        const targetTagEditingEntry: TagEditingDto = this.tagsEditingEntries[tagAlias];

        if (targetTag.parentTagId) {
            const parentTag: TagInstance = this.getTagInstanceById(targetTag.parentTagId);
            const parentTagEditingEntry: TagEditingDto = this.tagsEditingEntries[parentTag.alias];
            const allChildrenTags: TagInstance[] = this.getChildrenTagInstances(parentTag);

            parentTagEditingEntry.disabled = allChildrenTags
                .map((tag: TagInstance) => this.tagsEditingEntries[tag.alias].checked)
                .reduce((previous: boolean, current: boolean) => previous || current);
        } else {
            const allChildrenTags: TagInstance[] = this.getChildrenTagInstances(targetTag);

            for (const tag of allChildrenTags) {
                this.tagsEditingEntries[tag.alias].disabled = targetTagEditingEntry.checked;
            }
        }

        if (shouldEmit) { this.emitOnChanged(); }
    }

    private emitOnChanged () : void {
        const selectedTagIds: number[] = this.tagsList.value
            .filter((tag: TagInstance) => this.tagsEditingEntries[tag.alias].checked)
            .map((tag: TagInstance) => tag.id);

        this.onChanged.emit(selectedTagIds);
    }

    private getTagInstanceByAlias (alias: string) : TagInstance {
        return this.tagsList.value.filter((tag: TagInstance) => tag.alias === alias)[0];
    }

    private getTagInstanceById (id: number) : TagInstance {
        return this.tagsList.value.filter((tag: TagInstance) => tag.id === id)[0];
    }

    private getChildrenTagInstances (parentTag: TagInstance) : TagInstance[] {
        return this.tagsList.value.filter((tag: TagInstance) => tag.parentTagId === parentTag.id);
    }
}
