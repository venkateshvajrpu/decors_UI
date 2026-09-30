import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { Testimonial } from '../../../models';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'app-testimonial-card',
  imports: [IconComponent],
  templateUrl: './testimonial-card.component.html',
  styleUrl: './testimonial-card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestimonialCardComponent {
  readonly testimonial = input.required<Testimonial>();

  protected readonly stars = computed(() => Array.from({ length: 5 }, (_, i) => i < this.testimonial().rating));
}
