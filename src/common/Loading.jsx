import { BeatLoader } from "react-spinners";

function Loading({ size = 15, margin = 4, color = "#000" }) {
  return (
    <div className={`flex justify-center m-4`}>
      <BeatLoader size={size} margin={margin} color={color} />
    </div>
  );
}

export default Loading;
