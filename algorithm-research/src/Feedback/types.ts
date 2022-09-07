import { TimeLabelingData } from "../models/types";
import _ from "lodash";

export class FeedbackTarget {
  pat: TimeLabelingData[];
  conts: TimeLabelingData[];

  constructor(pat: TimeLabelingData[], conts: TimeLabelingData[]) {
    this.pat = pat;
    this.conts = conts;
  }

  getTimes(timeSize: number) {
    const timeTargets = _.range(0, 24, timeSize);

    const pat = _.map(timeTargets, (time) =>
      _.filter(
        this.pat,
        (p) =>
          p.time.getUTCHours() >= time && p.time.getUTCHours() < time + timeSize
      )
    );

    const conts = _.map(timeTargets, (time) =>
      _.meanBy(
        _.filter(this.conts, (c) => c.time.getUTCHours() === time),
        ({ value }) => value
      )
    );

    return {
      pat: _.zipObject(timeTargets, pat),
      conts: _.zipObject(timeTargets, conts),
    };
  }

  getDays() {
    const dayTargets = _.range(0, 7);

    const pat = _.map(dayTargets, (day) =>
      _.filter(this.pat, (p) => p.time.getUTCDay() === day)
    );

    const conts = _.map(dayTargets, (day) =>
      _.meanBy(
        _.filter(this.conts, (c) => c.time.getUTCDay() === day),
        ({ value }) => value
      )
    );

    return {
      pat: _.zipObject(dayTargets, pat),
      conts: _.zipObject(dayTargets, conts),
    };
  }
}
