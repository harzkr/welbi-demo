import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const GeneralModal = ({
  openModal,
  modalClose,
  modalType
}: {
  openModal: boolean;
  modalClose: () => void;
  modalType: string;
}) => {
  const [open, setOpen] = React.useState(openModal || false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  React.useEffect(() => {
    setOpen(openModal);
  }, [openModal]);

  React.useEffect(() => {
    if(!open){
        modalClose();
    }
  },[open])

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add {modalType}</DialogTitle>
      <DialogContent>
        <>
        <TextField
          margin="dense"
          id="name"
          label="Name of Program"
          fullWidth
          variant="standard"
        />
        <TextField
          margin="dense"
          id="location"
          label="Location"
          fullWidth
          variant="standard"
        />
         <TextField
          margin="dense"
          id="dimension"
          label="Dimension"
          fullWidth
          variant="standard"
          placeholder="e.g. Intellectual, Physical"
        />
        </>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleClose}>Submit</Button>
      </DialogActions>
    </Dialog>
  );
};

export default GeneralModal;
