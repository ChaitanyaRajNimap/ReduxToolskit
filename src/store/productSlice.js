const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const STATUSES = Object.freeze({
  IDLE: "idel",
  ERROR: "error",
  LOADING: "loading",
}); //freeze makes obj read only

// for creating slice  (slice => storing app data into small pieces)
const productSlice = createSlice({
  name: "product", //name of slice
  initialState: {
    data: [],
    status: STATUSES.IDLE,
  }, //initial state
  reducers: {
    // //Never perform async call in reducers
    // //Bcoz reducers executed synchronously
    // //function to mutate state in app
    // setProducts(state, action) {
    //   // mutating state
    //   state.data = action.payload;
    // },
    // //for changing status
    // setStatus(state, action) {
    //   // mutating state
    //   state.status = action.payload;
    // },
  },
  //Use with thunk provided by reducer for better error handling
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.data = action.payload;
        console.log("Data from action : ", action.payload);
        state.status = STATUSES.IDLE;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
      });
  },
});

export const { setProducts, setStatus } = productSlice.actions;
export default productSlice.reducer;

//Thunks => A piece of code that does some delayed work (Api calls)
//Thunk provided by redux toolkit
export const fetchProducts = createAsyncThunk("products/fetch", async () => {
  // fetching products from url
  const response = await fetch("https://fakestoreapi.com/products");
  //converting string response to json
  const data = await response.json();

  return data;
});

//Normal Thunk
// export function fetchProducts() {
//   return async function fetchProductThunk(dispatch, getState) {
//     dispatch(setStatus(STATUSES.LOADING));

//     try {
//       // fetching products from url
//       const response = await fetch("https://fakestoreapi.com/products");
//       //converting string response to json
//       const data = await response.json();
//       dispatch(setProducts(data));
//       dispatch(setStatus(STATUSES.IDLE));
//     } catch (err) {
//       console.log(err);
//       dispatch(setStatus(STATUSES.ERROR));
//     }
//   };
// }
