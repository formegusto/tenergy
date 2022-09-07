import dotenv from "dotenv";
import { FeedbackTarget } from "./Feedback/types";
import { dbConnect, dbDisconnect } from "./models";
import TimeDivisionKMeans from "./TimeDivisionKMeans";

(async function () {
  dotenv.config();
  await dbConnect();

  //   const tdKMeans = new TimeDivisionKMeans(3);

  //   await tdKMeans.appendData();
  //   for (let _ of tdKMeans) await tdKMeans.appendData();

  //   for (let mem of tdKMeans.memory) await mem.save();
  //   const household = await Household.init("아파트1-104-1206");
  const tdKMeans = await TimeDivisionKMeans.get();
  //   await tdKMeans.result();
  const { centroids, centroidsContributeMap } = await tdKMeans.result();
  const target = new FeedbackTarget({
    pat: centroids[0],
    conts: centroidsContributeMap[0],
  });
  const { pat: timePat, conts: timeConts } = target.getTimes(tdKMeans.size);
  console.log(timePat);
  console.log(timeConts);

  const { pat: dayPat, conts: dayConts } = target.getDays();
  console.log(dayPat);
  console.log(dayConts);

  const household = tdKMeans.getHousehold!("아파트1-104-1206");
  if (household) {
    const householdFeedback = new FeedbackTarget(household.feedbackMaterial);
    const { pat: timePat, conts: timeConts } = householdFeedback.getTimes(
      tdKMeans.size
    );
    console.log(timePat);
    console.log(timeConts);

    const { pat: dayPat, conts: dayConts } = householdFeedback.getDays();
    console.log(dayPat);
    console.log(dayConts);
  }

  //   console.log(await tdKMeans.days());
  //   console.log(await tdKMeans.times());

  dbDisconnect();
})();
