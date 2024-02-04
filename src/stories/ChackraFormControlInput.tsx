import { FC } from "react";
import {
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
} from "@chakra-ui/react";

type Props = {
  isValid: boolean;
  error: string;
};

const ChackraFormControlInput: FC<Props> = ({}) => {
  return (
    <FormControl>
      <FormLabel>Email address</FormLabel>
      <Input type="email" />
      <FormHelperText>{error}</FormHelperText>
    </FormControl>
  );
};

export default ChackraFormControlInput;
