import { Grid, Typography } from "@mui/material";

const ItemFeature = ({
  title,
  value,
}: {
  title: string;
  value: string;
}): JSX.Element => {
  return (
    <Grid container spacing={0} p={2}>
      <Typography variant="body2" sx={{ fontSize: 18, pr: 1 }}>
        {title}
      </Typography>
      :
      <Typography
        variant="body2"
        color="ThreeDLightShadow"
        sx={{ fontSize: 18, pl: 1 }}
      >
        {value}
      </Typography>
    </Grid>
  );
};

export default ItemFeature;
