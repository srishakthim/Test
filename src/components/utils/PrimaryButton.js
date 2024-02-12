import { LoadingButton } from "@mui/lab";
import * as React from "react";
export default function PrimaryButton({ loading, func, children, sx }) {
  return (
    <LoadingButton
      loading={loading}
      onClick={func}
      sx={{
        ...sx,
        color: "white",
        fontWeight: "600",
        fontSize: "15px",
        backgroundColor: "#10309F",
        width: "100%",
        borderRadius: "6px",
        "&:hover": {
          backgroundColor: "#10309F",
          color: "#fff",
        },
        "& .MuiCircularProgress-circle": {
          // Assuming CircularProgress is used for loading
          color: "#FFF",
        },
      }}
    >
      {children}
    </LoadingButton>
  );
}
