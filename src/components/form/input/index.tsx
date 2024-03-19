import { JSX, createSignal, Show } from 'solid-js';
import Icon from '../../ui/icon';

interface Props extends JSX.InputHTMLAttributes<HTMLInputElement> {}

export default function Input(props: Props) {
  const [isVisible, setIsVisible] = createSignal(false);

  return (
    <div class="relative">
      <input 
      {...props}
      type={props.type == "password" ? (isVisible() ? "text" : "password") : props.type}
      class={`${isVisible() && "pr-3"} w-100 outline-none border-2 rounded-lg border-gray-400 focus:border-purple p-0.5 placeholder-transparent caret-purple text-black peer`}
      />

      <label 
      class="
      absolute -top-50 peer-placeholder-shown:top-50 peer-placeholder-shown:-translate-y-50 left-0 peer-placeholder-shown:left-0.75 scale-90 peer-placeholder-shown:scale-100 text-black dark:text-white peer-placeholder-shown:text-black transition-all"
      for={props.id}>{props.placeholder}</label>
      {props.children}

      <Show when={props.type == "password"}>
        <button class="absolute top-50 -translate-y-50 right-1" onClick={() => setIsVisible(!isVisible())}>
          <Show when={isVisible()} fallback={<Icon name="AiFillEyeInvisible" color="size-1.5 fill-purple" />}>
            <Icon name="AiFillEye" color="size-1.5 fill-purple" />
          </Show>
        </button>
      </Show>
    </div>
  );
}
