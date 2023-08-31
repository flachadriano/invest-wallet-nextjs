import { Typography } from "@mui/material";

interface ErrorMessageProps {
  children: React.ReactNode
}

export default function ErrorMessage({ children }: ErrorMessageProps) {
  return (
    <Typography
      component="h1"
      variant="h6"
      color="red"
      sx={{ mt: 1 }}
    >
      {children}
    </Typography>
  );
}
