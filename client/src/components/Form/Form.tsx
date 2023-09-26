import { Error } from "@mui/icons-material";
import {
  Box,
  Button,
  CircularProgress,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState, type FormEvent } from "react";
import FileBase64 from "react-file-base64";

import { createPost, updatePost } from "../../api";
import useAuthStore from "../../store/auth";
import usePostStore from "../../store/post";
import useStyles from "./styles";

export default function Form() {
  const user = useAuthStore((state) => state.user);
  const { currentPost, setCurrentPost } = usePostStore();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [image, setImage] = useState("");

  const styles = useStyles();
  const queryClient = useQueryClient();

  const {
    mutate: createPostMutation,
    isLoading,
    isError,
  } = useMutation({
    mutationFn: createPost,
    onSuccess,
  });

  const { mutate: updatePostMutation } = useMutation({
    mutationFn: updatePost,
    onSuccess,
  });

  function onSuccess() {
    queryClient.invalidateQueries(["posts"]);
    resetForm();
  }

  function resetForm() {
    setTitle("");
    setDescription("");
    setTags([]);
    setImage("");
    setCurrentPost(null);
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!title || !description || !image || !user) return;

    const post = {
      title,
      description,
      image,
      tags,
      creator: user.username,
    };

    if (currentPost)
      return updatePostMutation({ post, postId: currentPost._id });

    createPostMutation(post);
  }

  useEffect(() => {
    setTitle(currentPost?.title ?? "");
    setDescription(currentPost?.description ?? "");
    setTags(currentPost?.tags ?? []);
    setImage(currentPost?.image ?? "");
  }, [currentPost]);

  return user ? (
    <Paper sx={styles.form}>
      <Typography variant="h5" mb={1}>
        {currentPost ? "Update" : "Create"} Memory
      </Typography>
      <Box
        component="form"
        display="flex"
        flexDirection="column"
        gap={1}
        onSubmit={handleSubmit}
      >
        <TextField
          fullWidth
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          fullWidth
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <TextField
          fullWidth
          placeholder="Tags (comma separated)"
          value={tags.join(",")}
          onChange={(e) => setTags(e.target.value.split(","))}
        />
        <FileBase64 onDone={(file) => setImage(file.base64)} />
        {isError && (
          <Box display="flex" alignItems="center" gap={1}>
            <Error color="error" />
            <Typography variant="body2" color="red">
              Failed to {currentPost ? "update" : "create"} post
            </Typography>
          </Box>
        )}
        <Button type="submit" variant="contained" sx={styles.submitButton}>
          Submit
          {isLoading && <CircularProgress color="inherit" size={20} />}
        </Button>
        <Button
          type="button"
          color="secondary"
          size="small"
          variant="contained"
          onClick={resetForm}
        >
          Clear
        </Button>
      </Box>
    </Paper>
  ) : (
    <Paper sx={styles.form}>
      <Typography variant="h5">
        Please sign in to create your own memories.
      </Typography>
    </Paper>
  );
}
