import { Component, Input } from "@angular/core";
import { Observable } from "rxjs";
import { Card } from "./card";

@Component({
    selector: 'app-card',
    templateUrl: 'card.component.html',
    styleUrls: ['card.component.css']
})
export class CardComponent {
    @Input() items: Observable<Card[]> = new Observable;
}