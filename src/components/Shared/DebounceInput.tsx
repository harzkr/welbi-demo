import React from "react";
import { TextField } from "@mui/material";

export const DebouncedInput = ({
  value: initialValue,
  onChange,
  debounce = 500,
  label,
  textfieldId,
}: {
  value: string | number;
  onChange: (value: string | number) => void;
  debounce?: number;
  label: string;
  textfieldId?: string;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange">) => {
  const [value, setValue] = React.useState(initialValue);

  React.useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
  }, [value]);

  return (
    <TextField
      id={textfieldId}
      label={label}
      variant="outlined"
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};
