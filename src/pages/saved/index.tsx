import { Title, Text } from "components/typography";
import { For, Show } from "solid-js";
import Icon from "components/icon";
import useSaved from "hooks/useSaved";
import useSwitch from "hooks/useSwitch";


export default function Saved() {
  const [savedList, _addSaved, removeSaved] = useSaved();

  const [copyNotification, setCopyNotification] = useSwitch("");
  
  const copy = (url: string) => {
    navigator.clipboard.writeText(url);
    
    setCopyNotification(url);
    
    setTimeout(() => setCopyNotification(""), 1000);
  }

  return (
    <div class="w-full md:w-5/6 grid md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-8">
      <Show when={JSON.parse(savedList()).length} fallback={<div class="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">Your saved items will appear here.</div>}>
        <For each={JSON.parse(savedList())}>
          {(item) => (
            <div class="flex flex-col justify-center items-center gap-6 w-full h-full rounded-2xl p-4 border-2 border-dark hover:border-purple dark:bg-gray-700/20">
              <span class="flex justify-between w-full">
                <Title as="6">
                  {item.title}
                </Title>
                <button class="group" onClick={() => removeSaved(item.url)}>
                  <Icon name="BsBookmarkCheckFill" class="size-6 group-hover:hidden"/>
                  <Icon name="BsBookmarkDash" class="size-6 hidden group-hover:block"/>
                </button>
              </span>
              <Text class="text-justify">{item.description}</Text>
              <span class="flex gap-6 w-full">
                <button onClick={() => copy(item.url)} class="w-6/12 flex justify-center items-center gap-2 rounded-lg p-2 text-black bg-white">{(copyNotification() == item.url)? <>Copied Successfully <Icon name="BiSolidCopy" class="text-purple size-4"/></> : <>Copy<Icon name="OcCopy2" class="hover:text-purple size-4"/></>}</button>
                <a class="w-6/12 flex justify-center items-center gap-2 rounded-lg p-2 text-white bg-purple" target="_blank" href={item.url}>Access <Icon name="OcLinkexternal2" class="hover:text-purple size-4"/></a>
              </span>
            </div>
          )}
        </For>
      </Show>
    </div>
  );
}
