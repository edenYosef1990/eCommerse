import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { map } from 'rxjs';

@Component({
  selector: 'app-display-search-results',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  template: `search results for {{ (id$ | async) ?? '' }}`,
  styleUrls: ['./display-search-results.component.scss'],
})
export class DisplaySearchResultsComponent {
  id$ = this.activatedRoutes.paramMap.pipe(map((x) => x.get('id')));

  constructor(private activatedRoutes: ActivatedRoute) {}
}
