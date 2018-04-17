
import { Component } from '@angular/core';
import { TestBed, async, inject, tick, fakeAsync } from '@angular/core/testing';
import { DEFAULT_VIEWPORT_RESIZER_PROVIDER, ViewportResizer } from '@dynatrace/angular-components';
import { By } from '@angular/platform-browser';
import { ViewportRuler } from '@angular/cdk/scrolling';
import { Platform } from '@angular/cdk/platform';

function createFakeEvent(type: string): Event {
  const event = document.createEvent('Event');
  event.initEvent(type, true, true);

  return event;
}

describe('ViewportResizer', () => {
  let resizer: ViewportResizer;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        DEFAULT_VIEWPORT_RESIZER_PROVIDER,
        ViewportRuler,
        Platform,
      ],
    });
  }));

  beforeEach(inject([ViewportResizer], (viewportResizer: ViewportResizer) => {
    resizer = viewportResizer;
  }));

  describe('emit', () => {

    it('should emit a value on resize', () => {
      const spy = jasmine.createSpy('viewport changed spy');
      const subscription = resizer.change(0).subscribe(spy);

      window.dispatchEvent(createFakeEvent('resize'));
      expect(spy).toHaveBeenCalled();
      subscription.unsubscribe();
    });

    it('should emit a value on the change observable after emit is called', () => {
      const spy = jasmine.createSpy('viewport changed spy');
      const subscription = resizer.change(0).subscribe(spy);

      resizer.emit();
      expect(spy).toHaveBeenCalled();
      subscription.unsubscribe();
    });

    it('should emit a value with default throttle', fakeAsync(() => {
      const spy = jasmine.createSpy('viewport changed spy');
      const subscription = resizer.change().subscribe(spy);

      window.dispatchEvent(createFakeEvent('resize'));
      expect(spy).not.toHaveBeenCalled();
      tick(150)
      expect(spy).toHaveBeenCalled();
      subscription.unsubscribe();
    }));
  });
});
