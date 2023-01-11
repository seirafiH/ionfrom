/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  CheckFormResponse,
  CheckFormFunctionResponse,
  ValidatorFunction,
  GenerateForm,
} from "./forms";

export namespace MyIonicComponents {
  export type HTMLIonCheckboxElement = any;

  export type HTMLIonContentElement = any;
  export type HTMLIonNoteElement = any;

  export type HTMLIonDatetimeElement = any;
  export type HTMLIonTextareaElement = any;
  export type HTMLIonInputElement = any;
  export type HTMLIonCardContentElement = any;
  export type HTMLIonItemElement = any;
}

export type FieldObject =
  | MyIonicComponents.HTMLIonInputElement
  | MyIonicComponents.HTMLIonTextareaElement
  | MyIonicComponents.HTMLIonCheckboxElement
  | MyIonicComponents.HTMLIonDatetimeElement;

export interface ValidationDictionaryType {
  validationDefinitionErrors: boolean = false;

  signature: string | any;

  key: number | any;

  schemaTemplates: { [index: string]: any } | any;

  valid: { [index: string]: boolean } | any;

  keyValues: Map<string, string>;

  pristineKeyValues: Map<string, string>;

  // new (src: Partial<ValidationDictionary>);

  getFormValues(): {
    pristineKeyValues: Map<string, string>;
    keyValues: Map<string, string>;
  };

  setValidation(name: string, fieldObject: FieldObject): void;
  checkFieldValidity(
    ionInputName: string,
    ionInputValue: string,
    hTMLIonItemElement?: MyIonicComponents.HTMLIonItemElement
  ): Promise<boolean>;

  checkForm(event: Event, formObject: IonForm): CheckFormResponse;

  setFieldValidity(
    valid: boolean,
    ionInputName: string,
    ionInputValue: string
  ): void;

  getFieldValidity(name: string): boolean;
  allValidFields(): {
    missing: string[];
    allValid: boolean;
  };

  validField(name: string): boolean;

  updateValues(update: boolean): void;
}

export interface DynamicFormType {
  // shadow: ShadowRoot;

  // wrapper: any;

  // validationDictionary: ValidationDictionaryType;

  // changeEventMethod: CheckFormFunctionResponse;

  get observedAttributes(): string[];

  fieldValidate(inputName: string, validationFunction: ValidatorFunction): void;

  createForm(formOptions: GenerateForm): Promise<void>;

  onFormChange(
    submit: CheckFormFunctionResponse
  ): Promise<CheckFormFunctionResponse>;

  // onValid(state: string, event: Event): Promise<void>;

  // staticInputs(
  //   config: { disabledFelids: string[] },
  //   labelAndValues: () => Promise<string[][]>
  // ): Promise<void>;

  // render(): void;

  // disconnectedCallBack(): void;

  // adoptedCallback(): void;

  //connectedCallback(): void;

  // attributeChangedCallback(
  //   attrName: string,
  //   oldVal: string,
  //   newVal: string
  // ): void;
}
// export type DynamicFormFunction = (formname: string) => DynamicFormType;
