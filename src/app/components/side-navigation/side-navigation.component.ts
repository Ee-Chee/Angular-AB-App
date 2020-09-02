import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-side-nav',
    templateUrl: './side-navigation.component.html',
    styleUrls: ['./side-navigation.component.css']
})
export class SideNavigationComponent implements OnInit {
    @Output() sidenavClose = new EventEmitter();

    constructor() { }

    ngOnInit() {
    }

    public onSidenavClose = () => {
        this.sidenavClose.emit();
    }

}