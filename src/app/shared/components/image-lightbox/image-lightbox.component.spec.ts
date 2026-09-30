import { Component, viewChild } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { GalleryImage } from '../../../models';
import { ImageLightboxComponent } from './image-lightbox.component';

@Component({
  imports: [ImageLightboxComponent],
  template: '<app-image-lightbox [images]="images" (closed)="closedCount = closedCount + 1" />',
})
class HostComponent {
  images: GalleryImage[] = [
    { src: 'images/gallery/a.webp', alt: 'A', album: 'test', category: 'test', eventType: 'Test', width: 100, height: 80 },
    { src: 'images/gallery/b.webp', alt: 'B', album: 'test', category: 'test', eventType: 'Test', width: 100, height: 80 },
    { src: 'images/gallery/c.webp', alt: 'C', album: 'test', category: 'test', eventType: 'Test', width: 100, height: 80 },
  ];
  closedCount = 0;
  lightbox = viewChild.required(ImageLightboxComponent);
}

describe('ImageLightboxComponent', () => {
  async function setup() {
    const fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
    await fixture.whenStable();
    const el = fixture.nativeElement as HTMLElement;
    const lightbox = fixture.componentInstance.lightbox();
    const caption = () => el.querySelector('.lightbox__caption')?.textContent?.trim();
    return { fixture, el, lightbox, caption };
  }

  it('renders nothing until opened, then shows the requested image', async () => {
    const { fixture, el, lightbox, caption } = await setup();
    expect(el.querySelector('.lightbox__figure')).toBeNull();
    lightbox.open(1);
    await fixture.whenStable();
    expect(el.querySelector('img')?.getAttribute('alt')).toBe('B');
    expect(caption()).toContain('2 / 3');
  });

  it('wraps around with next/prev and arrow keys', async () => {
    const { fixture, el, lightbox } = await setup();
    lightbox.open(2);
    await fixture.whenStable();
    lightbox.next();
    await fixture.whenStable();
    expect(el.querySelector('img')?.getAttribute('alt')).toBe('A');
    el.querySelector('dialog')?.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true }));
    await fixture.whenStable();
    expect(el.querySelector('img')?.getAttribute('alt')).toBe('C');
  });

  it('emits closed once when closed', async () => {
    const { fixture, lightbox } = await setup();
    lightbox.open(0);
    await fixture.whenStable();
    lightbox.close();
    await fixture.whenStable();
    expect(fixture.componentInstance.closedCount).toBe(1);
    lightbox.close();
    await fixture.whenStable();
    expect(fixture.componentInstance.closedCount).toBe(1);
  });
});
