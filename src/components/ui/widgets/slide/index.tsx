import { createSignal, JSXElement, For, Index, JSX } from 'solid-js';

interface Props extends JSX.HTMLAttributes<HTMLElement> {
  type: "item" | "list";
  control?: "buttons" | "indicators";
  initialValue?: number;
  loop?: true;
  interval?: number;
  position?: "start" | "center" | "end";
  data?: any;
  children: Array<JSXElement>
}

export default function Slide(props: Props) {
  const [position, setPosition] = createSignal(props.initialValue || 0);
  const [list, setList] = createSignal(props.children);

  const nextPosition = () => {
    if(props.type == "item") {
      setPosition((position() + 1) % list().length);
    } else if(props.type == "list") {
      const items = list().slice();
      const item = items.shift();
      items.push(item);
      setList(items);
    }
  }

  const previousPosition = () => {
    if(props.type == "item") {
      setPosition((position() - 1 + list().length) % list().length);
    } else if(props.type == "list") {
      const items = list().slice();
      const item = items.pop();
      items.unshift(item);
      setList(items);
    }
  }

  (props.loop || !props.control) && setInterval(() => nextPosition(), (props.interval || 2) * 1000);

  return (
    <div class="flex flex-col">
      <div class="flex">
        <Index each={list()}>
          {(item, index) => props.type == "item" ? <div class={`hidden ${position() == index && "!block"}`}>{item()}</div> : <div>{item()}</div>}
        </Index>
      </div>
      <br />
      {
      props.control &&
      <span class={`flex gap-0.5 ${{"start": "justify-start", "center": "justify-center", "end":"justify-end"}[props.position!]}`}>
        {{
          "buttons": (
            <>
            <button class="size-3 p-0.5 text-purple text-xl border-2 border-purple hover:bg-purple hover:text-white rounded-full" onClick={previousPosition}>&lt;</button>
            <button class="size-3 p-0.5 text-purple text-xl border-2 border-purple hover:bg-purple hover:text-white rounded-full" onClick={nextPosition}>&gt;</button>
            </>
          ),
          "indicators": (
            <For each={list()}>
              {(_item, index) => <button class={`size-1 rounded-full border-2 border-purple ${index() == position() && "bg-purple"}`} onClick={() => setPosition(index())}></button>}
            </For>
          )
        }[props.control]}
      </span>
      }
    </div>
  )
}

// import { createSignal, JSXElement, Index, For, JSX, Switch, Match } from  'solid-js';
// import Text from '../../typography/text'

// interface Props extends JSX.HTMLAttributes<HTMLElement> {
//   type: "item" | "list";
//   control?: "buttons" | "indicators";
//   initialValue?: number;
//   loop?: true;
//   interval?: number;
//   position?: "start" | "center" | "end";
//   data?: any;
//   children: Array<JSXElement>
// }

// function ButtonControl(props: any) {
//   return (
//     <span class="flex gap-0.5">
//       <button class="size-3 p-0.5 text-purple text-xl border-2 border-purple hover:bg-purple hover:text-white rounded-full" onClick={props.previous}>&lt;</button>
//       <button class="size-3 p-0.5 text-purple text-xl border-2 border-purple hover:bg-purple hover:text-white rounded-full" onClick={props.next}>&gt;</button>
//     </span>
//   )
// }

// function IndicatorControl(props: any) {
//   return (
//     <span class="flex gap-0.5">
//       <For each={props.list()}>
//         {(_item, index) => <button class={`size-1 rounded-full border-2 border-purple ${index() == props.position() && "bg-purple"}`} onClick={() => props.setPosition(index())}></button>}
//       </For>
//     </span>
//   )
// }

// function ItemSlide(props: Props) {
//   const [position, setPosition] = createSignal(props.initialValue || 0);
//   const [list, _setList] = createSignal(props.children);

//   const previousPosition = () => {setPosition((position() - 1 + list().length) % list().length);}
//   const nextPosition = () => {setPosition((position() + 1) % list().length);}

//   return (
//     <div class="flex flex-col">
//       <div class="flex">
//         <Index each={list()}>
//           {(item, index) => <div class={`hidden ${position() == index && "!block"}`}>{item()}</div>}
//         </Index>
//       </div>
//       <Switch>
//         <Match when={props.control == "buttons"}>
//           <ButtonControl previous={previousPosition} next={nextPosition} />
//         </Match>
//         <Match when={props.control == "indicators"}>
//           <IndicatorControl position={position} setPosition={setPosition}/>
//         </Match>₢
//       </Switch>
//     </div>
//   );
// }

// function ListSlide(props: Props) {
//   const [position, setPosition] = createSignal(props.initialValue || 0);
//   const [index, setIndex] = createSignal(position());
//   const [list, setList] = createSignal(props.children);

//   const previousPosition = () => {
//     const items = list().slice();
//     const item = items.pop();
//     items.unshift(item);
//     setList(items);
//     setPosition((position() - 1 + list().length) % list().length);
//   }
//   const nextPosition = () => {
//     const items = list().slice();
//     const item = items.shift();
//     items.push(item);
//     setList(items);
//     setPosition((position() + 1) % list().length);
//   }

//   return (
//     <div class="flex flex-col">
//       <Text>{props.data[position()].text}</Text>
//       <span class="text-purple">{props.data[position()].author}</span>
//       <Text>{props.data[position()].role}</Text>
//       <br />
//       <div class="flex justify-center">
//         <Index each={list()}>
//           {(item, index) => <div class={`${props.initialValue == index && "scale-150"} ${(index == 1 || index == 3) && "scale-125"}`}>{item()}</div>}
//         </Index>
//       </div>
//       <Switch>
//         <Match when={props.control == "buttons"}>
//           <ButtonControl previous={previousPosition} next={nextPosition} />
//         </Match>
//         <Match when={props.control == "indicators"}>
//           <IndicatorControl list={list} position={position} setPosition={setPosition}/>
//         </Match>
//       </Switch>
//     </div>
//   )
// }

// export default function Slide(props: Props) {
//   return (
//     <Switch>
//       <Match when={props.type == "item"}>
//         <ItemSlide {...props} />
//       </Match>
//       <Match when={props.type == "list"}>
//         <ListSlide {...props} />
//       </Match>
//     </Switch>
//   )
// }