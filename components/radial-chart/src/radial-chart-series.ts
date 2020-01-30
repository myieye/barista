/**
 * @license
 * Copyright 2020 Dynatrace LLC
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {
  Directive,
  Input,
  SimpleChanges,
  OnChanges,
  OnDestroy,
} from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Directive({
  selector: 'dt-radial-chart-series',
  exportAs: 'dtRadialChartSeries',
})
export class DtRadialChartSeries implements OnChanges, OnDestroy {
  @Input() value: number;
  @Input() name: string;
  @Input() color: string;

  /** @internal fires when value changes */
  _stateChanges = new BehaviorSubject<DtRadialChartSeries>(this);

  ngOnChanges(_changes: SimpleChanges): void {
    this._stateChanges.next(this);
  }

  ngOnDestroy(): void {
    this._stateChanges.complete();
  }
}
