import Feedback from "@component/main/Feedback";
import { h3 } from "@styles/font";

function HouseholdFeedbackContainer() {
  return (
    <>
      <h3 className={[h3, "text-slate-900", "mt-24", "mb-12"].join(" ")}>
        전기절약 피드백
      </h3>
      <div className="flex flex-row gap-x-12">
        <Feedback type="time" />
        <Feedback type="day" />
      </div>
    </>
  );
}

export default HouseholdFeedbackContainer;
