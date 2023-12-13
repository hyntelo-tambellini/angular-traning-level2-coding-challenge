import { ComponentFixture, TestBed } from "@angular/core/testing";

import { TeamInfoComponent } from "./team-info.component";

describe("TeamInfoComponent", () => {
  let component: TeamInfoComponent;
  let fixture: ComponentFixture<TeamInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TeamInfoComponent]
    });
    fixture = TestBed.createComponent(TeamInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
