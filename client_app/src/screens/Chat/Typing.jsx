import "./Typing.scss";

function Typing() {
  return (
    <div className="typing" role="alert" aria-busy>
      <div className="typing__dot" />
      <div className="typing__dot" />
      <div className="typing__dot" />
    </div>
  );
}

export default Typing;
