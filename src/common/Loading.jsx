import { BeatLoader } from "react-spinners";

function Loading({ size = 15, margin = "m-4", color = "#000" }) {
  return (
    <div className={`flex justify-center ${margin}`}>
      <BeatLoader size={size} color={color} />
    </div>
  );
}

export default Loading;
