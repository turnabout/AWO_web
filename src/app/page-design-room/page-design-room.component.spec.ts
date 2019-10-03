import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { PageDesignRoomComponent } from "./page-design-room.component";

describe("PageDesignRoomComponent", () => {
    let component: PageDesignRoomComponent;
    let fixture: ComponentFixture<PageDesignRoomComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ PageDesignRoomComponent ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PageDesignRoomComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
