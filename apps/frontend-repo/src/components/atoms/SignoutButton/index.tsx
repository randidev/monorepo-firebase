import URLS from "@/config/urls";
import { Fab } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/navigation";
import LogoutIcon from "@mui/icons-material/Logout";

export default function SignoutButton() {
  const router = useRouter();

  const handleSignout = async () => {
    await axios.post(URLS.API_SIGNOUT);

    router.replace(URLS.SIGNIN);
  };

  return (
    <Fab
      onClick={handleSignout}
      color="primary"
      aria-label="add"
      sx={{ position: "fixed", bottom: "5%", right: "5%" }}
    >
      <LogoutIcon />
    </Fab>
  );
}
