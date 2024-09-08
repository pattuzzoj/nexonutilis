import { createSignal } from "solid-js";

interface FormConfig {
  json?: boolean;
  reset?: boolean;
}

type FormSchema = Record<string, {
  use?: string;
  value?: boolean | number | string;
  required?: string;
  range?: [[number, number], string];
  pattern?: [RegExp, string];
  equal?: [string, string];
  custom?: [(field: HTMLInputElement) => boolean, string]
}>;

interface FormEvents {
  onSubmit: (values: FormValues | string) => void;
  onReset?: () => void;
}

type FormReturn = [
  value: Function,
  error: Function,
  utils: {
    handleChange: (e: Event) => void,
    handleSubmit: (e: Event) => void,
  }
]

interface FormValues {
  [key: string]: string;
}

interface FormErrors {
  [key: string]: string;
}

const defaultRules: FormSchema = {
  username: {
    value: "",
    required: "Este campo é necessário",
    range: [[3, 20], "Usuário deve ter entre 3 e 20 caracteres"],
    pattern: [/^[a-z0-9 _-]{3,20}$/, "Usuário deve conter apenas letras minúsculas, números, espaços, ou os caracteres _ e -"],
  },
  email: {
    value: "",
    required: "Este campo é necessário",
    pattern: [/^([a-z0-9_\.\+-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/, "Email inválido"],
  },
  password: {
    value: "",
    required: "Este campo é necessário",
    range: [[8, Infinity], "Senha deve ter pelo menos 8 caracteres"],
    pattern: [
      /(?=(.*[0-9]))(?=.*[\!@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,./?])(?=.*[a-z])(?=(.*[A-Z]))(?=(.*)).{8,}/,
      "Senha deve conter pelo menos um número, uma letra maiúscula, uma letra minúscula, e um caractere especial"
    ],
  },
  url: {
    value: "",
    required: "Este campo é necessário",
    pattern: [
      /(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/,
      "URL inválida"
    ],
  },
  cep: {
    value: "",
    required: "Este campo é necessário",
    pattern: [/^\d{5}[\-]?\d{3}$/, "CEP inválido"],
  },
  cpf: {
    value: "",
    required: "Este campo é necessário",
    pattern: [/^\d{3}\.\d{3}\.\d{3}-\d{2}$|^\d{11}$/, "CPF inválido"],
  },
  cnpj: {
    value: "",
    required: "Este campo é necessário",
    pattern: [/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$|^\d{14}$/, "CNPJ inválido"],
  },
  tel: {
    value: "",
    required: "Este campo é necessário",
    pattern: [/^\(?\d{2}\)?\s?\d{4,5}[\s-]?\d{4}$/, "Telefone inválido"],
  },
  date: {
    value: "",
    required: "Este campo é necessário",
    pattern: [/^\d{2}[\/-]\d{2}[\/-]\d{4}$/, "Data inválida"],
  },
};

function useForm(config: FormConfig, schema: FormSchema, {onSubmit, onReset}: FormEvents): FormReturn {
  const [values, setValues] = createSignal<FormValues>({});
  const [errors, setErrors] = createSignal<FormErrors>({});
  const value = (key: string) => values()?.[key];
  const error = (key: string) => errors()?.[key];

  let schemaRules: FormSchema = {};
  
  (function() {
    Object.entries(schema).forEach(([name, schema]) => {
      if("use" in schema) {
        const presetSchema = defaultRules[schema.use as string];

        if(presetSchema) {
          delete schema.use;
          schemaRules[name] = {...presetSchema, ...schema};
        } else {
        console.error("Invalid rule: ", schema.use);
        }
      } else {
        schemaRules[name] = schema;
      }
    })
  })()

  Object.keys(schemaRules).forEach(key => {
    setValues(prevValues => ({...prevValues, [key]: schemaRules[key].value as string}));
  })

  function handleChange(e: Event) {
    const field = e.target as HTMLInputElement;
    validateField(field);
  }

  function handleSubmit(e: Event) {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const fields = Array.from(form.elements);

    fields.forEach(field => {
      if(field.nodeName !== "BUTTON") {
        validateField(field as HTMLInputElement);
      }
    })

    if(onSubmit && Object.values(errors()).every(errorMessage => Boolean(!errorMessage))) {
      let valuesList;
      
      if("json" in config) {
        valuesList = JSON.stringify(values());
      } else {
        valuesList = values();
      }

      onSubmit(valuesList);

      if(config.reset) {
        resetForm();
        onReset?.();
      }
    }
  }

  function resetForm() {
    setValues({});

    Object.keys(schemaRules).forEach(key => {
      setValues(prevValues => ({...prevValues, [key]: schemaRules[key].value as string}));
    })

    setErrors({});
  }

  function formatValue(type: string, fieldValue: {value: string, checked: boolean}) {
    let value;
    
    switch(type) {
      case "checkbox":
        value = String(fieldValue.checked);
        break;
      default:
        value = fieldValue.value;
    }

    return value;
  }

  function validateField(field: HTMLInputElement) {
    let {type, name, value, checked} = field;
    const rules = schemaRules[name];
    let errorMessage: string = "";

    value = formatValue(
      type,
    {
      value,
      checked
    });

    if(value) {
      if("pattern" in rules) {
        const regex = rules.pattern?.[0];

        if(!regex?.test(value)) {
          errorMessage = rules.pattern?.[1] as string;
        }
      } else if("range" in rules) {
        const min = rules.range?.[0][0] ?? -Infinity;
        const max = rules.range?.[0][1] ?? Infinity;

        if(type == "number") {
          if(!(Number(value) >= min && Number(value) <= max)) {
            errorMessage = rules.range?.[1] as string;
          }
        } else if(typeof(value) == "string") {
          if(!(value.length >= min && value.length <= max)) {
            errorMessage = rules.range?.[1] as string;
          }
        }
      }

      if("equal" in rules) {
        if((value != values()?.[rules.equal?.[0] as string]) || !(value != rules.equal?.[0])) {
          errorMessage = rules.equal?.[1] as string;
        }
      }

      if("custom" in rules) {
        if(!rules.custom?.[0](field)) {
          errorMessage = rules.custom?.[1] as string;
        }
      }
    } else if("required" in rules) {
      errorMessage = rules.required as string;
    }

    const valuesList = values();
    valuesList[name] = value!;
    setValues(valuesList);
    setErrors(prevErrors => ({...prevErrors, [name]: errorMessage}));
  }
  
  return [value, error, {handleChange, handleSubmit}];
}


export default useForm;

// checkbox, radio
// email, password, search, url, text, tel, number
// color,
// date,
// "datetime-local",
// file,
// hidden,
// image,
// month,
// range,
// reset,
// submit,
// time,
// week