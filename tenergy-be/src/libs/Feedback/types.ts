import { TimeLabelingData } from "@models/types";
import _ from "lodash";

// 이 시간에 평균 ~정도 아끼면 좋을 거 같아.
export interface IFeedback {
  [key: number]: any;
}

export interface IFeedbackTargetMaterial {
  pat: TimeLabelingData[];
  conts: TimeLabelingData[];
}

export interface IFeedbackTarget {
  pat: { [key: number]: TimeLabelingData[] };
  conts: { [key: number]: number };
}

export class FeedbackTarget {
  pat: TimeLabelingData[];
  conts: TimeLabelingData[];

  constructor({ pat, conts }: IFeedbackTargetMaterial) {
    this.pat = pat;
    this.conts = conts;
  }

  getTimes(timeSize: number): IFeedbackTarget {
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

  getDays(): IFeedbackTarget {
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
