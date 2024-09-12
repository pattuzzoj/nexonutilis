import { Show, For } from "solid-js";
import Icon from "components/ui/icon";

function Saved() {
  return (
    <Show fallback={<p class="flex justify-center items-center text-2xl">Your saved items will appear here.</p>}>
      
    </Show>
  )
}

export default Saved;