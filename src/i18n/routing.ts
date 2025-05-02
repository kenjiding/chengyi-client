import { locales, defaultLocale } from './config';
import {defineRouting} from 'next-intl/routing';
import {createNavigation} from 'next-intl/navigation';

export const routing = defineRouting({
  // A list of all locales that are supported
  locales,
  // Used when no locale matches
  defaultLocale,
  localePrefix: 'always'
});

export const {Link, redirect, usePathname, useRouter, getPathname} = createNavigation(routing);