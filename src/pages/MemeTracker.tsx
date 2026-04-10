import MemeDisplay from "../components/MemeDisplay";
import Tracker from "../components/Tracker";

const MemeTracker = ({ emotion, setEmotion}: any) => {
  return (
    <div className="flex items-center justify-center flex-1">
      <Tracker setEmotion={setEmotion} />
      <MemeDisplay emotion={emotion} />
    </div>
  );
};

export default MemeTracker;
