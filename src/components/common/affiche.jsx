// src/components/affiche.jsx
import * as React from "react";
import { Box, Container, Grid, Stack, Typography } from "@mui/material";

import ThumbUpAltOutlined from "@mui/icons-material/ThumbUpAltOutlined";
import LocalShippingOutlined from "@mui/icons-material/LocalShippingOutlined";
import LocalOfferOutlined from "@mui/icons-material/LocalOfferOutlined";
import LocalCafeOutlined from "@mui/icons-material/LocalCafeOutlined";

export default function Affiche() {
  const items = [
    { Icon: ThumbUpAltOutlined, text: "Suivez votre commande avec Track & Trace" },
    { Icon: LocalShippingOutlined, text: "Économisez des points et recevez de belles réductions" },
    { Icon: LocalOfferOutlined,    text: "Économisez des points et recevez de belles réductions" },
    { Icon: LocalCafeOutlined,     text: "Grand assortiment de café délicieux" },
  ];

  const bg        = "#f5efe5";
  const iconColor = "#7a5a3a";
  const textColor = "#4b3a2b";

  return (
    <Box component="section" sx={{ bgcolor: bg, py: { xs: 3, md: 4 } }}>
      {/* Container custom à 1300px */}
      <Container
        maxWidth={false}
        disableGutters
        sx={{
          maxWidth: 1300,    // <- largeur contenue à 1300px
          mx: "auto",        // centre le container
          px: { xs: 1.5, md: 0 }, // léger padding sur mobile
        }}
      >
        <Grid
          container
          alignItems="center"
          justifyContent="space-between"
          sx={{ flexWrap: { xs: "wrap", md: "nowrap" } }}  // une seule ligne dès md
          columnSpacing={{ xs: 2, md: 3, lg: 4 }}
          rowSpacing={{ xs: 2, md: 0 }}
        >
          {items.map(({ Icon, text }, i) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={3}
              key={i}
              sx={{ flexBasis: { md: "25%" }, maxWidth: { md: "25%" } }}
            >
              <Stack
                spacing={1.25}
                alignItems="center"
                textAlign="center"
                sx={{ px: { xs: 1, md: 1.5 } }}
              >
                <Icon sx={{ fontSize: { xs: 34, md: 38, lg: 42 }, color: iconColor }} />
                <Typography
                  variant="body1"
                  sx={{
                    color: textColor,
                    fontWeight: 600,
                    lineHeight: 1.35,
                    fontSize: { xs: 14, md: 15.5, lg: 16 },
                    maxWidth: 360,
                    m: 0,
                  }}
                >
                  {text}
                </Typography>
              </Stack>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
