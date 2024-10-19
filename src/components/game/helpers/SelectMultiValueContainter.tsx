import { ImUsers } from "react-icons/im";
import { components } from "react-select";

export const MultiValueContainer = (props: any, playerLength: number) => (
    <components.MultiValueContainer {...props}>
      <span className="d-flex align-items-center px-1 rounded">
        <ImUsers className="mr-1" />
        {playerLength}
      </span>
    </components.MultiValueContainer>
  );