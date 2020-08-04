// Exercise 4

const initialState = {
  status: "idle",
  points: 0,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "WIN-POINT":
      return {
        ...state,
        points:state.points - 1
    };;
    case "DECREMENT":
      return {
        ...state,
        points:state.points + 1
    };
    case "START-GAME":
      return {
          ...state,
          status:'playing'
      };
    default:
      throw new Error("Unrecognized action");
  }
};

const Game = () => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  return (
    <>
      Your score: {state.points}.
      {state.status === "playing" && (
        <>
          <button onClick={() => dispatch({type:'WIN-POINT'})}>🍓</button>
          <button onClick={() => dispatch({type:'LOSE-POINT'})}>💀</button>
        </>
      )}
      <button onClick={() => dispatch({type:'START-GAME'})}>Start game</button>
    </>
  );
};
