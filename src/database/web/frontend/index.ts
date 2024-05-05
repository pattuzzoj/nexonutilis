import { Category } from 'models/category';
import { react } from './react';
import { angular } from './angular';
import { preact } from './preact';
import { solidjs } from './solidjs';
import { svelte } from './svelte';
import { vue } from './vue';

export const frontend = new Category({
  title: "Front-End",
  description: "Discover step-by-step guides on using Kotlin or Java to build Android applications. These tutorials include using Android Studio, managing app data, integrating Google services, and crafting responsive designs with Material Design.",
  icon: "FaSolidLaptopCode"
}, [angular, preact, react, solidjs, svelte, vue]);