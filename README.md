
# IonForm a super lightwieght form component Readme 📝  
This package is under development the api is likely to change.
Stable releases will start with versions equal to or greater than 1.
A working demo is running in index.html
## Get Started 🚀  
### Use the custom ion-form tag anywhere in your code. Make sure to give your form a unique name.
```html
 
 <ion-form formname="myForm"></ion-form>

``` 

## Prebuilt Components/Templates/Form 🔥

## Everything works out of the box. No configuration required.✨
 
Import the package into your Vanilla, Angular, React, or Vue Framework.  

```ts

import { IonForm, ionForm} from 'ion-forms';

const myForm: IonForm = ionForm('myForm');

const stringKeyValuePairs: StringDictionary 

    =  {
    
    "name": 'mazda',
    
    "color": 'purple' 
    
     };

myForm.createForm({ 
    
    jsonForm: stringKeyValuePairs
    
     });

```
Once you're done, that's it. 


## Your field validation is a simple callback that takes the name of your input. 🏈. 
### The callback provides you a fieldState 🤯 
#### the fieldState provides you 💡
##### an updated value of your input ✔️
##### an helper html element ✔️
##### an error html element ✔️
##### the current state of each input ✔️
##### an allValid boolean ✔️
#####  validator methods✔️

## 🚦The fieldValidate function must return a boolean 

```ts
 const stringKeyValuePairs: StringDictionary = 

    { 

    "password": 'mypassword',

     "repeatPassword": ''

    };

myForm.createForm({ jsonForm: stringKeyValuePairs });
   
myForm.fieldValidate('repeatPassword', async (fieldState: FieldValidationResponse): Promise<boolean> => {

  const {
        value, 
       
        validator, 
       
        helper, 
       
        error, 
       
        linkField 
       
        } : 
        {
        
        value: string;
   
        validator: any;
    
        helper?: HTMLIonNoteElement;

        error?: HTMLIonNoteElement;
    
        (fieldName: string) => string;
     
     } = fieldState;

      if(linkField){

      const link = linkField('password');

        if(link === value){

        fieldState.helper.innerText = 'do your thing bro!';

        if (fieldState.value.length > 3) {

            return true;

      }

        fieldState.error.innerText = 'get your password right, you bad password typier!';
     
            return false;

      }

    });

```
we the tuffs we the sutff. We me tough the we stuff stuff. 

# field validation with dynamic helper and error messages

```ts

 myForm.fieldValidate('name', async (fieldState: HTMLIonInputElement |  FieldValidationResponse): Promise<boolean> =>  {

      const { 
          
          value, 
          
          validator, 
          
          helper,
          
          error, 
          
          linkField 
          
          } :
            { 
        value: string; 
         
         validator: any;
         
         helper?: HTMLIonNoteElement;
         
         error?: HTMLIonNoteElement;
         
         (fieldName: string) => string; 
         
            } = fieldState;

      if (validator.isEmail(value)) {

        helper.textContent = 'congrats! your email is now correct';

        return true;

      }

      error.textContent = 'it needs to be an email my friend';
      
      return false;

    });

  ```

# entire form validation 
  #### on valid form changes, the values appear on onFormChange
  #### no updates are propagated on pristine or invalid values 
  #### If a form contains the original values after having been dirtied, the from is reset to its pristine state and no form change is triggered for that input.

```ts

  myForm.onFormChange((formChange: ValidFormResponse): boolean => {
    
    const {changes, event, completeForm, 
    
    states, allValid}: {changes: Map<string, string>;
    
    event: Event;
    
    completeForm: Map<string, string>;
    
    states: Map<string, boolean>;
    
    allValid: boolean;} = formChange;
    
    if(allValid)

    {
    
    // do something;
    
        return true;
    
    }

      return false;
    
    });

```

# generate the HTML schema to accompany the key value pairs  

```ts

const detailedSchema = [

  {name:'first',value:'none',disabled: 'true', type: 'text', tagName: 'input' },

  {name:'last', value:'', disabled: 'true', type: 'text', tagName: 'input' },

  {name:'email', value:'', disabled: 'true', type: 'text', tagName: 'input' },

  {name:'phone', value:'',  disabled: 'true', type: 'text', tagName: 'input' },

  {name:'postcode', value:'', disabled: 'false', type: 'text', tagName: 'input' },

  { name:'housenumber', value:'' disabled: 'false', type: 'text', tagName: 'ion-input' },

  { name:'age', value:'', disabled: 'false', type: 'text', tagName: 'ion-input' },

  {name:'submit',  disabled: 'false', type: 'button', tagName: 'ion-button' }

]

```

# conversely you can specify your validator function in your schemaDictionary  

```ts

const schemaDictionary = {

        first:

          { disabled: 'true', type: 'text', tagName: 'input', validator: function(input: HTMLIonInputElement |  FieldValidationResponse) { 
           
            if(input.value.length){

              return true
            }

            return false;
            
                }
          }
    }

```
 

  # Use your favorite validation tools 🧑‍🔧, and get that validation satisfaction! 😌 
  ### validator.js 💣
  ### password-validator 💣
  
  ### define a custom validation schema 🏗
  ### Check the fieldState hooks/options to see if they are available 🪝 

```ts

const validationSchema = {

    first: async (fieldState: HTMLIonInputElement |  FieldValidationResponse): Promise<boolean> => {
    
        const { value, validator, passwordValidator, helper, error, linkField } = fieldState;
            
        if(value){
            
            const first: string = value;
            
            return first.length > 2 && first.length < 20;
        
        }

         return false;
    },

    username:
     
     async (fieldState: HTMLIonInputElement |  FieldValidationResponse): Promise<boolean> => {
    
        const { value, validator, passwordValidator, helper, error, linkField } = fieldState;
       
        const first: string = value;
       
        return first.length > 2 && first.length < 20;
    },

    last: (fieldState: HTMLIonInputElement |  FieldValidationResponse): boolean => {
        
        const { value, validator, passwordValidator, helper, error, linkField } = fieldState;

        const last: string = fieldValue.value;
        
        return last.length > 2 && last.length < 20;

    },

    email: (fieldState: HTMLIonInputElement |  FieldValidationResponse): boolean => {
        
        const { value, validator, passwordValidator, helper, error, linkField } = fieldState;
        
        const email: string = value;
        
        return validator.isEmail(email);

    },

    age: (fieldState: HTMLIonInputElement |  FieldValidationResponse): boolean => {
      
      const { value, validator, passwordValidator, helper, error, linkField } = fieldState;
      
      const age: number = +value;
    
      return age >= 18;
    },

    postcode: (fieldState: HTMLIonInputElement |  FieldValidationResponse): boolean => {
      
       const { value, validator, passwordValidator, helper, error, linkField } = fieldState;
      
        const zip: string = value;
      
        const validZipTest = /(^\d{5}$)|(^\d{5}-\d{4}$)/;
      
        return validZipTest.test(zip);
    },

    state: (fieldState: HTMLIonInputElement |  FieldValidationResponse): boolean => {
      
        const { value, validator, passwordValidator, helper, error, linkField } = fieldState;
      
        const state: string = value;
      
        return state.length > 1;
    },

    city: (fieldState: HTMLIonInputElement |  FieldValidationResponse): boolean => {
        
        const { value, validator, passwordValidator, helper, error, linkField } = fieldState;
        
        const city = value;
        
        const rgx = /(^[a-zA-Z',.\s-]{1,25}$)/;
        
        return rgx.test(city);

    },

    housenumber: (fieldState: HTMLIonInputElement |  FieldValidationResponse): boolean => {
    
        const { value, validator, passwordValidator, helper, error, linkField } = fieldState;
    
        const nums = value;
    
        return nums.length && !isNaN(+nums);

    },
    
    password: (fieldState: HTMLIonInputElement |  FieldValidationResponse): boolean => {
        
        const { value, validator, passwordValidator, helper, error, linkField } = fieldState;
        
        const password = fieldValue.value;
        
        if(passwordValidator){
        
            const schema = new passwordValidator();
        
            schema
            .is().min(8)                                    // Minimum length 8
            .is().max(100)                                  // Maximum length 100
            .has().uppercase()                              // Must have uppercase letters
            .has().lowercase()                              // Must have lowercase letters
            .has().digits(2)                                // Must have at least 2 digits
            .has().not().spaces()                           // Should not have spaces
            .is().not().oneOf(['Passw0rd', 'Password123']);
        
            return schema.validate(password)
        
            }

        return false;
      
      },

    upc: (fieldState: HTMLIonInputElement |  FieldValidationResponse): boolean => {
     
        const { value, validator, passwordValidator, helper, error, linkField } = fieldState;
        
        return validateUPC(value);
    },

    repeatpassword: (fieldState: HTMLIonInputElement |  FieldValidationResponse): boolean => {
    
        const { value, validator, passwordValidator, helper, error, linkField } = fieldState;
    
        const repeatedValue = value;
        
        const originalValue = fieldValue.shadowRoot.querySelector('[name="password"]')

        return originalValue === repeatedValue;
    },

    phone: async (fieldState: HTMLIonInputElement |  FieldValidationResponse): Promise<boolean> => {
       
       const { value, validator, passwordValidator, helper, error, linkField } = fieldState;
       
        const phone = value;
       
        return validator.isMobilePhone(phone, 'en-US');
    
    },

};

 const detailedSchema = [

        { name: 'first', value: 'Pillsbury', type: 'text', tagName: 'input', validator: validationSchema.first },


        { name: 'last', value: 'Doughboy', disabled: 'true', type: 'text', tagName: 'input', helper: 'enter your last name', validator: validationSchema.last },


        { name: 'email', value: 'Eat@it.com', disabled: 'false', type: 'text', helper: 'enter your email', tagName: 'input', validator: validationSchema.email },


        { name: 'phone', value: '9494548213', disabled: 'true', type: 'text', tagName: 'input', validator: validationSchema.phone },


        { name: 'age', value: '55', disabled: 'false', type: 'text', tagName: 'ion-input', validator: validationSchema.age },


        { name: 'postcode', value: '', disabled: 'false', type: 'text', tagName: 'input', validator: validationSchema.name },


        { name: 'city', disabled: 'false', type: 'text', tagName: 'ion-input', value: 'city', validator: validationSchema.city }

      ];

      form2.createForm({ detailedSchema: detailedSchema })

```