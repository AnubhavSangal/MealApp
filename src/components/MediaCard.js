import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { Rating } from "@mui/material";
import { ContextProvider } from "../State/Context";
import { ADD_ITEM } from "../State/Types";

export default function MediaCard({ item }) {
  const { dispatch } = React.useContext(ContextProvider);

  return (
    <Grid item xs={3}>
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          component="img"
          height="300"
          image={item?.img}
          alt="green iguana"
        />
        <CardContent>
          <Typography variant="h6" component="div">
            {item.name}
          </Typography>
          <Typography variant="subtitle1" component="div">
            {"$" + item.price}
          </Typography>
          <Typography variant="body1" component="div">
            {item.dsc}
          </Typography>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              margin: "12px",
            }}
          >
            <Rating name="disabled" value={item.rate} disabled />
            <Button
              variant="contained"
              size="small"
              disableElevation
              onClick={() => {
                dispatch ({
                  type: ADD_ITEM,
                  item: item
                });
              }}
            >
              Add
            </Button>
          </div>
        </CardContent>
      </Card>
    </Grid>
  );
}
