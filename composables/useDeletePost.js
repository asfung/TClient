import { usePostStore } from "~/stores/Post";

export function useDeletePost() {
  const postStore = usePostStore();

  const deletePost = (postId) => {
    postStore.posts = postStore.posts?.filter(post => post.id !== postId) || [];
    postStore.postsFollowing = postStore.postsFollowing?.filter(post => post.id !== postId) || [];
    postStore.postsBookmark = postStore.postsBookmark?.filter(post => post.id !== postId) || [];
    postStore.postsSearch = postStore.postsSearch?.filter(post => post.id !== postId) || [];
    postStore.postsMyself = postStore.postsMyself?.filter(post => post.id !== postId) || [];
    postStore.postsRepliesMyself = postStore.postsRepliesMyself?.filter(post => post.id !== postId) || [];
    postStore.postsLikeMyself = postStore.postsLikeMyself?.filter(post => post.id !== postId) || [];
    postStore.postsRepostMyself = postStore.postsRepostMyself?.filter(post => post.id !== postId) || [];

    if (postStore.postDetails?.parent) {
      postStore.postDetails.parent = postStore.postDetails.parent.filter(post => post.id !== postId);
    }

    const filterReplies = (replies = []) => {
      return replies
        .filter(reply => reply.id !== postId) 
        .map(reply => ({
          ...reply,
          replies: filterReplies(reply.replies || []) 
        }));
    };

    postStore.postDetails.replies = filterReplies(postStore.postDetails?.replies || []);
  };

  return { deletePost };
}


// import { usePostStore } from "~/stores/Post";

// export function useDeletePost() {
//   const postStore = usePostStore();

//   const deletePost = (postId) => {
//     postStore.$patch((state) => {
//       state.posts = state.posts?.filter(post => post.id !== postId) || [];
//       state.postsFollowing = state.postsFollowing?.filter(post => post.id !== postId) || [];
//       state.postsBookmark = state.postsBookmark?.filter(post => post.id !== postId) || [];
//       state.postsSearch = state.postsSearch?.filter(post => post.id !== postId) || [];
//       state.postsMyself = state.postsMyself?.filter(post => post.id !== postId) || [];
//       state.postsRepliesMyself = state.postsRepliesMyself?.filter(post => post.id !== postId) || [];
//       state.postsLikeMyself = state.postsLikeMyself?.filter(post => post.id !== postId) || [];
//       state.postsRepostMyself = state.postsRepostMyself?.filter(post => post.id !== postId) || [];

//       if (state.postDetails?.parent) {
//         state.postDetails.parent = state.postDetails.parent.filter(post => post.id !== postId);
//       }

//       const filterReplies = (replies = []) => {
//         return replies
//           .filter(reply => reply.id !== postId) 
//           .map(reply => ({
//             ...reply,
//             replies: filterReplies(reply.replies || []) 
//           }));
//       };

//       state.postDetails.replies = filterReplies(state.postDetails?.replies || []);
//     });
//   };

//   return { deletePost };
// }
