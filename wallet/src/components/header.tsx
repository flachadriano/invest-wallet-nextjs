import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { AppBar, Box, Button, IconButton, Toolbar, Typography } from "@mui/material";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

export default function Header() {
  const router = useRouter();
  const { data: session } = useSession();

  const logout = () => {
    signOut({ redirect: false });
    router.push('/auth/signin');
  };

  const renderSellButton = () => {
    return (
      <IconButton
        color="inherit"
        onClick={() => console.log('sell')}
      >
        <RemoveCircleIcon />
      </IconButton>
    );
  };

  const renderBuyButton = () => {
    return (
      <IconButton
        color="inherit"
        onClick={() => console.log('add')}
      >
        <AddCircleIcon />
      </IconButton>
    );
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Tá investido
          </Typography>
          
          {!session && <Button color="inherit" onClick={() => router.push('/auth/signup')}>Criar conta</Button>}
          {!session && <Button color="inherit" onClick={() => router.push('/auth/signin')} sx={{ ml: 2 }}>Entrar</Button>}
          
          {session && renderSellButton()}
          {session && renderBuyButton()}
          {session && <Typography sx={{ ml: 2 }}>{session.user?.name}</Typography>}
          {session && <Button color="inherit" onClick={logout} sx={{ ml: 2 }}>Sair</Button>}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
