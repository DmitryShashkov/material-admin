import { FormsContract } from '../../../contracts/forms.contract';
import { Validators } from '@angular/forms';
import * as CustomValidators from '../../../validators';

const MAX_VARCHAR_MEDIUM: number = 255;
const MAX_VARCHAR_LARGE: number = 1000;
const URL_PATTERN: RegExp = /^[\da-z]+(-[\da-z]+)*$/;
const MAX_BREADCRUMB_SIZE: number = 17;

export const ARTICLE_SETTINGS_FORM_CONFIG = {
    [FormsContract.ArticleSettings.TITLE]: [
        '', [Validators.required, Validators.maxLength(MAX_VARCHAR_MEDIUM)],
    ],
    [FormsContract.ArticleSettings.DESCRIPTION]: [
        '', [Validators.required, Validators.maxLength(MAX_VARCHAR_LARGE)],
    ],
    [FormsContract.ArticleSettings.META_TITLE]: [
        '', [Validators.required, Validators.maxLength(MAX_VARCHAR_MEDIUM)],
    ],
    [FormsContract.ArticleSettings.META_DESCRIPTION]: [
        '', [Validators.required, Validators.maxLength(MAX_VARCHAR_LARGE)],
    ],
    [FormsContract.ArticleSettings.DISPLAY_URL]: [
        '', [Validators.required, Validators.maxLength(MAX_VARCHAR_MEDIUM), Validators.pattern(URL_PATTERN)],
    ],
    [FormsContract.ArticleSettings.LAST_BREADCRUMB]: [
        '', [Validators.required, Validators.maxLength(MAX_BREADCRUMB_SIZE)],
    ],
    [FormsContract.ArticleSettings.PUBLISHING_DATE]: [
        new Date().toISOString(), [Validators.required],
    ],
    [FormsContract.ArticleSettings.PREVIEW_IMAGE]: [
        null, [Validators.required, CustomValidators.imageSize, CustomValidators.imageType],
    ],
    [FormsContract.ArticleSettings.IS_POPULAR]: [
        false, [],
    ],
};
