import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import List from "@mui/material/List";
import { Rating, Button } from "@mui/material";
import { ContextProvider } from "../State/Context";
import { CHANGE_FOOD, CHANGE_PRICE, CHANGE_RATE } from "../State/Types";
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';

const drawerWidth = 180;

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

// const StyledInputBase = styled(InputBase)(({ theme }) => ({
//   color: "inherit",
//   "& .MuiInputBase-input": {
//     padding: theme.spacing(1, 1, 1, 0),
//     // vertical padding + font size from searchIcon
//     paddingLeft: `calc(1em + ${theme.spacing(4)})`,
//     transition: theme.transitions.create("width"),
//     width: "100%",
//     [theme.breakpoints.up("sm")]: {
//       width: "12ch",
//       "&:focus": {
//         width: "20ch",
//       },
//     },
//   },
// }));
const priceRange=[
  {price:[100, -1],val:1},
  {price:[75, 100],val:2},
  {price:[50, 75],val:3},
  {price:[-1, 50],val:4},
  {price:[-1, -1],val:5}]
export default function SearchAppBar({handleOpen}) {
  const { dispatch } = React.useContext(ContextProvider);
  const [selectedFood,setSelectedFood]=React.useState("Burgers");
  const [selectedRate,setSelectedRate]=React.useState(0);
  const [selectedPrice,setSelectedPrice]=React.useState(5);
  console.log(selectedPrice);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
        <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              margin: "12px",
            }}
          >
          <Typography variant="h5" noWrap component="div">
            Fast Meal
          </Typography>
          <Button onClick={handleOpen}><ShoppingBasketIcon sx={{ fontSize: 40 }} color="action" /></Button>
          </div>
          {/* <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search> */}
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <List>
            {["Burgers", "Pizzas", "Drinks", "Desserts"].map((text, index) => (
              <ListItem
                selected={selectedFood === text}
                key={text}
                disablePadding
                onClick={() => {
                  dispatch({
                    type: CHANGE_FOOD,
                    food: text,
                  });
                  setSelectedFood(text);
                }}
              >
                <ListItemButton>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {[5, 4, 3, 0].map((item, index) => (
              <ListItem 
              selected={selectedRate === item}
              key={item} 
              disablePadding
              onClick={() => {
                dispatch({
                  type: CHANGE_RATE,
                  rate: item,
                });
                setSelectedRate(item);
              }}
              >
                {item === 0 ? (
                  <ListItemButton>
                    <ListItemText primary={"Any"} />
                  </ListItemButton>
                ) : (
                  <ListItemButton>
                    <Rating
                      size="small"
                      name="disabled"
                      value={item}
                      disabled
                    />
                    <ListItemText primary={"& up"} />
                  </ListItemButton>
                )}
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {priceRange.map((item, index) => (
              <ListItem 
                selected={selectedPrice === item.val}
                key={item.val} 
                disablePadding
                onClick={() => {
                  dispatch({
                    type: CHANGE_PRICE,
                    price: item.price,
                  });
                  setSelectedPrice(item.val);
                }}
              >
                { item.val === 5 ? (
                  <ListItemButton>
                    <ListItemText primary={"Any"} />
                  </ListItemButton>
                ) : (item.val === 4 ? (
                  <ListItemButton>
                    <ListItemText primary={"Below $" + item.price[1]} />
                  </ListItemButton>
                ) : item.val === 1 ? (
                  <ListItemButton>
                    <ListItemText primary={"Above $" + item.price[0]} />
                  </ListItemButton>
                ) : (
                  <ListItemButton>
                    <ListItemText primary={"$" + item.price[0] + " to $" + item.price[1]} />
                  </ListItemButton>
                ))}
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </Box>
  );
}
