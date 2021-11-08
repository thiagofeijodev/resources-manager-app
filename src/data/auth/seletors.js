export const selectAuth = (state) => state.auth?.user
export const selectUsername = (state) => state.auth?.user?.username
export const selectError = (state) => state.auth?.errors
