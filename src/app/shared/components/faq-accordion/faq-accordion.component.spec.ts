import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Faq } from '../../../models';
import { FaqAccordionComponent } from './faq-accordion.component';

@Component({
  imports: [FaqAccordionComponent],
  template: '<app-faq-accordion [faqs]="faqs" [singleOpen]="singleOpen()" />',
})
class HostComponent {
  faqs: Faq[] = [
    { question: 'Q1', answer: 'A1' },
    { question: 'Q2', answer: 'A2' },
    { question: 'Q3', answer: 'A3' },
  ];
  singleOpen = signal(true);
}

describe('FaqAccordionComponent', () => {
  function setup() {
    const fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    const triggers = () => Array.from(el.querySelectorAll<HTMLButtonElement>('.faq__trigger'));
    const expanded = () => triggers().map((b) => b.getAttribute('aria-expanded'));
    return { fixture, el, triggers, expanded };
  }

  it('opens the first item by default with correct ARIA wiring', () => {
    const { triggers, expanded, el } = setup();
    expect(expanded()).toEqual(['true', 'false', 'false']);
    const first = triggers()[0];
    const panel = el.querySelector('#' + first.getAttribute('aria-controls'));
    expect(panel?.getAttribute('aria-labelledby')).toBe(first.id);
    expect(panel?.hasAttribute('hidden')).toBe(false);
  });

  it('single-open mode closes others when a new item opens', async () => {
    const { fixture, triggers, expanded } = setup();
    triggers()[2].click();
    await fixture.whenStable();
    expect(expanded()).toEqual(['false', 'false', 'true']);
    triggers()[2].click();
    await fixture.whenStable();
    expect(expanded()).toEqual(['false', 'false', 'false']);
  });

  it('multi-open mode keeps others open', async () => {
    const { fixture, triggers, expanded } = setup();
    fixture.componentInstance.singleOpen.set(false);
    await fixture.whenStable();
    triggers()[1].click();
    await fixture.whenStable();
    expect(expanded()).toEqual(['true', 'true', 'false']);
  });

  it('moves focus with arrow keys, Home and End', () => {
    const { triggers } = setup();
    const [first, second, third] = triggers();
    first.focus();
    first.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
    expect(document.activeElement).toBe(second);
    second.dispatchEvent(new KeyboardEvent('keydown', { key: 'End', bubbles: true }));
    expect(document.activeElement).toBe(third);
    third.dispatchEvent(new KeyboardEvent('keydown', { key: 'Home', bubbles: true }));
    expect(document.activeElement).toBe(first);
  });
});
