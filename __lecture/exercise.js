const { Switch } = require("react-router-dom");

function reducer(state, action) {
  switch (action.type) {
    case "REQUEST-DATA": {
      return "loading";
    }
    case "RECEIVE-DATA": {
      return "idle";
    }
    case "RECEIVE-ERROR": {
      return "error";
    }
    default:
      throw new Error("unrecognized action");
  }
}
function App() {
  const [state, dispatch] = React.useReducer(reducer, "idle");

  return (
    <form
      onSubmit={() => {
        dispatch({ type: "REQUEST-DATA" });
        getStatusFromServer()
          .then(() => {
            dispatch({ type: "RECEIVE-DATA" });
          })
          .catch(() => {
            dispatch({ type: "RECEIVE-ERROR" });
          });
      }}
    >
      status : {state}
      <button>Submit</button>
    </form>
  );
}
