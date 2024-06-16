export const selectResource = (state) => {
  console.log(state, state.resource);
  
  return state.resource || {}
}
