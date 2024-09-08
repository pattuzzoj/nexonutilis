import { createSignal } from "solid-js";

const defaultValidationRules: any = {
  username: {
    regex: /^[a-z0-9 _-]{3,20}$/,
    required: "Este campo é necessário",
    error: "Usuário deve ter 3 a 20 caracteres"
  },
  email: {
    regex: /^([a-z0-9_\.\+-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,
    required: "Este campo é necessário",
    error: "Email inválido"
  },
  password: {
    regex: /(?=(.*[0-9]))(?=.*[\!@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,./?])(?=.*[a-z])(?=(.*[A-Z]))(?=(.*)).{8,}/,
    required: "Este campo é necessário",
    error: "Senha deve ter 8 caracteres, incluindo maiúsculas, minúsculas, números e especiais"
  },
  url: {
    regex: /(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/,
    required: "Este campo é necessário",
    error: "URL inválida"
  },
  cep: {
    regex: /^\d{5}[\-]?\d{3}$/,
    required: "Este campo é necessário",
    error: "CEP inválido"
  },
  CPF: {
    regex: /^\d{3}\.\d{3}\.\d{3}-\d{2}$|^\d{11}$/,
    required: "Este campo é necessário",
    error: "CPF inválido"
  },
  CNPJ: {
    regex: /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$|^\d{14}$/,
    required: "Este campo é necessário",
    error: "CNPJ inválido"
  }, 
};

type ValidationRules = Record<string, {
  value?: undefined | boolean | number | string;
  regex?: RegExp;
  required?: string;
  error?: string;
  test?: (value: string) => boolean;
}>

interface FormValues {
  [key: string]: string | number;
}

interface FormErrors {
  [key: string]: string;
}

interface FormProps {
  initialValues: FormValues;
  validationRules?: ValidationRules;
  required?: boolean;
}

type FormReturn = [
  value: Function,
  error: Function,
  utils: {
    handleChange: (e: Event) => void,
    handleSubmit: (e: Event) => void
  }
]

export default function useForm({initialValues, validationRules, required}: FormProps): FormReturn {
  const [valuesList, setValuesList] = createSignal<FormValues>(initialValues);
  const [errorsList, setErrorsList] = createSignal<FormErrors>({});
  const value = (key: string) => valuesList()[key];
  const error = (key: string) => errorsList()[key];

  if (validationRules) {
    Object.keys(validationRules).forEach(key => {
      const defaultValidationRule = defaultValidationRules[key];

      Object.entries(validationRules[key]).forEach(([key, value]) => {
        defaultValidationRule[key] = value;
      })
    })
  }

  const handleChange = (e: Event) => {
    const target = e.target as HTMLInputElement;
    const { name, value } = target;
    
    setValuesList(prevValues => ({ ...prevValues, [name]: value }));
    validateField(target);
  };

  const validateField = (field: HTMLInputElement ) => {
    let { name, type, checked, value } = field;

    if(type == "checkbox") {
      value = String(checked);
    }

    let errorMessage = "";

    if("value" in defaultValidationRules[name]) {
      if(!value == defaultValidationRules[name].value) {
        errorMessage = defaultValidationRules[name].required;
      }
    } else {

    }

    if(value) {
      if (defaultValidationRules[name].regex.test(String(value))) {
        if (value && defaultValidationRules[name].test) {
          if (defaultValidationRules[name].regex.test(String(value)) && !defaultValidationRules[name].test!(String(value))) {
            errorMessage = defaultValidationRules[name].error;
          }
        }
      } else {
        errorMessage = defaultValidationRules[name].error;
      }
    } else {
      if(required) {
        errorMessage = defaultValidationRules[name].required;
      }
    }

    setErrorsList(prevErrors => ({ ...prevErrors, [name]: errorMessage }));
  };

  const handleSubmit = (e: Event) => {
    e.preventDefault();
  
    const target = e.target as HTMLFormElement;
    const elements = Array.from(target.elements);
  
    elements.forEach(element => {
      if (element.nodeName !== "BUTTON") {
        validateField(element as HTMLInputElement);
      }
    });
  };
  
  return [value, error, { handleChange, handleSubmit, }];
}