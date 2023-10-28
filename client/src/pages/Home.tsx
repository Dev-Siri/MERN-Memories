import { Box, useMediaQuery } from "@mui/material";

import Form from "../components/Form/Form";
import Posts from "../components/Posts/Posts";

function useGrid() {
  const medium = useMediaQuery("(max-width: 1024px)");
  const small = useMediaQuery("(max-width: 800px)");
  const extraSmall = useMediaQuery("(max-width: 650px)");

  if (extraSmall) return ["100%", "100%"];

  if (small) return ["50%", "50%"];

  if (medium) return ["60%", "40%"];

  return ["70%", "30%"];
}

export default function Home() {
  const [postsWidth, formWidth] = useGrid();
  const isColumn = useMediaQuery("(max-width: 650px)");

  return (
    <Box
      display="flex"
      flexDirection={isColumn ? "column" : "row"}
      p={4}
      gap={2}
    >
      <Box width={postsWidth}>
        <Posts />
      </Box>
      <Box width={formWidth}>
        <Form />
      </Box>
    </Box>
  );
}
