import { FormsContract } from '../../../../contracts/forms.contract';
import { Validators } from '@angular/forms';
import { HeaderLevels } from '../../../../enums/header-levels.enum';

export const CONFIGURE_SECTION_TITLE_FORM_CONFIG = {
    [FormsContract.NodeSectionTitle.TEXT]: [
        '', [Validators.required],
    ],
    [FormsContract.NodeSectionTitle.SHOW_IN_TABLE_OF_CONTENTS]: [
        false, [],
    ],
    [FormsContract.NodeSectionTitle.TEXT_IN_TABLE_OF_CONTENTS]: [
        '', [],
    ],
    [FormsContract.NodeSectionTitle.HEADER_LEVEL]: [
        HeaderLevels.H2, [Validators.required],
    ],
};
