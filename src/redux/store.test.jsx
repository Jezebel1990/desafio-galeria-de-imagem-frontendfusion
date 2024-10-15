import { configureStore } from '@reduxjs/toolkit';
import imagesReducer from './slices/imagesSlice';
import { store } from './store';

describe('Redux Store', () => {
  it('deve ter o reducer de imagens configurado', () => {
  
    const testStore = configureStore({
      reducer: {
        images: imagesReducer,
      },
    });

    // Verifica se a store original está configurada corretamente
    expect(store.getState().images).toEqual(testStore.getState().images);
  });
});