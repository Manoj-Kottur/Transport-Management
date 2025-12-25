import 'jest-preset-angular/setup-jest';

Object.defineProperty(globalThis, 'structuredClone', {
  writable: true,
  value: (obj: any) => JSON.parse(JSON.stringify(obj)),
});
