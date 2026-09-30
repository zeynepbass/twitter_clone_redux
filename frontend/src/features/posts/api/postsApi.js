import { baseApi } from '../../../shared/api/baseApi';

const PAGE_SIZE = 10;

const patchEverywhere = (dispatch, getState, postId, recipe) => {
  const patches = [];
  const state = getState();

  for (const args of postsApi.util.selectCachedArgsForQuery(state, 'getPosts')) {
    patches.push(
      dispatch(
        postsApi.util.updateQueryData('getPosts', args, (draft) => {
          for (const page of draft.pages) {
            const post = page.items.find((item) => item.id === postId);
            if (post) recipe(post);
          }
        }),
      ),
    );
  }

  patches.push(dispatch(postsApi.util.updateQueryData('getPost', postId, recipe)));

  return () => patches.forEach((patch) => patch.undo());
};

const toggleLike = (liked) => async (postId, { dispatch, getState, queryFulfilled }) => {
  const undo = patchEverywhere(dispatch, getState, postId, (post) => {
    if (post.liked === liked) return;
    post.liked = liked;
    post.likeCount = Math.max(post.likeCount + (liked ? 1 : -1), 0);
  });

  try {
    const { data } = await queryFulfilled;
    patchEverywhere(dispatch, getState, postId, (post) => {
      post.liked = data.liked;
      post.likeCount = data.likeCount;
    });
  } catch {
    undo();
  }
};

export const postsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getPosts: build.infiniteQuery({
      query: ({ queryArg: { tag, q } = {}, pageParam }) => ({
        url: '/posts',
        params: {
          limit: PAGE_SIZE,
          ...(tag && { tag }),
          ...(q && { q }),
          ...(pageParam && { cursor: pageParam }),
        },
      }),
      infiniteQueryOptions: {
        initialPageParam: '',
        getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
      },
      providesTags: [{ type: 'Post', id: 'LIST' }],
    }),

    getPost: build.query({
      query: (id) => `/posts/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Post', id }],
    }),

    getTrendingTags: build.query({
      query: (limit = 5) => ({ url: '/posts/trending-tags', params: { limit } }),
      providesTags: ['Trending'],
      keepUnusedDataFor: 300,
    }),

    likePost: build.mutation({
      query: (id) => ({ url: `/posts/${id}/like`, method: 'PUT' }),
      onQueryStarted: toggleLike(true),
    }),

    unlikePost: build.mutation({
      query: (id) => ({ url: `/posts/${id}/like`, method: 'DELETE' }),
      onQueryStarted: toggleLike(false),
    }),

    addComment: build.mutation({
      query: ({ postId, text }) => ({ url: `/posts/${postId}/comments`, method: 'POST', body: { text } }),
      onQueryStarted: async ({ postId }, { dispatch, getState, queryFulfilled }) => {
        try {
          const { data: comment } = await queryFulfilled;
          dispatch(
            postsApi.util.updateQueryData('getPost', postId, (post) => {
              post.comments.unshift(comment);
            }),
          );
          patchEverywhere(dispatch, getState, postId, (post) => {
            post.commentCount += 1;
          });
        } catch {
          return;
        }
      },
    }),

    registerView: build.mutation({
      query: (id) => ({ url: `/posts/${id}/views`, method: 'POST' }),
      onQueryStarted: async (postId, { dispatch, getState, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          patchEverywhere(dispatch, getState, postId, (post) => {
            post.viewCount = data.viewCount;
          });
        } catch {
          return;
        }
      },
    }),
  }),
});

export const {
  useGetPostsInfiniteQuery,
  useGetPostQuery,
  useGetTrendingTagsQuery,
  useLikePostMutation,
  useUnlikePostMutation,
  useAddCommentMutation,
  useRegisterViewMutation,
  usePrefetch,
} = postsApi;
