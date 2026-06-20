/// <reference types="vite/client" />

// @fontsource packages resolve to CSS with no type declarations; treat them as
// untyped side-effect modules.
declare module "@fontsource/*";
