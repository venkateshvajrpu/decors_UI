import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { SITE_CONFIG } from '../../../config/site.config';
import { WhatsappService } from '../../../core/services/whatsapp.service';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'app-whatsapp-fab',
  imports: [IconComponent],
  templateUrl: './whatsapp-fab.component.html',
  styleUrl: './whatsapp-fab.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WhatsappFabComponent {
  protected readonly config = inject(SITE_CONFIG);
  protected readonly wa = inject(WhatsappService);
}
