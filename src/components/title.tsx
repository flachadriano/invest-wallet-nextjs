import { Typography } from "@mui/material";

interface TitleProps {
  children: React.ReactNode
}

export default function Title({ children }: TitleProps) {
  return (
    <Typography
      component="h1"
      variant="h4"
      sx={{ mb: 2 }}
    >
      {children}
    </Typography>
  );
}
