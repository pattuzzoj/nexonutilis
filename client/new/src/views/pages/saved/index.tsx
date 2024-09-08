import { Show, For } from "solid-js";
import Icon from "components/ui/icon";

function Saved() {
  return (
    <Show fallback={<div class="w-full h-full flex justify-center items-center text-2xl">Your saved items will appear here.</div>}>
      
    </Show>
  )
}

export default Saved;