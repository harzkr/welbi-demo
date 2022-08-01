import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Autocomplete from "@mui/material/Autocomplete";

const levelOfCare = ["INDEPENDENT", "ASSISTED", "MEMORY", "LONGTERM"];

const hobbies = [
    "READING",
    "WRITING",
    "SPORTING",
    "COOKING",
    "MUSIC",
    "ART",
    "MOVIE",
    "TV",
    "GAMES",
    "OTHER",
]

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const GeneralModal = ({
  openModal,
  modalClose,
  modalType,
}: {
  openModal: boolean;
  modalClose: () => void;
  modalType: string;
}) => {
  const [open, setOpen] = React.useState(openModal || false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [levelOfCares, setLevelOfCares] = React.useState<string[]>([]);

  const handleChangeSelect = (
    event: SelectChangeEvent<typeof levelOfCares>
  ) => {
    const {
      target: { value },
    } = event;
    setLevelOfCares(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  React.useEffect(() => {
    setOpen(openModal);
  }, [openModal]);

  React.useEffect(() => {
    if (!open) {
      modalClose();
    }
  }, [open]);

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
          <FormControl sx={{ m: 1, width: 300, marginTop: 4 }}>
            <InputLabel id="demo-multiple-chip-label">
              Select a Level of Care
            </InputLabel>
            <Select
              labelId="demo-multiple-chip-label"
              id="demo-multiple-chip"
              multiple
              value={levelOfCares}
              onChange={handleChangeSelect}
              input={
                <OutlinedInput
                  id="select-multiple-chip"
                  label="Select a Level of Care"
                />
              }
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
              MenuProps={MenuProps}
            >
              {levelOfCare.map((name: string) => (
                <MenuItem key={name} value={name}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormGroup sx={{ marginTop: 4 }}>
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              label="is Repeated?"
            />
            <FormControlLabel
              control={<Checkbox color="secondary" />}
              label="All Day Event"
            />
          </FormGroup>
          <Autocomplete
            multiple
            id="tags-filled"
            options={hobbies.map((option: string) => option)}
            freeSolo
            style={{
                marginTop:28
            }}
            renderTags={(value: readonly string[], getTagProps) =>
              value.map((option: string, index: number) => (
                <Chip
                  variant="outlined"
                  label={option}
                  {...getTagProps({ index })}
                />
              ))
            }
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                label="Hobbies"
                placeholder="Hobbies"
              />
            )}
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
