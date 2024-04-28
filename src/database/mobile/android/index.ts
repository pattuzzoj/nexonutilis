import { Category } from 'models/category';
import { kotlin } from './kotlin';
import { java } from './java';

export const android = new Category({
  title: "Android",
  description: "Discover step-by-step guides on using Kotlin or Java to build Android applications. These tutorials include using Android Studio, managing app data, integrating Google services, and crafting responsive designs with Material Design.",
  icon: "AiOutlineAndroid"
}, [java, kotlin]);