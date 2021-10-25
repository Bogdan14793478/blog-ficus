const initial = {
  posts: [],
}

export const userPosts = (state = initial, action) => {
  console.log(action, "action")
  switch (action.type) {
    case "GET_ALL_POST":
      return { ...state, posts: [...state.posts] }
    case "CREATE_NEW_POST":
      console.log(action.payload, "action.payload")
      return { ...state, posts: [...state.posts, action.payload] }
    // case "UPDATE_POST":
    //   return { ...state, post: action.payload } ??
    case "DELETE_POST":
      return state
    default:
      return state
  }
}
