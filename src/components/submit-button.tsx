import { LoadingButton } from "@mui/lab";

interface SubmitButtonProps {
  loading: boolean
  children: React.ReactNode
}

export default function SubmitButton({ loading, children }: SubmitButtonProps) {
  return (
    <LoadingButton
      type="submit"
      variant="contained"
      loading={loading}
      loadingPosition="start"
      startIcon={<span />}
      sx={{ mt: 1 }}
    >
      {children}
    </LoadingButton>
  );
}
