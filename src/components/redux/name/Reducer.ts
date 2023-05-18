const initStore = {
  name: 'zs',
};
export function nameReducer(state = initStore, action) {
  switch (action.type) {
    case 'changeName': {
      return { ...state, name: action.name };
    }
    default: {
      return state;
    }
  }
}
