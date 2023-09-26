import { Box } from "@mui/material";

import Form from "../../components/Form/Form";
import Posts from "../../components/Posts/Posts";

export default function Home() {
  return (
    <Box display="flex" p={4}>
      <Box width="70%">
        <Posts />
      </Box>
      <Box width="30%">
        <Form />
      </Box>
    </Box>
  );
}
