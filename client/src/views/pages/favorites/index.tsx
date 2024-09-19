import { Show, For } from "solid-js";
import { useIndexedDB } from "context/IndexedDB";
import ResourceCard from "components/ui/cards/resourceCard";

function Favorites() {
  const [useStore] = useIndexedDB();
  const [favoriteData] = useStore("favorite");

  return (
    <Show when={favoriteData()?.length} fallback={<p class="flex justify-center items-center text-2xl">Your favorite items will appear here.</p>}>
      <div class="h-max grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        <For each={favoriteData()}>
          {(item) => <ResourceCard {...item} favorite/>}
        </For>
      </div>
    </Show>
  )
}

export default Favorites;