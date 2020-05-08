import {Directive, HostListener, Input} from "@angular/core";
import {Store} from "@ngrx/store";
import {State} from "../../core/reducers";
import {GameMessageSetPreview} from "../store/game-message.actions";

@Directive({selector: '[appTriggerMobileView]'})
export class ChangeScreenPreviewDirective {
    @Input() name: string;
    @Input() data: string;

    constructor(public store: Store<State>) {
    }

    @HostListener('click', ['$event.target'])
    onClick(btn) {
        this.store.dispatch(new GameMessageSetPreview({
            ptype: this.name,
            data: this.data
        }));
    }
}
