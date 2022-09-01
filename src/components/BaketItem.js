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
import { ContextProvider } from "../State/Context";
import { DELETE_ITEM } from "../State/Types";

export default function BasketItem({item,index}) {
  console.log(index)
  const { dispatch } = React.useContext(ContextProvider);

  return (
    <ListItem
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        margin: "12px",
      }}
      secondaryAction={
        <IconButton 
          edge="end" 
          aria-label="delete" 
          onClick={() => {
            console.log(index)
            dispatch({
              type: DELETE_ITEM,
              index: index
            });
          }}
        >
          <DeleteIcon />
        </IconButton>
      }
    >
      <ListItemText
        primary={item.name}
        secondary={"$" + item.price}
      />
    </ListItem>
  );
}
