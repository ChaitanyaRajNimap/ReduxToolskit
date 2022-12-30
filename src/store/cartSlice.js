const { createSlice } = require("@reduxjs/toolkit");

// for creating slice  (slice => storing app data into small pieces)
const cartSlice = createSlice({
  name: "cart", //name of slice
  initialState: [], //initial state
  reducers: {
    //function to mutate state in app
    add(state, action) {
      // mutating state
      state.push(action.payload);
    },
    remove(state, action) {
      return state.filter((item) => item.id !== action.payload); //returning new state
    },
  },
});

export const { add, remove } = cartSlice.actions;
export default cartSlice.reducer;
