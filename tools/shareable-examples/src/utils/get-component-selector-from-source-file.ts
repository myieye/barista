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
  SourceFile,
  isPropertyAssignment,
  PropertyAssignment,
} from 'typescript';
import {
  AngularClassDecoratorName,
  getAngularDecoratedClasses,
} from 'tools/shared/src/utils';

/** Get the selector from the component file. */
export async function getComponentSelectorFromSourceFile(
  source: SourceFile,
): Promise<string> {
  const componentClass = (await getAngularDecoratedClasses(
    source,
    AngularClassDecoratorName.Component,
  ))[0];
  // Iterate all properties within the decorator
  const selector = componentClass.decorator.properties
    // Filter everything that is not a property assignment
    .filter(property => isPropertyAssignment(property))
    // Filter everything that is not the selector assignment
    .filter(
      (property: PropertyAssignment) => property.name.getText() === 'selector',
    )
    // Map to the initializer value
    .map((property: PropertyAssignment) => property.initializer.getText()) // take the first element found
    [0] // replace the quotes
    .replace(/'/g, '');
  return selector;
}
