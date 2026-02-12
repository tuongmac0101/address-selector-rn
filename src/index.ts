// Reexport the native module. On web, it will be resolved to AddressSelectorRnModule.web.ts
// and on native platforms to AddressSelectorRnModule.ts
export { default } from './AddressSelectorRnModule';
export { default as AddressSelectorRnView } from './AddressSelectorRnView';
export * from  './AddressSelectorRn.types';
