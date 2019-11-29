import React from 'react';

type SlotContext = {
  requestAddOnRenderer(name: string): () => React.ReactNode | null,
};

export default React.createContext<SlotContext>({
  requestAddOnRenderer: (name) => {
    throw new Error('requestAddOnRenderer() not implemented');
  }
});
