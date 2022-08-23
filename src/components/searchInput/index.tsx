import { TextField, Stack, Autocomplete } from "@mui/material";
import { FunctionComponent } from "react";

interface SearchInputProps {
  data: {
    iata: string;
    name: string;
    city: string;
    state: string;
    lat: string;
    lng: string;
    size: string;
  }[];
  placeholder?: string;
  className?: string;
  onChange: any;
}

const SearchInput: FunctionComponent<SearchInputProps> = ({
  data = [],
  placeholder = "Search",
  className = "",
  onChange,
}) => {
  return (
    <Stack spacing={2} sx={{ width: 300 }}>
      <Autocomplete
        id="free-solo-demo"
        freeSolo
        className={className}
        options={data.map(
          (option: { name: string; iata: string }) =>
            `${option.name}, ${option.iata}`
        )}
        renderInput={(params: any) => (
          <TextField {...params} label={placeholder} />
        )}
        onChange={onChange}
      />
    </Stack>
  );
};

export default SearchInput;
