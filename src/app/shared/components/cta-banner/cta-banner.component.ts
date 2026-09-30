import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { SITE_CONFIG } from '../../../config/site.config';
import { WhatsappService } from '../../../core/services/whatsapp.service';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'app-cta-banner',
  imports: [IconComponent],
  templateUrl: './cta-banner.component.html',
  styleUrl: './cta-banner.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CtaBannerComponent {
  protected readonly config = inject(SITE_CONFIG);
  protected readonly wa = inject(WhatsappService);

  readonly title = input('Planning something special?');
  readonly text = input('Tell us the date and venue — we’ll plan the décor and send you a quote on WhatsApp.');
  /** Override the WhatsApp link (e.g. a service-specific prefill). */
  readonly whatsappHref = input<string>('');
}
