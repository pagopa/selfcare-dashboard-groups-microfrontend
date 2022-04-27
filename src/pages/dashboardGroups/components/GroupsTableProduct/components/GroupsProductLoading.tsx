import { Grid, useTheme } from '@mui/material';
import MDSpinner from 'react-md-spinner';

export default function GroupsProductLoading() {
  const theme = useTheme();
  return (
    <Grid
      container
      direction="row"
      sx={{
        mt: 1,
        backgroundColor: 'white',
      }}
      py={6}
      justifyContent="center"
    >
      <MDSpinner singleColor={theme.palette.primary.main} />
    </Grid>
  );
}
