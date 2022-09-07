import _ from "lodash";
import TimeDivisionKMeans from "../TimeDivisionKMeans";
import { FeedbackTarget, IFeedback } from "./types";

class Feedback {
  sensitivity: number;
  tdKMeans: TimeDivisionKMeans;

  constructor(tdKMeans: TimeDivisionKMeans, sensitivity: number) {
    this.tdKMeans = tdKMeans;
    this.sensitivity = sensitivity;
  }

  static async init(sensitivity: number) {
    const tdKMeans = await TimeDivisionKMeans.get();
    await tdKMeans.result();

    return new Feedback(tdKMeans, sensitivity);
  }

  async time(name: string) {
    const household = this.tdKMeans.getHousehold!(name);

    if (household) {
      const nowGroup = household?.self.group!;
      if (nowGroup === 0) return null;

      const { pat: householdPat, conts: householdConts } = new FeedbackTarget(
        household.feedbackMaterial
      ).getTimes(this.tdKMeans.size);
      const centroidsFeedbackTargets = await this.tdKMeans.times(nowGroup);

      const feedback: IFeedback = {};
      // prev 부터 체크
      for (let feedbackTarget of _.reverse(centroidsFeedbackTargets)) {
        const { pat: centroidPat, conts: centroidConts } = feedbackTarget;
        const feedbackTimes = _.filter(
          _.keys(centroidConts),
          (time) =>
            centroidConts[parseInt(time)] + this.sensitivity <
            householdConts[parseInt(time)]
        );
        _.forEach(feedbackTimes, (time) => {
          feedback[parseInt(time)] =
            _.meanBy(householdPat[parseInt(time)], ({ value }) => value) -
            _.meanBy(centroidPat[parseInt(time)], ({ value }) => value);
        });
      }

      return feedback;
    }

    return null;
  }

  async day(name: string) {
    const household = this.tdKMeans.getHousehold!(name);

    if (household) {
      const nowGroup = household?.self.group!;
      if (nowGroup === 0) return null;

      const { pat: householdPat, conts: householdConts } = new FeedbackTarget(
        household.feedbackMaterial
      ).getDays();
      const centroidsFeedbackTargets = await this.tdKMeans.days(nowGroup);

      const feedback: IFeedback = {};
      // prev 부터 체크
      for (let feedbackTarget of _.reverse(centroidsFeedbackTargets)) {
        const { pat: centroidPat, conts: centroidConts } = feedbackTarget;
        const feedbackDays = _.filter(
          _.keys(centroidConts),
          (day) =>
            centroidConts[parseInt(day)] + this.sensitivity <
            householdConts[parseInt(day)]
        );
        console.log(householdConts, centroidConts);
        _.forEach(feedbackDays, (day) => {
          feedback[parseInt(day)] =
            _.meanBy(householdPat[parseInt(day)], ({ value }) => value) -
            _.meanBy(centroidPat[parseInt(day)], ({ value }) => value);
        });
      }

      return feedback;
    }

    return null;
  }
}

export default Feedback;
