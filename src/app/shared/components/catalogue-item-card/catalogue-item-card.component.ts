import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { CatalogueItem, CatalogueTag } from '../../../models';

const TAG_LABELS: Record<CatalogueTag, string> = {
  popular: 'Popular',
  premium: 'Premium',
  signature: 'Signature',
  new: 'New',
  seasonal: 'Seasonal',
};

@Component({
  selector: 'app-catalogue-item-card',
  templateUrl: './catalogue-item-card.component.html',
  styleUrl: './catalogue-item-card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CatalogueItemCardComponent {
  readonly item = input.required<CatalogueItem>();

  protected readonly tags = computed(() =>
    (this.item().tags ?? []).map((tag) => ({ tag, label: TAG_LABELS[tag] })),
  );
}
