import { useCallback, FC } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Divider,
  MenuItem,
  MenuList,
  Popover,
  Typography,
} from "@mui/material";
// import { useAuth } from 'src/hooks/use-auth';

interface Props {
  anchorEl?: any;
  onClose?: () => {};
  open: boolean;
}

export const AccountPopover: FC<Props> = (props) => {
  const { anchorEl, onClose, open } = props;
  const router = useRouter();
  // const auth = useAuth();

  const handleSignOut = useCallback(
    () => {
      onClose?.();
      // auth.signOut();
      router.push("/auth/login");
    },
    // [onClose, auth, router]
    [onClose, router]
  );

  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: "left",
        vertical: "bottom",
      }}
      onClose={onClose}
      open={open}
      PaperProps={{ sx: { width: 200 } }}
    >
      <Box
        sx={{
          py: 1.5,
          px: 2,
        }}
      >
        <Typography variant="overline">Account</Typography>
        <Typography color="text.secondary" variant="body2">
          Anika Visser
        </Typography>
      </Box>
      <Divider />
      <MenuList
        disablePadding
        dense
        sx={{
          p: "8px",
          "& > *": {
            borderRadius: 1,
          },
        }}
      >
        <MenuItem onClick={handleSignOut}>Sign out</MenuItem>
      </MenuList>
    </Popover>
  );
};
