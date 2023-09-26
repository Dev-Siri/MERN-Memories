import { Delete, MoreHoriz, ThumbUp } from "@mui/icons-material";
import {
  Box,
  Button,
  ButtonBase,
  Card,
  CardActions,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState, type MouseEvent } from "react";

import type { Post } from "../../../types";

import { deletePost, likePost } from "../../../api";
import useAuthStore from "../../../store/auth";
import usePostStore from "../../../store/post";
import { getRelativeTime } from "../../../utils/time";
import useStyles from "./styles";

export default function Post({
  _id,
  title,
  description,
  createdAt,
  creator,
  likes,
  tags,
  image,
}: Post) {
  const [likeCount, setLikeCount] = useState(likes.length);

  const user = useAuthStore((state) => state.user);
  const { setCurrentPost } = usePostStore();
  const queryClient = useQueryClient();
  const styles = useStyles();

  const { mutate: deletePostMutation } = useMutation({
    mutationFn: deletePost,
    onSuccess: () => queryClient.invalidateQueries(["posts"]),
  });

  const { mutate: likePostMutation } = useMutation({
    mutationFn: likePost,
    // Optimistic updates
    onMutate: () => setLikeCount((prevLikeCount) => ++prevLikeCount),
    onError: () => setLikeCount((prevLikeCount) => --prevLikeCount),
  });

  function handleLike() {
    if (!user) return;

    likePostMutation({ postId: _id, userId: user.userId });
  }

  function handleUpdatePost(
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) {
    e.stopPropagation();
    setCurrentPost({
      _id,
      title,
      description,
      image,
      creator,
      createdAt,
      likes,
      tags,
    });
  }

  return (
    <Card sx={styles.card}>
      <ButtonBase sx={styles.content}>
        <Box sx={styles.overlay}>
          <Box display="flex" justifyContent="space-between" pr={2}>
            <Box>
              <Typography color="white" variant="h6">
                {creator}
              </Typography>
              <Typography color="white" variant="caption">
                {getRelativeTime(createdAt)}
              </Typography>
            </Box>
            {/* @ts-expect-error */}
            <IconButton
              component="div"
              color="inherit"
              onClick={handleUpdatePost}
            >
              <MoreHoriz htmlColor="white" />
            </IconButton>
          </Box>
        </Box>
        <CardMedia component="img" height={300} image={image} />
        <Box display="flex" gap={1} ml={1.2} mt={1.2}>
          {tags.map((tag) => (
            <Typography variant="body2" color="gray" key={tag}>
              #{tag}
            </Typography>
          ))}
        </Box>
        <Typography variant="h3" fontSize={22} mt={1} ml={1.4}>
          {title}
        </Typography>
        <Typography variant="body1" mt={1} ml={1.4}>
          {description}
        </Typography>
      </ButtonBase>
      <CardActions sx={styles.cardActions}>
        {user && (
          <Button sx={styles.cardAction} onClick={handleLike}>
            <ThumbUp />
            {likeCount} {likeCount === 1 ? "Like" : "Likes"}
          </Button>
        )}
        {user?.username === creator && (
          <Button
            sx={styles.cardAction}
            color="secondary"
            onClick={() => deletePostMutation(_id)}
          >
            <Delete />
            Delete
          </Button>
        )}
      </CardActions>
    </Card>
  );
}
