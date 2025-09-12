import { useParams, Link } from "react-router-dom";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

export default function OrderConfirmation() {
  const { orderId } = useParams();
  return (
    <Container maxWidth="sm" sx={{ py: 6, textAlign: "center" }}>
      <Typography variant="h4" sx={{ mb: 2, fontWeight: 700 }}>
        Merci pour votre commande !
      </Typography>
      <Typography variant="body1" sx={{ mb: 4 }}>
        Numéro de commande : <strong>#{orderId}</strong>
      </Typography>
      <Box>
        <Button component={Link} to="/" variant="contained">
          Retour à l'accueil
        </Button>
      </Box>
    </Container>
  );
}
