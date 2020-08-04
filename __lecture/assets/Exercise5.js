// Exercise 5
import sendDataToServer from "./some-madeup-place";
import FormField from "./some-other-madeup-place";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET-FIRSTNAME":
      return {
        ...state,
        firstName: action.value,
      };
    case "SET-LASTNAME":
      return {
        ...state,
        lastName: action.value,
      };
    case "SET-EMAIL":
      return {
        ...state,
        email: action.value,
      };
    case "RESET-FORM":
      return initialState;
    default:
      return state;
  }
};

const SignUpForm = () => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  return (
    <form onSubmit={sendDataToServer}>
      <FormField
        label="First Name"
        value={firstName}
        onChange={(ev) =>
          dispatch({ type: "SET-FIRSTNAME", value: ev.target.value })
        }
      />
      <FormField
        label="Last Name"
        value={lastName}
        onChange={(ev) =>
          dispatch({ type: "SET-LASTNAME", value: ev.target.value })
        }
      />
      <FormField
        label="Email"
        value={email}
        onChange={(ev) =>
          dispatch({ type: "SET-EMAIL", value: ev.target.value })
        }
      />

      <button>Submit</button>
      <button
        onClick={(ev) => {
          ev.preventDefault();
          dispatch({ type: "RESET-FORM" });
        }}
      >
        Reset
      </button>
    </form>
  );
};
