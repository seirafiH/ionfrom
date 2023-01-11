import coreCss from "@ionic/core/css/core.css?inline";

/** Basic CSS for apps built with Ionic */
import normalizeCss from "@ionic/core/css/normalize.css?inline";
import structureCss from "@ionic/core/css/structure.css?inline";
import typographyCss from "@ionic/core/css/typography.css?inline";

/** Optional CSS utils that can be commented out */
import paddingCss from "@ionic/core/css/padding.css?inline";
import floatElementsCss from "@ionic/core/css/float-elements.css?inline";
import textAlignmentCss from "@ionic/core/css/text-alignment.css?inline";
import textTransFormationCss from "@ionic/core/css/text-transformation.css?inline";
import flexUtilsCss from "@ionic/core/css/flex-utils.css?inline";
import displayCss from "@ionic/core/css/display.css?inline";
import { minify } from "csso";

import {
  GenerateForm,
  ValidatorFunction,
  CheckFormFunctionResponse,
} from "./types/forms";

import ValidationDictionary from "./validationDictionary";

import {
  createForm as createForm,
  onValid,
  onFormChange,
  staticInputs,
  changeEvents,
  click,
  formsModule,
} from "./generateForm";

import { DynamicFormType } from "./types/types";
let styles = [
  coreCss,
  normalizeCss,
  structureCss,
  typographyCss,
  paddingCss,
  floatElementsCss,
  textAlignmentCss,
  textTransFormationCss,
  flexUtilsCss,
  displayCss,
];
styles = [
  minify(
    styles.reduce((acc, text) => acc.concat(text), ""),
    { restructure: true }
  ).css,
];
export class IonForm extends HTMLElement implements DynamicFormType {
  private shadow: ShadowRoot;

  private wrapper: HTMLIonContentElement;

  private validationDictionary: ValidationDictionary;

  private changeEventMethod!: CheckFormFunctionResponse;

  constructor() {
    super();

    //initiation of validationDictionary must remain in the constructor otherwise it will not be initialized
    this.validationDictionary = new ValidationDictionary({
      valid: {},
      schemaTemplates: {},
    });
    this.shadow = this.attachShadow({ mode: "open" });
    const parent = document.createElement("ion-app");

    this.wrapper = document.createElement("ion-content");
    parent.appendChild(this.wrapper);
    const allStyles = JSON.parse(JSON.stringify(styles));
    while (allStyles.length) {
      const style: HTMLElement = document.createElement("STYLE");
      const sty: string | undefined = allStyles.shift();
      if (sty) {
        style.innerText = sty;
      }
      this.shadow.append(style);
    }

    this.shadow.appendChild(parent);

    try {
      this.render();
    } catch (err) {
      console.error(err);
    }
  }

  get observedAttributes(): string[] {
    return ["formname", "values"];
  }

  public fieldValidate(
    inputName: string,
    validationFunction: ValidatorFunction
  ): void {
    this.validationDictionary.set(inputName, validationFunction);
  }

  public async createForm(formOptions: GenerateForm): Promise<void> {
    await createForm(formOptions, this);
  }

  async onFormChange(
    submit: CheckFormFunctionResponse
  ): Promise<CheckFormFunctionResponse> {
    return await onFormChange(submit, this);
  }

  private async onValid(state: string, event: Event): Promise<void> {
    await onValid(state, event, this);
  }

  private async staticInputs(
    config: { disabledFelids: string[] },
    labelAndValues: () => Promise<string[][]>
  ): Promise<void> {
    await staticInputs(config, labelAndValues, this);
  }

  private render() {
    this.wrapper.addEventListener("ionChange", async (event: Event) => {
      return await changeEvents(event, this);
    });

    this.wrapper.addEventListener("ionFocus", async (event: Event) => {
      return await click(event, this);
    });
  }

  private disconnectedCallBack() {
    // console.log('disconnected');
  }

  private adoptedCallback() {
    // console.log('moved to a new document');
  }

  private connectedCallback() {
    // Render the initial value 2x times called
    // when this element is placed into the DOM
    const id: string | null = this.getAttribute("formname");
    if (id) {
      formsModule.set(id, this);
    }
  }

  private attributeChangedCallback(
    attrName: string,
    oldVal: string,
    newVal: string
  ) {
    if (attrName === "formname" && oldVal !== newVal) {
      formsModule.delete(oldVal);
      formsModule.set(newVal, this);
    }
  }
}
