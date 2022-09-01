import * as React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import FolderIcon from "@mui/icons-material/Folder";
import DeleteIcon from "@mui/icons-material/Delete";
import BasketItem from "./BaketItem";

export default function Basket({items}) {
  console.log(items)
    var total = 0;
    for(const item of items ) {
        total+=parseFloat(item.price);
    }
    console.log(total)

  return (
    <Box sx={{ flexGrow: 1, maxWidth: 752 }}>
        <Grid item xs={12} md={6}>
          <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
            Basket
          </Typography>
          <List>
            {items.map((item, index) => {
              console.log(index)
              return <BasketItem item={item} index={index} key={index} />;
            })}
          </List>
        </Grid>
      <Typography varient="h3" component="div">
        {"Total $"+total}
      </Typography>
    </Box>
  );
}
