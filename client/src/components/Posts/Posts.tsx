import { Error } from "@mui/icons-material";
import { Box, CircularProgress, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";

import { fetchPosts } from "../../api";

import Post from "./Post/Post";

export default function Posts() {
  const {
    data: posts,
    isLoading,
    isError,
  } = useQuery(["posts"], {
    queryFn: fetchPosts,
  });

  if (isError)
    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        height="100%"
        justifyContent="center"
      >
        <Error color="error" />
        <Typography color="darkred">Failed to get posts</Typography>
      </Box>
    );

  return (
    <Box display="flex" flexWrap="wrap" gap={2}>
      {posts?.length || !isLoading ? (
        posts?.map((post) => <Post {...post} key={post._id} />)
      ) : (
        <CircularProgress />
      )}
    </Box>
  );
}
