const initStore = {
  age: 11,
};
export function ageReducer(state = initStore, action) {
  switch (action.type) {
    case "changeAge": {
      return { ...state, age: action.age };
    }
    default: {
      return state;
    }
  }
}
