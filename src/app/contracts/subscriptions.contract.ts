export namespace SubscriptionsContract {
    export const EMIT_DATE_AS_STRING = 'emitDateAsString';

    export namespace DataTable {
        export const UPDATE_DATA_PORTION = 'updateDataPortion';
    }

    export namespace CreateArticle {
        export const CHECK_EDITING = 'checkEditing';
        export const ADD_NODE_MODAL = 'addNodeModal';
    }

    export namespace ConfigureArticle {
        export const UPDATE_SETTINGS = 'updateSettings';
        export const GET_TAGS = 'getTags';
        export const TRACK_TOC = 'trackTOC';
    }

    export namespace Images {
        export const PROVIDE_FILE = 'provideImageFile';
        export const DELETE_PREVIOUS = 'deletePreviousImage';
        export const TRACK_PREVIOUS = 'trackPreviousImage';
    }

    export namespace ArticlesList {
        export const GET_LIST = 'getList';
    }
}
