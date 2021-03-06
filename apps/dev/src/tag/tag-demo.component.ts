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

import { Component, OnInit } from '@angular/core';

import { DtTag } from '@dynatrace/barista-components/tag';

@Component({
  selector: 'tag-dev-app-demo',
  templateUrl: './tag-demo.component.html',
  styleUrls: ['./tag-demo.component.scss'],
})
export class TagDemo implements OnInit {
  tags = new Set<string>();

  value1 = 'My value 1';
  value2 = 'My value 2';
  value3 = 'My value 3';
  isDisabled = false;
  canRemove = false;
  hasKey = false;

  ngOnInit(): void {
    this.tags
      .add('Jelly')
      .add('Fish')
      .add('Pear')
      .add('Oreo')
      .add('KitKat')
      .add('Beer')
      .add('Raphaelo')
      .add('Bean')
      .add('Pine');
  }

  addTag(tag: string): void {
    this.tags.add(tag);
  }

  doRemove(tag: DtTag<string>): void {
    window.alert(`Tag removed: ${tag.value}`);
  }
}
