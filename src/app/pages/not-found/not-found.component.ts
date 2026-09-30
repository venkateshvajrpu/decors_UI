import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SITE_CONFIG } from '../../config/site.config';
import { SeoService } from '../../core/services/seo.service';
import { WhatsappService } from '../../core/services/whatsapp.service';
import { IconComponent } from '../../shared';

@Component({
  selector: 'app-not-found',
  imports: [RouterLink, IconComponent],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotFoundComponent implements OnInit {
  private readonly seo = inject(SeoService);
  protected readonly config = inject(SITE_CONFIG);
  protected readonly wa = inject(WhatsappService);

  ngOnInit(): void {
    this.seo.setPage({
      title: 'Page not found',
      description: `The page you were looking for on ${this.config.name} doesn’t exist.`,
      path: '404',
    });
    this.seo.setNoIndex();
  }
}
