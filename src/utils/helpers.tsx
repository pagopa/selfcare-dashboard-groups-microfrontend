import { Chip } from '@mui/material';

export const TableChip = ({ text }: { text: string }) => (
  <Chip
    label={text}
    aria-label="Suspended"
    color="warning"
    sx={{
      cursor: 'pointer',
      fontSize: '14px',
      fontWeight: 'fontWeightMedium',
      paddingBottom: '1px',
      height: '24px',
    }}
  />
);
