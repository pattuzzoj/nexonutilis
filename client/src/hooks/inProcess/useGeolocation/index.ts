import { Accessor, Setter, createSignal } from "solid-js";

interface BooleanProps {
  value: boolean;
}

type BooleanReturn = [
  Accessor<boolean>,
  Setter<boolean>,
  utils: {
    toggleBoolean: VoidFunction
  }
]

export default function useBoolean({value}: BooleanProps): BooleanReturn {
  if("geolocation" in navigator) {

  } else {
    
  }
}