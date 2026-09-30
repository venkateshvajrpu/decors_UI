import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SITE_CONFIG } from '../../../config/site.config';
import { WhatsappService } from '../../../core/services/whatsapp.service';
import { NAV_LINKS } from '../../nav-links';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'app-footer',
  imports: [RouterLink, IconComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  protected readonly config = inject(SITE_CONFIG);
  protected readonly wa = inject(WhatsappService);
  protected readonly links = NAV_LINKS;
  protected readonly year = new Date().getFullYear();
}
