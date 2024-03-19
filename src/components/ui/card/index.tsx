// import { JSX, lazy, splitProps } from 'solid-js';

// interface CardProps extends JSX.HTMLAttributes<HTMLElement> {
//   type: "" | "";
// }

// export default function Card(props: CardProps) {
//   const [card, attrs] = splitProps(props, ["type"])

//   let CardComponent;

//   switch (card.type) {
//     case "":
//       CardComponent = lazy(() => import("./"));
//       break;
//     case "":
//       CardComponent = lazy(() => import("./"));
//       break;
//   }

//   return <CardComponent {...attrs}>{attrs.children}</CardComponent>
// }