import { usePostStore } from "~/stores/Post";

export function useEditPost() {
  const postStore = usePostStore();

  const editPost = (postId, updatedPost) => {
    postStore.$patch((state) => {
      const updatePostInArray = (posts = []) => {
        return posts.map(post =>
          post.id === postId ? { ...post, ...updatedPost } : post
        );
      };

      state.posts = updatePostInArray(state.posts);
      state.postsFollowing = updatePostInArray(state.postsFollowing);
      state.postsBookmark = updatePostInArray(state.postsBookmark);
      state.postsSearch = updatePostInArray(state.postsSearch);
      state.postsMyself = updatePostInArray(state.postsMyself);
      state.postsRepliesMyself = updatePostInArray(state.postsRepliesMyself);
      state.postsLikeMyself = updatePostInArray(state.postsLikeMyself);
      state.postsRepostMyself = updatePostInArray(state.postsRepostMyself);

      if (state.postDetails?.parent) {
        state.postDetails.parent = state.postDetails.parent.map(post => 
          post.id === postId ? { ...post, ...updatedPost } : post
        );
      }

      const updateReplies = (replies = []) => {
        return replies.map(reply =>
          reply.id === postId
            ? { ...reply, ...updatedPost }
            : { ...reply, replies: updateReplies(reply.replies || []) }
        );
      };

      state.postDetails.replies = updateReplies(state.postDetails?.replies);
    });
  };

  return { editPost };
}
