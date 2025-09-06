import React from 'react';
import {
  Box,
  Grid,
  Typography,
  Button,
  IconButton,
  Stack,
  Link,
  TextField
} from '@mui/material';
import { useTranslation } from 'react-i18next';

import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import './Footer.css';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <Box component="footer" sx={{ bgcolor: '#004080', color: 'white', py: 4 }}>
      <Grid container spacing={4} justifyContent="center" sx={{ bgcolor: '#004080' }}>
        <Grid item xs={12} sm={3} sx={{ textAlign: { xs: 'center', sm: 'left' } }}>
          <Typography variant="h6" gutterBottom>{t('footer.followTitle')}</Typography>
          <Stack spacing={1}>
            <Typography variant="h6" gutterBottom>{t('footer.newsletter')}</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
              <TextField
                variant="outlined"
                placeholder={t('footer.emailPlaceholder')}
                sx={{ bgcolor: 'white', flexGrow: 1 }}
                InputProps={{
                  sx: { height: 40 }
                }}
              />
              <Button
                variant="contained"
                color="warning"
                sx={{ height: 40, ml: -1, bgcolor: '#C90076' }}
              >
                {t('footer.subscribe')}
              </Button>
            </Box>
            <Typography>{t('footer.socialText')}</Typography>
            <Box sx={{ display: 'flex', justifyContent: 'flex-start', gap: 2, mt: 1, ml: '55px' }}>
              <IconButton><LinkedInIcon sx={{ color: 'white', fontSize: 32 }} /></IconButton>
              <IconButton><YouTubeIcon sx={{ color: 'white', fontSize: 32 }} /></IconButton>
              <IconButton><FacebookIcon sx={{ color: 'white', fontSize: 32 }} /></IconButton>
            </Box>
          </Stack>
        </Grid>

        <Grid item xs={12} sm={3} sx={{ textAlign: { xs: 'center', sm: 'left' } }}>
          <Typography variant="h6" gutterBottom>{t('footer.contactTitle')}</Typography>
          <Stack spacing={2}>
            <Typography>{t('footer.phone')}</Typography>
            <Typography>{t('footer.email')}</Typography>
            <Typography>{t('footer.address')}</Typography>
            <Typography>{t('footer.hours')}</Typography>
          </Stack>
        </Grid>

        <Grid item xs={12} sm={2} sx={{ textAlign: { xs: 'center', sm: 'left' } }}>
          <Typography variant="h6" gutterBottom>MOBILIIS</Typography>
          <Typography>{t('footer.offer')}</Typography>
          <Typography>{t('footer.sponsorship')}</Typography>
          <Typography>{t('footer.practicalInfo')}</Typography>
          <Typography>{t('footer.financing')}</Typography>
          <Typography>{t('footer.tuition')}</Typography>
        </Grid>

        <Grid item xs={12} sm={2} sx={{ textAlign: { xs: 'center', sm: 'left' } }}>
          <Typography variant="h6" gutterBottom>{t('footer.legalTitle')}</Typography>
          <Stack spacing={2}>
            <Link href="/mentions-legales" color="inherit" underline="hover" sx={{ '&:hover': { color: '#A93D87' } }}>
              <Typography>{t('footer.legalNotice')}</Typography>
            </Link>
            <Link href="/politique-confidentialite" color="inherit" underline="hover" sx={{ '&:hover': { color: '#A93D87' } }}>
              <Typography>{t('footer.privacy')}</Typography>
            </Link>
            <Link href="/cookies-consentement" color="inherit" underline="hover" sx={{ '&:hover': { color: '#A93D87' } }}>
              <Typography>{t('footer.cookies')}</Typography>
            </Link>
          </Stack>
        </Grid>
      </Grid>

      <Box sx={{ bgcolor: '#004080', py: 5, color: 'white', textAlign: 'center', paddingTop: '40px' }}>
        <Typography variant="body2">
          {t('footer.copyright')}
        </Typography>
        <Typography variant="body2">
          {t('footer.updated')}
        </Typography>
      </Box>
    </Box>
  );
}
