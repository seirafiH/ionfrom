/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
// import "@ionic/core/dist/types/components";
import { TupleType } from "typescript";

import {
  CheckFormResponse,
  FieldValidationResponse,
  HelperError,
  ValidatorFunction,
} from "./types/forms";

import { ValidationDictionaryType, FieldObject } from "./types/types";

import validator from "validator";
import passwordValidator from "password-validator";

import { MyIonicComponents } from "./types/types";
import { IonForm } from "./dynamicForm";

const getHelpers = (
  ionItemElement: HTMLElement,
  _inputName: string
): HelperError | null => {

  const helperError: any = Array.from(
    ionItemElement.querySelectorAll(
      'ion-note[slot="helper"],ion-note[slot="error"]'
    )
  );

  if (helperError && helperError.length === 2) {
    const [helper, error]: [
      MyIonicComponents.HTMLIonNoteElement,
      MyIonicComponents.HTMLIonNoteElement
    ] = helperError;

    return { helper, error };
  }

  return null;
};

const linkField = (
  map: Map<string, string>
): ((name: string) => string | null) => {
  return function (name: string): string | null {
    if (map.has(name)) {
      return map.get(name) || "";
    }
    return null;
  };
};

export default class ValidationDictionary
  extends Map<string, ValidatorFunction>
  implements ValidationDictionaryType
{
  public validationDefinitionErrors = false;

  public signature: string | any;

  public key: number | any;

  public schemaTemplates: { [index: string]: any } | any;

  public valid: { [index: string]: boolean };

  public keyValues: Map<string, string>;

  pristineKeyValues: Map<string, string>;

  constructor(src: Partial<ValidationDictionary>) {
    super();

    Object.assign(this, src);

    this.keyValues = new Map();

    this.pristineKeyValues = new Map();

    this.valid = {};
  }

  getFormValues(): {
    pristineKeyValues: Map<string, string>;

    keyValues: Map<string, string>;
  } {
    const pristineKeyValues = this.pristineKeyValues;

    const keyValues = this.keyValues;

    return { pristineKeyValues, keyValues };
  }

  async setValidation(name: string, fieldObject: FieldObject) {
    const validationFunction: ValidatorFunction | any = this.get(name);

    if (validationFunction) {
      try {
        this.set(name, validationFunction);

        const validation: boolean = await validationFunction(fieldObject);

        this.valid[name] = validation;
      } catch (error) {
        console.error("error", error);
      }
    }

    this.pristineKeyValues.set(name, fieldObject.value);

    this.keyValues.set(name, fieldObject.value);
  }

  async checkFieldValidity(
    ionInputName: string,
    ionInputValue: string,
    hTMLIonItemElement?: MyIonicComponents.HTMLIonItemElement
  ): Promise<boolean> {
    if (this.has(ionInputName)) {
      const fieldValidationFunction: ValidatorFunction | any =
        this.get(ionInputName);
      const response: HelperError | null = getHelpers(
        hTMLIonItemElement,
        ionInputValue
      );

      const link = linkField(this.keyValues);
      let fieldValidationResponse: FieldValidationResponse | any = {
        value: ionInputValue,
        validator,
        passwordValidator,
        linkField: link,
      };

      if (response) {
        fieldValidationResponse = Object.assign(
          fieldValidationResponse,
          response
        );
      }

      const valid: boolean = await fieldValidationFunction(
        fieldValidationResponse
      );

      this.setFieldValidity(valid, ionInputName, ionInputValue);

      return valid;
    } else {
      if (!this.validationDefinitionErrors) {
        console.error(
          `you have not defend a validation function for ${ionInputName}`
        );
      }
      return true;
    }
  }

  checkForm(event: Event, formObject: IonForm): CheckFormResponse {
    const changes = new Map<string, string>();

    const currentValidValues: string[][] | any = Object.entries(
      JSON.parse(JSON.stringify(this.valid))
    );

    while (currentValidValues.length) {
      const [key, value] = currentValidValues.shift();

      const original = this.pristineKeyValues.get(key);

      const updatedValue = this.keyValues.get(key);
      if (updatedValue) {
        if (value && original !== updatedValue) {
          changes.set(key, updatedValue);
        }
      }
    }
    const states: Map<string, boolean> = new Map(Object.entries(this.valid));

    const formState: {
      missing: string[];
      allValid: boolean;
    } = this.allValidFields();

    const completeForm: Map<string, string> = new Map(this.keyValues);
    const response: CheckFormResponse = {
      changes,
      event,
      completeForm,
      states,
      allValid: formState.allValid,
    };

    return response;
  }

  setFieldValidity(
    valid: boolean,
    ionInputName: string,
    ionInputValue: string
  ) {
    const originalValue = this.pristineKeyValues.get(ionInputName);
    this.valid[ionInputName] = valid;

    if (originalValue === ionInputValue) {
      this.keyValues.set(ionInputName, originalValue);
    } else if (valid) {
      this.keyValues.set(ionInputName, ionInputValue);
    }
  }

  getFieldValidity(name: string): boolean {
    return this.valid[name];
  }

  allValidFields(): {
    missing: string[];
    allValid: boolean;
  } {
    const allValid = Object.values(this.valid).every((val) => val === true);
    const missing: string[] = [];

    if (!allValid) {
      const allValues: [string, boolean][] = Object.entries(this.valid);
      if (allValues) {
        while (allValues.length) {
          const [name, value]: [string, boolean] = [...allValues.shift()!];

          if (!value) {
            missing.push(name);
          }
        }
      }
    }
    return { missing, allValid };
  }

  validField(name: string): boolean {
    if (this.has(name)) {
      return true;
    }

    return false;
  }

  updateValues(update: boolean) {
    if (update) {
      this.pristineKeyValues = new Map(this.keyValues);
    }
  }
}
