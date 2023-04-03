// @ts-nocheck
// import { validationSchema } from '../services/validationSchema';
/* eslint-disable max-len */
/* eslint-disable no-debugger */
/* eslint-disable no-underscore-dangle */

/* eslint-disable */
// import { validationSchema } from '../services/validationSchema';
import { format, utcToZonedTime } from 'date-fns-tz';
import {
  MyIonicComponents, DynamicFormFunction,
} from "./types/types";
import themeVariables from "./variables.css?inline";
import {
  ArraySchema, DefineFormSchemaDictionary, DefineValidationSchemaDictionary,
  GenerateForm, IonInputFields, ValidatorFunction,
  StringDictionary, DefineIonInputSchemaDictionary, FieldValidationFunction, IonInputAttributes,
  TagOption, TagOptions, CheckFormFunctionResponse, CheckFormResponse, FormGeneratorComponent, ValidationSchema
} from './types/forms';

import { IonForm } from './dynamicForm';

import ValidationDictionary from './validationDictionary';

import { generate, isIonInputElement } from './templateEngine';

import { ValidationDictionaryType } from "./types/types";
import ValidationDictionary from './validationDictionary';
import ValidationDictionary from './validationDictionary';


export const formsModule: Map<string, IonForm> = new Map();


export function ionForm(formname: string): IonForm | Error | undefined {

  if (formsModule.has(formname)) {

    return formsModule.get(formname);

  }

  throw Error('no form by the name of ' + formname);

};

export const formsSchemaDictionary: DefineFormSchemaDictionary = {};

export const validationsSchemaDictionary: DefineValidationSchemaDictionary = {};

export const schemaDictionaryDictionary: DefineIonInputSchemaDictionary = {};

export const stringTrueFalse = (value: string): boolean => {

  value = value.toLowerCase();

  let result: boolean;

  switch (value) {
    case 'false':
      result = false;
      break;
    case 'true':
      result = true;
      break;
    default:
      result = false;
  }

  return result;

};

export const conformingSchema = (keyValueStore: StringDictionary, schemaName: string | IonInputFields): TagOptions[] => {

  if (schemaName.constructor === String && !schemaDictionaryDictionary[schemaName]) {

    throw Error(schemaName + ' no such form schema defined');

  }

  let schema: IonInputFields;

  if (schemaName.constructor === String) {

    schema = schemaDictionaryDictionary[schemaName] as IonInputFields;

  } else if (schemaName.constructor === Object) {

    schema = schemaName as IonInputFields;

  }

  const form: TagOptions[] = [];

  const dataStore: [string, string][] = Object.entries(keyValueStore);

  const keyValuePairs: [string, IonInputAttributes][] = Object.entries(schema);

  if (schema) {

    for (const [name, value] of dataStore) {

      if (!schema[name]) {

        keyValuePairs.push([name, { name, value, tagName: 'ion-input' }]);

      }

    }

    while (keyValuePairs.length) {

      const [name, value] = keyValuePairs.shift();


      const element = { value: keyValueStore[name], name };

      const tag: TagOptions =

        Object.assign(element, schema[name]

          ||

          { type: 'text', tagName: 'ion-input' });

      form.push(tag);

    }

  }

  return form;

};

export const nonConformingSchema = (keyValueStore: StringDictionary):

  TagOptions[] => {

  const form: TagOptions[] = [];

  const keyValuePairs = Object.entries(keyValueStore);

  while (keyValuePairs.length) {

    const [name, value] = keyValuePairs.shift();

    const tagName: TagOptions['tagName'] = 'ion-input';

    const element = { value: keyValueStore[name], name, type: 'text', tagName };

    const tag: TagOptions = element;

    form.push(tag);

  }

  return form;

};





export class Tag {

  private parentElement: HTMLElement | MyIonicComponents.HTMLIonCardContentElement;
  disabled?: string;
  tagName: string;
  type?: null | string = 'text';
  position?: string;
  label?: string;
  helper?: string;
  error?: string;
  name: string;
  value?: string;
  labelText?: string;
  validator?: FieldValidationFunction;
  constructor(
    {
      name = '', value = '', tagName = 'ion-input', labelText = '', presentation = '',
      disabled = 'false', helper = '', error = '', min = '', max = '', local = null, hourCycle = null, dayValues = null, minuteValues = null,
      position = 'floating', type = 'text', parentElement, validation = null , validator = null }: TagOptions, validationDictionary: ValidationDictionaryType) {
    this.tagName = tagName;
    this.name = name;
    this.value = value;
    this.labelText = labelText;
    this.disabled = disabled;
    this.position = position;
    this.type = type;

    if (validation || validator) {

      const validate = validation || validator
      
      validationDictionary.set(name, validate);

    } else {

      validationDictionary.set(name, () => true)

    }

    if (!labelText) {

      labelText = name;

    }

    if (tagName === 'ion-input' || tagName === 'input' || tagName === 'ion-textarea' || tagName === 'textarea') {

      tagName = 'ion-input';

      if (value.length > 40) {

        tagName = 'ion-textarea';

      };

      let schemaDictionary: ArraySchema;

      if (stringTrueFalse(disabled)) {

        schemaDictionary = [
          ['ion-item', [
            ['ion-label', [
              ['innerText', labelText || name],
              ['position', 'floating']
            ]],
            [tagName, [
              ['name', name],
              ['type', type],
              ['value', value],
              ['debouce', '300'],
              ['disabled', disabled],
              ['autoGrow', 'true']
            ]]
          ]]
        ];
      } else {


        schemaDictionary = [
          ['ion-item', [
            ['ion-label', [
              ['innerText', labelText || name],
              ['position', 'floating']
            ]],
            [tagName, [
              ['name', name],
              ['type', type],
              ['value', value],
              ['disabled', disabled],
              ['debounce', '300'],
              ['autoGrow', 'true']
            ]],
            ['ion-note', [
              ['slot', 'helper'],
              ['innerText', helper]
            ]],
            ['ion-note', [
              ['slot', 'error'],
              ['innerText', error]
            ]],
            ['name', name]]]
        ];
      };
      const html: any | MyIonicComponents.HTMLIonItemElement = generate(schemaDictionary, validationDictionary);

      parentElement.appendChild(html);

    }


    if (tagName === 'ion-button' || tagName === 'button') {
      tagName = 'ion-button';
      this.type = null;
      this.helper = '';
      this.error = '';

      const schema: ArraySchema = [

        ['ion-item', [

          ['ion-buttons', [

            ['ion-button',

              [

                ['ion-icon', [

                  ['slot', 'start'],

                  ['name', 'star']

                ]

                ],

                ['type', 'button'],

                ['color', 'primary'],

                ['innerText', labelText],

                ['name', labelText],

                ['fill', 'outline']

              ],

            ],

            ['slot', 'end']

          ]

          ],
          ['name', name]

        ]

        ]
      ];

      const html: any | MyIonicComponents.HTMLIonItemElement = generate(schema, validationDictionary);

      parentElement.appendChild(html);

    }

    if (tagName === 'ion-checkbox' || tagName === 'checkbox') {

      tagName = 'ion-checkbox';

      const schema = [

        ['ion-item', [

          ['ion-checkbox', [

            ['slot', 'start'],
            ['name', name]
          ]

          ],
          ['ion-label', [

            ['innerText', labelText]

          ]
          ]
        ],
          ['name', name]
        ]
      ];

      const html: any | MyIonicComponents.HTMLIonItemElement = generate(schema, validationDictionary);

      parentElement.appendChild(html);

    };

    if (tagName === 'ion-datetime' || tagName === 'datetime') {

      tagName = 'ion-datetime';
      const schema: ArraySchema = [

        ['ion-item', [
          ['style', [
            ['innerText', themeVariables],
            // ['position', 'floating']
          ]
          ],
          ['name', name],
          ['fill', 'solid'],



          ['ion-datetime', [

            // ['id', 'datetime'],
            ['color', 'rose'],
            ['doneText', 'done'],
            ['value', value],
            //  ['min', min],
            // ['max', max],
            //['minuteValues',minuteValues],
            // ['dayValues', dayValues],
            ['local', local],
            //  ['hourCycle', hourCycle],
            ['span', [

              ['slot', 'title'],

              ['innerText', labelText],


            ]

            ],
            ['name', name],
            ['datetime', 'datetime'],
            ['presentation', presentation || 'date-time']
          ],


          ], ['ion-note', [
            ['slot', 'helper'],
            ['innerText', helper]
          ]],
          ['ion-note', [
            ['slot', 'error'],
            ['innerText', error]
          ]]

        ],
        ],
      ];

      const html: any | MyIonicComponents.HTMLIonDatetimeElement = generate(schema, validationDictionary);
      parentElement.appendChild(html);
    }
  };
}





export const createParentContainer: FormGeneratorComponent = (tagOptions: TagOptions[], validationDictionary: ValidationDictionaryType) => {

  const fragment = new DocumentFragment();

  // const ionContent = document.createElement('div');

  for (const tagOption of tagOptions) {

    tagOption.parentElement = fragment;

    const tag = new Tag(tagOption, validationDictionary);

  };

  //ionContent.appendChild(fragment);

  //const htmlContent: HTMLElement | MyIonicComponents.HTMLIonContentElement = ionContent;

  return fragment;

};


export const setValidationSchema = ({ name, validationSchema }: ValidationSchema, validationDictionary: ValidationDictionaryType) => {

  validationsSchemaDictionary[name] = validationSchema;

  Object.entries(validationSchema).forEach(([inputName, validator]: [string, ValidatorFunction]) => validationDictionary.set(inputName, validator));

};

export const setHTMLInputSchema = ({ schemaTemplateName, schemaDictionary }: GenerateForm['defineInputSchema'], validationDictionary: ValidationDictionaryType) => {

  schemaDictionaryDictionary[schemaTemplateName] = schemaDictionary;

};


export const setFormSchema = ({ schemaTemplateName, formSchema }: GenerateForm['defineFormSchema']) => {

  formsSchemaDictionary[schemaTemplateName] = formSchema;

};


export const setTagOptionsArray = (stringDictionary, schemaDictionary?): TagOptions[] => {
  if (schemaDictionary) {

    return conformingSchema(stringDictionary, schemaDictionary);

  } else {

    return nonConformingSchema(stringDictionary);

  }

};


function checkIfStringDictionary(dic: any): boolean {

  dic = JSON.parse(JSON.stringify(dic));
  if (dic.constructor === String) {
    return false;
  }
  for (const key in dic) {
    if (dic[key].constructor === String) {
      continue;
    }
    return false;
  }

  return true;

}


export const createForm = async ({ jsonForm, detailedSchema, defineFormSchema, defineInputSchema, schemaDictionary,
  defineValidationSchema, useValidationSchema }: GenerateForm, formObject: IonForm): Promise<void> => {

  let tags: TagOptions[] = detailedSchema || [];

  const validationDic = formObject.validationDictionary;

  let stringDictionary: StringDictionary = {};

  let dataTemplateName: string;


  if (defineFormSchema) {

    setFormSchema(defineFormSchema);

  }

  if (defineInputSchema) {

    schemaDictionary = defineInputSchema.schemaTemplateName;

    setHTMLInputSchema(defineInputSchema, validationDic);

  }

  if (defineValidationSchema) {

    setValidationSchema(defineValidationSchema, validationDic);

  }


  // if(useValidationSchema) {

  // validationDic[useValidationSchema] = validationDic;


  // }



  if (jsonForm && jsonForm !== undefined && jsonForm !== 'undefined' && (jsonForm.constructor === Object || jsonForm.constructor === String)) {

    dataTemplateName = jsonForm as string;

    const formData: StringDictionary = formsSchemaDictionary[dataTemplateName];


    if (formData) {

      stringDictionary = formData;


    } else if (!checkIfStringDictionary(jsonForm)) {

      stringDictionary = {};

      console.error('no form data by the name of ' + jsonForm);

    }

    if (schemaDictionary) {

      tags = setTagOptionsArray(stringDictionary, schemaDictionary);

    } else {

      tags = setTagOptionsArray(jsonForm, false)
    }

  }



  tags.forEach(async (tag: TagOption) => {

    let validationInputType: string = tag.tagName;

    if (tag.tagName.includes('-')) {

      validationInputType = tag.tagName.split('-').pop().trim();

    }

  });

  const contentContainer: MyIonicComponents.HTMLIonCardContentElement | HTMLElement = createParentContainer(tags, validationDic);

  formObject.wrapper.appendChild(contentContainer);

}
let buttonState = 0;

function buttonStatus(event: Event | boolean, ionButton: HTMLIonButtonElement, formObject: IonForm, eventName: string) {






  switch (ionButton.classList.contains('ion-invalid') || ionButton.getAttribute('color') === '' || eventName === 'ionFocus' || eventName === 'ionChange') {
    case true:



      const { missing, allValid }: { missing: string[], allValid: boolean } = formObject.validationDictionary.allValidFields();


      const isValid = formObject.validationDictionary.checkForm(event, formObject);


      const names = isValid.states;

      switch (Boolean(isValid.changes.size && allValid)) {

        case true:

          ionButton.disabled = false;
          ionButton.setAttribute('color', 'primary');
          ionButton.classList.add('ion-valid');
          ionButton.innerText = 'Submit';
          break;

        case false:

          ionButton.disabled = true;
          ionButton.setAttribute('color', 'warning');
          ionButton.innerText = 'Submit';

          ionButton.classList.add('ion-invalid')

          ionButton.setAttribute('color', 'warning');
          click
          const items: HTMLIonItems = Array.from(formObject.shadowRoot.querySelectorAll(missing.map(nameAttr => `ion-item[name="${nameAttr}"]`).join(',')));
          items.forEach(htmlIonItem => {

            htmlIonItem.classList.add('ion-touched');
            htmlIonItem.classList.add('ion-invalid');

          });

          break;
      };
      break;
    case false:

      ionButton.setAttribute('color', 'primary');
      ionButton.disabled = false;
      // ionButton.classList.remove('ion-invalid')
      ionButton.classList.add('ion-valid');
      ionButton.innerText = 'Submit';
      if (eventName === 'ionFocus') {
        // const isValid = formObject.validationDictionary.checkForm(event)
        formObject.onValid('click', event);

      }
      break;

  }



}



const validButton = (eventName: string, event: Event | boolean, button: HTMLIonButtonElement | null, formObject: IonForm): void => {

  const ionButton = button || formObject.shadowRoot.querySelector('ion-button');

  if (ionButton) {

    buttonStatus(event, ionButton, formObject, eventName)

  }
}

export const changeEvents = async (event: Event, formObject: IonForm): Promise<boolean> => {

  const el: any = event.target;


  if (event.target instanceof HTMLElement && event.detail && event.detail.value) {

    const ionInput: any = event.target;

    const name: string = ionInput.name;

    const value = event.detail.value.trim();

    const ionItemHTMLElement: MyIonicComponents.HTMLIonItemElement = ionInput.closest('ion-item');

    const isValid = await formObject.validationDictionary.checkFieldValidity(name, value, ionItemHTMLElement);


    if (ionItemHTMLElement instanceof HTMLElement && ionItemHTMLElement.tagName === 'ION-ITEM') {



      if (!ionItemHTMLElement.classList.contains('ion-touched')) {

        ionItemHTMLElement.classList.add('ion-touched');

      }

      ionItemHTMLElement.classList.remove('ion-valid');

      ionItemHTMLElement.classList.remove('ion-invalid');

      if (isValid) {

        formObject.onValid('click', event);

        ionItemHTMLElement.classList.add('ion-valid');

      } else {

        ionItemHTMLElement.classList.add('ion-invalid');

      };

      validButton('ionChange', false, null, formObject);

    }

    return true;
  }

  return false;

}







export const click = async (event: Event, formObject: IonForm): boolean => {


  const target: any = event.target;


  if (event.target instanceof HTMLElement && (event.target.tagName === 'ION-BUTTON')) {

    const ionButton: any = event.target;

    validButton('ionFocus', event, ionButton, formObject)

    return true;

  }

  return true;

}

export const onValid = async (state: string, event: Event, formObject: IonForm): Promise<void> => {

  if (formObject.changeEventMethod) {

    const response: CheckFormResponse = formObject.validationDictionary.checkForm(event, formObject);

    const changeEvent = await formObject.changeEventMethod(response);

    formObject.validationDictionary.updateValues(changeEvent);

  }

}

export const staticInputs = async (config: { disabledFelids: string[] }, labelAndValues: () => Promise<string[][]>, formObject: IonForm): Promise<void> => {

  const ionInputs = Array.from(formObject.wrapper.querySelectorAll('ion-input'));

  const formValues = await labelAndValues();

  const ionInputElements = ionInputs.slice();

  const ionicDic = {};

  while (ionInputElements.length) {

    const value: any = ionInputElements.pop();

    ionicDic['input:' + value.name] = value;

  }

  config.disabledFelids.forEach(field => {

    if (ionicDic[field]) {

      const ionItem = ionicDic[field].closest('ion-item');

      ionItem.setAttribute('disabled', 'true');

      Array.from(ionItem.querySelectorAll('ion-note')).map((val: HTMLElement) => val.style.display = 'none');

    }

  });

  formValues.forEach(([key, value]) => {

    if (ionicDic[key]) {

      const input = ionicDic[key];

      input.value = value;

    }

  });

};


export const onFormChange = async (submit: CheckFormFunctionResponse, formObject: IonForm): Promise<CheckFormFunctionResponse> => {

  if (submit) {

    formObject.changeEventMethod = submit;

    return formObject.changeEventMethod;
  }

}






