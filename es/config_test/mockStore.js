import configureMockStore from 'redux-mock-store';

const mockStore = (state) => {
  const mockStore = configureMockStore();
  const store = mockStore(state);
  return store;
};

export default mockStore;

