import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Products from '../../features/products/Products.components';
import './Main.css';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="http://ourlereve.shop/">
        Our Lereve
      </Link>
      {'.'}
    </Typography>
  );
}

export default function Main() {
  return (
    <>
      <CssBaseline />

      <main>
        <Box
          sx={{
            pt: 8,
            height: 500
          }}
          className="jlee-banner"
        >
        </Box>
        <Container sx={{ pb: 4 }} maxWidth="md">
          <Products url="all"></Products>
        </Container>
      </main>
      {/* Footer */}
      <Box sx={{ p: 6 }} component="footer">
        <Copyright />
      </Box>
    </>
  );
}
