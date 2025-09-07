import React from "react";
import {
  Box,
  Grid,
  Typography,
  Button,
  IconButton,
  Stack,
  Link,
  TextField,
} from "@mui/material";

import LinkedInIcon from "@mui/icons-material/LinkedIn";
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";
import "./Footer.css";

export default function Footer() {
  return (
    <Box component="footer" sx={{ bgcolor: "#7a5c2e", color: "white", py: 4 }}>
      <Grid
        container
        spacing={4}
        justifyContent="center"
        sx={{ bgcolor: "#7a5c2e" }}
      >
        {/* Colonne 1 : Suivi / Newsletter / Réseaux sociaux */}
        <Grid
          item
          xs={12}
          sm={3}
          sx={{ textAlign: { xs: "center", sm: "left" } }}
        >
          <Typography variant="h6" gutterBottom>
            SUIVEZ NOS ACTUALITÉS !
          </Typography>
          <Stack spacing={1}>
            <Typography variant="h6" gutterBottom>
              Abonnez-vous à notre Newsletter
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
              <TextField
                variant="outlined"
                placeholder="Email"
                sx={{ bgcolor: "white", flexGrow: 1 }}
                InputProps={{
                  sx: { height: 40 },
                }}
              />
              <Button
                variant="contained"
                color="warning"
                sx={{ height: 40, ml: -1, bgcolor: "#C90076" }}
              >
                S&apos;ABONNER
              </Button>
            </Box>

            <Typography>Nous suivre sur :</Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                gap: 2,
                mt: 1,
                ml: "55px",
              }}
            >
              <IconButton>
                <LinkedInIcon sx={{ color: "white", fontSize: 32 }} />
              </IconButton>
              <IconButton>
                <YouTubeIcon sx={{ color: "white", fontSize: 32 }} />
              </IconButton>
              <IconButton>
                <FacebookIcon sx={{ color: "white", fontSize: 32 }} />
              </IconButton>
            </Box>
          </Stack>
        </Grid>

        {/* Colonne 2 : Contact */}
        <Grid
          item
          xs={12}
          sm={3}
          sx={{ textAlign: { xs: "center", sm: "left" } }}
        >
          <Typography variant="h6" gutterBottom>
            CONTACTEZ-NOUS
          </Typography>
          <Stack spacing={2}>
            <Typography>+237 675 070 050 | +33 7 58 10 31 17</Typography>
            <Typography>mobiliis03@gmail.com</Typography>
            <Typography>
              Ndogbong-Douala, Rue du Commissariat 10ème
            </Typography>
            <Typography>Du lundi au vendredi de 8h30 à 18h00</Typography>
          </Stack>
        </Grid>

        {/* Colonne 3 : Mobiliis / liens simples */}
        <Grid
          item
          xs={12}
          sm={2}
          sx={{ textAlign: { xs: "center", sm: "left" } }}
        >
          <Typography variant="h6" gutterBottom>
            MOBILIIS
          </Typography>
          <Typography>Nos offres</Typography>
          <Typography>Parrainage</Typography>
          <Typography>Informations pratiques</Typography>
          <Typography>Financement</Typography>
          <Typography>Frais de scolarité</Typography>
        </Grid>

        {/* Colonne 4 : Légal */}
        <Grid
          item
          xs={12}
          sm={2}
          sx={{ textAlign: { xs: "center", sm: "left" } }}
        >
          <Typography variant="h6" gutterBottom>
            INFORMATIONS LÉGALES
          </Typography>
          <Stack spacing={2}>
            <Link
              href="/mentions-legales"
              color="inherit"
              underline="hover"
              sx={{ "&:hover": { color: "#A93D87" } }}
            >
              <Typography>Mentions Légales</Typography>
            </Link>
            <Link
              href="/politique-confidentialite"
              color="inherit"
              underline="hover"
              sx={{ "&:hover": { color: "#A93D87" } }}
            >
              <Typography>Politique de confidentialité</Typography>
            </Link>
            <Link
              href="/cookies-consentement"
              color="inherit"
              underline="hover"
              sx={{ "&:hover": { color: "#A93D87" } }}
            >
              <Typography>Cookies et consentement</Typography>
            </Link>
          </Stack>
        </Grid>
      </Grid>

      <Box
        sx={{
          bgcolor: "#7a5c2e",
          py: 5,
          color: "white",
          textAlign: "center",
          paddingTop: "40px",
        }}
      >
        <Typography variant="body2">
          Copyright © 2024 | Alex KUETCHE. EasyTech solution WebSite
        </Typography>
        <Typography variant="body2">
          Mise à jour : le 31 Octobre 2024
        </Typography>
      </Box>
    </Box>
  );
}
