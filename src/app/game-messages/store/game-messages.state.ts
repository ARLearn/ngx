import {EntityState} from "@ngrx/entity";
import {messagesAdapter, OnlyMessagesState} from "./game-messages.reducer";

export enum PreviewType {
    NONE = 0,
    Message = 1,
    MultipleChoice = 2,
    MCCorrect = 3,
    MCFalse = 4,
    SingleChoice = 5,
    SCCorrect = 6,
    SCFalse = 7,
    Video = 8,
    Audio = 8,
    SingleImageChoice = 9,
    MultipleImageChoice = 10,
}



export interface GameMessagesState {
    gameId: number;
    selectedMessage: number;
    filter: string[];
    preview?: PreviewData;
    targetMessage?: number;
    editMode: number;
    messages: OnlyMessagesState;
    previewMessage: number;
    selectedScreen: string;
    loading: boolean;
}


export interface PreviewData {
    selectedPreview: PreviewType;
    data?: string;
}

export interface GameMessageCommon {
    type: "org.celstec.arlearn2.beans.generalItem.AudioObject"
        | "org.celstec.arlearn2.beans.generalItem.SingleChoiceImageTest"
        | "org.celstec.arlearn2.beans.generalItem.MultipleChoiceImageTest"
        | "org.celstec.arlearn2.beans.generalItem.NarratorItem"
        | "org.celstec.arlearn2.beans.generalItem.MultipleChoiceTest"
        | "org.celstec.arlearn2.beans.generalItem.SingleChoiceTest"
        | "org.celstec.arlearn2.beans.generalItem.VideoObject";
    id?: number;
    gameId: number;
    name?: string;
    heading?: string;
    description?: string;
    authoringX?: number;
    authoringY?: number;
    label?: string;
    dependsOn?: DependencyUnion;
    disappearOn?: DependencyUnion;
    richText?: string;
    lastModificationDate?: number;
    lat?: number;
    lng?: number;
    showInList?: boolean;
    fileReferences?: any;
    primaryColor?: string;
    sortKey?: number;
}


export interface MultipleChoiceScreen extends GameMessageCommon {
    answers?: any[];
    showFeedback?: boolean;
}

export interface MultipleChoiceAnswerItem {
    type: "org.celstec.arlearn2.beans.generalItem.MultipleChoiceAnswerItem";
    answer: string;
    id: string;
    isCorrect: boolean;
    feedback?: string;
}

export interface ScanTagScreen extends GameMessageCommon {
    autoLaunchQrReader: boolean;
}

export type GameMessage = MultipleChoiceScreen | ScanTagScreen;

export type DependencyTypeAction = "org.celstec.arlearn2.beans.dependencies.ActionDependency";
export type DependencyTypeTime = "org.celstec.arlearn2.beans.dependencies.TimeDependency";
export type DependencyTypeOr = "org.celstec.arlearn2.beans.dependencies.OrDependency";

interface Dependency {
    type: DependencyTypeAction | DependencyTypeOr | DependencyTypeTime;
}

export interface ActionDependency extends Dependency {
    action: string;
    generalItemId: number;
    scope?: number;
}


export interface TimeDependency extends Dependency {
    timeDelta: number;
    offset: Dependency;
}

export interface OrDependency extends Dependency {
    dependencies: Dependency[];
}

export interface AndDependency extends Dependency {
    dependencies: Dependency[];
}

export interface ProximityDependency extends Dependency {
    lng: number;
    lat: number;
    radius: number;
}

export type DependencyUnion = ProximityDependency | AndDependency | OrDependency | TimeDependency | ActionDependency ;

export interface GeneralItemList {
    generalItems: GameMessage[];
    serverTime: number;
    resumptionToken?: string;
}
