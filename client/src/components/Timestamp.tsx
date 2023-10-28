import { Typography } from "@mui/material";
import { useEffect, useState } from "react";

import { getRelativeTime } from "../utils/time";

interface Props {
  createdAt: string;
}

export default function Timestamp({ createdAt }: Props) {
  const [timestamp, setTimestamp] = useState(getRelativeTime(createdAt));

  useEffect(() => {
    const interval = setInterval(
      () => setTimestamp(getRelativeTime(createdAt)),
      1000
    );

    return () => clearInterval(interval);
  }, []);

  return (
    <Typography color="white" variant="caption">
      {timestamp}
    </Typography>
  );
}
