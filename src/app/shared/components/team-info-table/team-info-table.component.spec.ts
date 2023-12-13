import { ComponentFixture, TestBed } from "@angular/core/testing";

import { TeamInfoTableComponent } from "./team-info-table.component";

describe("TeamInfoTableComponent", () => {
  let component: TeamInfoTableComponent;
  let fixture: ComponentFixture<TeamInfoTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TeamInfoTableComponent]
    });
    fixture = TestBed.createComponent(TeamInfoTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
