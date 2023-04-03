/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { ArraySchema } from "./types/forms";
import ValidationDictionary from "./validationDictionary";

import { MyIonicComponents, ValidationDictionaryType } from "./types/types";

export const isIonInputElement: (tagName: string) => boolean = (
  tagName: string
) =>
  Boolean(
    [
      "ION-INPUT",
      "ION-DATETIME",
      "ION-CHECKBOX",
      "ION-TEXTAREA",
      "INPUT",
      "TEXTAREA",
      "CHECKBOX",
    ].find((tag) => tagName.toUpperCase() === tag)
  );

export const generate = (
  scaffold: ArraySchema,
  validationDictionary: ValidationDictionary | ValidationDictionaryType
): boolean | HTMLElement => {
  if (scaffold) {
    const elementSchema = JSON.parse(JSON.stringify(scaffold));

    const [element, properties] = elementSchema.shift();

    const domElement = document.createElement(element);

    const domElementCuplet: any = [[domElement, properties]];

    for (const domNodesAndProperties of domElementCuplet) {
      const [node, props] = domNodesAndProperties;

      for (const [elementKey, elementValue] of props) {
        if (
          elementKey.includes("-") ||
          ["span", "style", "div"].some((tag) => elementKey === tag)
        ) {
          const nestedNode = document.createElement(elementKey);

          node.appendChild(nestedNode);

          domElementCuplet.push([nestedNode, elementValue]);

          continue;
        }

        if (elementKey in node) {
          node[elementKey] = elementValue;
        } else {
          node.setAttribute(elementKey, elementValue);
        }
      }
    }

    const input = domElementCuplet.find(
      (dom: { name: string }[]) => dom[0].name
    );
    if (input) {
      const inputElement = input[0];
      if (inputElement && isIonInputElement(inputElement.tagName)) {
        validationDictionary.setValidation(inputElement.name, inputElement);
      }
    }
    return domElementCuplet[0][0];
  }

  return false;
};
