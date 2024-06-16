import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DictionaryEntryViewComponent } from './dictionary-entry-view.component';

describe('DictionaryEntryViewComponent', () => {
  let component: DictionaryEntryViewComponent;
  let fixture: ComponentFixture<DictionaryEntryViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DictionaryEntryViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DictionaryEntryViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
