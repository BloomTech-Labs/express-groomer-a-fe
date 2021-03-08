Object.defineProperty(window, 'backingStorePixelRatio', {
  value: () => ({
    getPropertyValue: prop => {
      return '';
    },
  }),

  "transform": { "^.+\\.(ts|tsx|js|jsx)?$": "ts-jest" },
});
