import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
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
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

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
];

const allTags = [
  "reading",
  "music",
  "meditation",
  "movies",
  "tv",
  "games",
  "other",
  "learning",
  "memory",
  "fun",
  "colors",
];

const facilitators = [
  "JANE",
  "JOE",
  "JIM",
  "JACK",
  "JILL",
  "HK",
  "WELBI",
  "OTHER",
];

const ambulations = ["NOLIMITATIONS", "CANE", "WALKER", "WHEELCHAIR"];

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

  const [disableSubmit, setDisableSubmit] = React.useState(true);

  const [levelOfCares, setLevelOfCares] = React.useState<string[]>([]);
  const [hobbies, setHobbies] = React.useState<string[]>([]);
  const [tags, setTags] = React.useState<string[]>([]);
  const [facilitators, setFacilitators] = React.useState<string[]>([]);

  const [programValues, setProgramValues] = React.useState({
    name: "",
    location: "",
    dimension: "",
    isRepeated: true,
    isAllDay: false,
  });

  const [attendeeValues, setAttendeeValues] = React.useState({
    firstName: "",
    lastName: "",
    preferredName: "",
    roomNumber: "",
    levelOfCare: "",
  });

  const handleChangeProgram = (prop) => (event) => {
    setProgramValues({ ...programValues, [prop]: event.target.value });
  };

  const handleChangeAttendee = (prop) => (event) => {
    setAttendeeValues({ ...attendeeValues, [prop]: event.target.value });
  };

  const [startTime, setStartTime] = React.useState<Date | null>(
    new Date("2014-08-18T21:11:54")
  );
  const [endTime, setEndTime] = React.useState<Date | null>(
    new Date("2014-08-18T21:11:54")
  );
  const [dob, setDob] = React.useState<Date | null>(
    new Date("2014-08-18T21:11:54")
  );
  const [moveIn, setMoveIn] = React.useState<Date | null>(
    new Date("2014-08-18T21:11:54")
  );

  const [ambulation, setAmbulation] = React.useState("");

  const handleChangeAmbulation = (event: SelectChangeEvent) => {
    setAmbulation(event.target.value as string);
  };

  const [selectedLevelOfCare, setSelectedLevelOfCare] = React.useState("");

  const handleChangeLevelOfCare = (event: SelectChangeEvent) => {
    setSelectedLevelOfCare(event.target.value as string);
  };

  const handleChangeTime = (newValue: Date | null, type: string) => {
    if (type === "start") {
      setStartTime(newValue);
    }

    if (type === "end") {
      setEndTime(newValue);
    }

    if (type === "dob") {
      setDob(newValue);
    }

    if (type === "moveIn") {
      setMoveIn(newValue);
    }
  };

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

  React.useEffect(() => {
    if (modalType === "Program") {
      if (
        programValues.name &&
        programValues.location &&
        programValues.dimension
      ) {
        setDisableSubmit(false);
      } else {
        setDisableSubmit(true);
      }
    } else {
      if (
        attendeeValues.firstName &&
        attendeeValues.lastName &&
        attendeeValues.preferredName &&
        attendeeValues.roomNumber
      ) {
        setDisableSubmit(false);
      } else {
        setDisableSubmit(true);
      }
    }
  }, [
    programValues.name,
    programValues.dimension,
    programValues.location,
    attendeeValues.firstName,
    attendeeValues.lastName,
    attendeeValues.preferredName,
    attendeeValues.roomNumber,
    modalType
  ]);
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add {modalType}</DialogTitle>
      <DialogContent>
        {modalType === "Program" ? (
          <>
            <TextField
              margin="dense"
              id="name"
              label="Name of Program"
              fullWidth
              variant="standard"
              value={programValues.name}
              onChange={handleChangeProgram("name")}
            />
            <TextField
              margin="dense"
              id="location"
              label="Location"
              fullWidth
              variant="standard"
              value={programValues.location}
              onChange={handleChangeProgram("location")}
            />
            <TextField
              margin="dense"
              id="dimension"
              label="Dimension"
              fullWidth
              variant="standard"
              placeholder="e.g. Intellectual, Physical"
              value={programValues.dimension}
              onChange={handleChangeProgram("dimension")}
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
              id="hobbies-autocomplete"
              options={hobbies.map((option: string) => option)}
              freeSolo
              style={{
                marginTop: 28,
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
            <Autocomplete
              multiple
              id="tags-autocomplete"
              options={allTags.map((option: string) => option)}
              freeSolo
              style={{
                marginTop: 28,
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
                  label="Tags"
                  placeholder="Tags"
                />
              )}
            />
            <Autocomplete
              multiple
              id="facilitator-autocomplete"
              options={facilitators.map((option: string) => option)}
              freeSolo
              style={{
                marginTop: 28,
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
                  label="Facilitators"
                  placeholder="Facilitators"
                />
              )}
            />
            <div
              style={{
                marginTop: 28,
                flexDirection: "column",
                display: "flex",
              }}
            >
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <div>
                  <DateTimePicker
                    label="Pick start date and time"
                    value={startTime}
                    onChange={(value: Date) => handleChangeTime(value, "start")}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </div>
                <div style={{ marginTop: 24 }}>
                  <DateTimePicker
                    label="Pick end date and time"
                    value={endTime}
                    onChange={(value: Date) => handleChangeTime(value, "end")}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </div>
              </LocalizationProvider>
            </div>
          </>
        ) : (
          <>
            <TextField
              margin="dense"
              id="firstName"
              label="First Name"
              fullWidth
              variant="standard"
              value={attendeeValues.firstName}
              onChange={handleChangeAttendee("firstName")}
            />
            <TextField
              margin="dense"
              id="lastName"
              label="Last Name"
              fullWidth
              variant="standard"
              value={attendeeValues.lastName}
              onChange={handleChangeAttendee("lastName")}
            />
            <TextField
              margin="dense"
              id="preferredName"
              label="Preferred Name"
              fullWidth
              variant="standard"
              value={attendeeValues.preferredName}
              onChange={handleChangeAttendee("preferredName")}
            />
            <TextField
              margin="dense"
              id="roomNumber"
              label="Room Number"
              fullWidth
              variant="standard"
              value={attendeeValues.roomNumber}
              onChange={handleChangeAttendee("roomNumber")}
            />
            <div
              style={{
                marginTop: 28,
                flexDirection: "column",
                display: "flex",
              }}
            >
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <div>
                  <DateTimePicker
                    label="Date of Birth"
                    value={dob}
                    onChange={(value: Date) => handleChangeTime(value, "dob")}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </div>
                <div style={{ marginTop: 24 }}>
                  <DateTimePicker
                    label="Move in Date"
                    value={moveIn}
                    onChange={(value: Date) =>
                      handleChangeTime(value, "moveIn")
                    }
                    renderInput={(params) => <TextField {...params} />}
                  />
                </div>
              </LocalizationProvider>
            </div>

            <div style={{ marginTop: 24 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Ambulation
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={ambulation}
                  label="Abulation"
                  onChange={handleChangeAmbulation}
                >
                  {ambulations.map((name: string) => (
                    <MenuItem key={name} value={name}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>

            <div style={{ marginTop: 24 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Level Of Care
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={selectedLevelOfCare}
                  label="Level Of Care"
                  onChange={handleChangeLevelOfCare}
                >
                  {levelOfCare.map((name: string) => (
                    <MenuItem key={name} value={name}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button color="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button disabled={disableSubmit} onClick={handleClose}>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default GeneralModal;
