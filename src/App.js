import { CircularProgress } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import SearchAppBar from "./components/ SearchAppBar";
import MediaCard from "./components/MediaCard";
import Grid from "@mui/material/Grid";
import { ContextProvider } from "./State/Context";
import { GET_DATA } from "./State/Types";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Basket from "./components/Basket";
import { Button, Modal } from "@mui/material";

function App() {
  const { dispatch, data,foodType, selectedItems } = useContext(ContextProvider);
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    dispatch({
      type: GET_DATA,
      setIsLoading: setIsLoading,
    });
  }, [foodType]);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 300,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    position:'absolute',
    overflow:'scroll',
    height:'50%',
    display:'block'
  };

  return (
    <div className="App">
      <Box sx={{ display: "flex" }}>
        <SearchAppBar handleOpen={handleOpen} />
        <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 2 }}>
          {isLoading ? (
            <div style={{ transform: "translate(0%,10rem)" }}>
              <CircularProgress />
            </div>
          ) : ( Object.keys(data).length === 0 ? (
            <Typography variant="h1" component="div">
              Sorry! No item Found
            </Typography>
          ) : (
            <Grid container spacing={2}>
              {data.map((item) => {
                return <MediaCard item={item} key={item.id} />;
              })}
            </Grid>
          ))}
        </Box>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}><Basket items={selectedItems}/></Box>
          
        </Modal>
      </Box>
    </div>
  );
}

export default App;
