// import { createForm, email, minLength, required, pattern } from '@modular-forms/solid';

// type LoginForm = {
//   email: string;
//   password: string;
// };

// export default function Form(props) {
//   const [loginForm, { Form, Field }] = createForm<LoginForm>();
  
//   return (
//     <Form>
//       <Field
//         name="email"
//         validate={[
//           required('Please enter your email.'),
//           pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "O email precisa seguir o padrão: 'exemplo@dominio.com'")
//         ]}
//       >
//         {(field, props) => (
//           <>
//             <input {...props} type="email" required />
//             {field.error && <div>{field.error}</div>}
//           </>
//         )}
//       </Field>
//       <Field
//         name="password"
//         validate={[
//           required('Please enter your password.'),
//           minLength(8, 'You password must have 8 characters or more.'),
//         ]}
//       >
//         {(field, props) => (
//           <>
//             <input {...props} type="password" required />
//             {field.error && <div>{field.error}</div>}
//           </>
//         )}
//       </Field>
//       <button type="submit">Login</button>
//     </Form>
//   );
// }