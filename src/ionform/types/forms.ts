// @ts-nocheck
//  {globals} from "@ionic/core/dist/types/components";
import { MyIonicComponents } from "./types";

import { Validator as validator } from "validator";

import ValidationDictionary from "../validationDictionary";
import PasswordValidator from "password-validator";

export type FormGeneratorComponent = (
  tagOptions: TagOptions[],
  validationDictionary: ValidationDictionary
) => HTMLElement | MyIonicComponents.HTMLIonContentElement | DocumentFragment;

export type HelperError = {
  helper: MyIonicComponents.HTMLIonNoteElement;
  error: MyIonicComponents.HTMLIonNoteElement;
};
export type CheckFormResponse = {
  changes: Map<string, string>;
  event: Event;
  completeForm: Map<string, string>;
  states: Map<string, boolean>;
  allValid: boolean;
};
export type FieldValidationResponse = {
  value: string;
  helper?: MyIonicComponents.HTMLIonNoteElement;
  error?: MyIonicComponents.HTMLIonNoteElement;
  validator;
  passwordValidator?: PasswordValidator;
  linkFunction?: (name: string) => string | null;
};

export type CheckFormFunctionResponse = (
  element: CheckFormResponse
) => Promise<boolean> | boolean;

export type ValidatorFunction = (
  element:
    | MyIonicComponents.HTMLIonInputElement
    | MyIonicComponents.HTMLIonTextareaElement
    | MyIonicComponents.HTMLIonCheckboxElement
    | MyIonicComponents.HTMLIonDatetimeElement
    | FieldValidationResponse
) => Promise<boolean> | boolean;

export type FieldValidationFunction = ValidatorFunction;

export interface IonInputAttributes {
  name?: string;

  value?: string;

  tagName: string;

  labelText?: string;

  disabled?: string;

  helper?: string;

  error?: string;

  position?: string;

  type?: string;

  validator?: FieldValidationFunction;
}

export interface IonInputFields {
  [index: string]: IonInputAttributes;
}

export interface DefineIonInputSchemaDictionary {
  [index: string]: IonInputFields;
}

export interface WordDictionary {
  [index: string]: string;
}

export class StringDictionary implements WordDictionary {
  [index: string]: string;

  constructor();
}

export interface DefineValidationSchema {
  [index: string]: ValidatorFunction;
}

export interface DefineValidationSchemaDictionary {
  [index: string]: DefineValidationSchema;
}

export interface DefineFormSchemaDictionary {
  [index: string]: StringDictionary;
}

export interface ElementReferences {
  parentElement?:
    | HTMLElement
    | MyIonicComponents.HTMLIonCardContentElement
    | DocumentFragment;

  validation?: FieldValidationFunction;
}

type MergeTypes<A, B> = {
  [key in keyof A]: key extends keyof B ? B[key] : A[key];
} & B;

export type TagOptions = MergeTypes<ElementReferences, IonInputAttributes>;

export class TagOption implements TagOptions {
  parentElement?: HTMLElement | MyIonicComponents.HTMLIonCardContentElement;

  validator?: FieldValidationFunction;

  disabled?: string;

  tagName: string;

  type?: string;

  position?: string;

  label?: string;

  helper?: string;

  error?: string;

  name: string;

  value: string;

  labelText?: string;

  display_format?: string;

  presentation?: string;

  constructor({
    name = "",
    value = "",
    tagName = "ion-input",
    labelText = "",
    disabled = "false",
    helper = "fill the input",
    error = "input error",
    position = "floating",
    type = "text",
    parentElement,
    validator,
  }: TagOptions) {
    this.checkTagName(tagName);
    this.tagName = tagName;

    this.name = name;
    this.value = value;

    this.labelText = labelText;
    this.disabled = disabled;

    this.position = position;
    this.type = type;

    this.validator = validator;
  }

  checkTagName(tagName: string): void {
    const tagOptions = [
      "input",
      "ion-input",

      "datetime",
      "ion-datetime",

      "checkbox",
      "ion-checkbox",

      "button",
      "ion-button",

      "textarea",
      "ion-textarea",
    ];

    if (!tagOptions.find((tagOption) => tagOption === tagName)) {
      throw Error(tagName + " element does not exist ");
    }
  }
}

export type ArraySchema = string | Array<ArraySchema[] | string[]>;

export type FormSchema = {
  schemaTemplateName: string;
  formSchema: StringDictionary;
};

export type HTMLInputSchema = {
  schemaTemplateName: string;
  schemaDictionary: IonInputFields;
};

export type ValidationSchema = {
  name: string;
  validationSchema: DefineValidationSchema;
};

export interface GenerateForm {
  jsonForm?: string | StringDictionary;
  schemaDictionary?: string | IonInputFields;
  tagOptions?: TagOptions[];
  definedValidationSchemaTemplateName?: string;
  defineInputSchema?: HTMLInputSchema;
  defineValidationSchema?: ValidationSchema;
  defineFormSchema?: FormSchema;
  useValidationSchema?: string;
}
