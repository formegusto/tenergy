import APT from "../APT";
import TimeDivisionKMeans from "../TimeDivisionKMeans";
import _ from "lodash";

class Distributor {
  apt: APT;
  tdKMeans: TimeDivisionKMeans;

  // Distributor의 관심사
  groups?: number[];
  publicPrice?: number;
  contributions?: number[];

  constructor(apt: APT, tdKMeans: TimeDivisionKMeans) {
    this.apt = apt;
    this.tdKMeans = tdKMeans;
  }

  static async init(publicPercentage: number) {
    const apt = await APT.init(publicPercentage);
    const tdKMeans = await TimeDivisionKMeans.get();

    return new Distributor(apt, tdKMeans);
  }

  // 나중에 따른 분류가 끼게 되면 해당 부분은 사라지고,
  // groups,
  async build() {
    this.publicPrice = this.apt.publicBill;

    // const { groups, centroids } = await this.tdKMeans.result();
    // const centroidsSum = _.map(centroids, (centroid) =>
    //   _.sumBy(centroid, ({ value }) => value)
    // );
    // const centroidsSumTotal = _.sum(centroidsSum);
    // const contributions = _.map(centroidsSum, (sum) => sum / centroidsSumTotal);
    // this.contributions = contributions;
    // this.groups = _.map(groups, ({ value }) => value);
  }

  // 기여도 요금
  get priceByContributions() {
    const priPrice = Math.round(this.publicPrice! / this.groups!.length);

    return _.map(this.contributions!, (contribution) =>
      Math.round(contribution * priPrice)
    );
  }

  get distribute() {
    const pbc = this.priceByContributions;

    const priceGroups = _.map(this.groups!, (group) => pbc[group]) as number[];
    const restPrice = this.publicPrice! - _.sum(priceGroups);
    const restPriPrice = Math.round(restPrice / priceGroups.length);
    console.log("restPriPrice", restPriPrice);

    return _.map(priceGroups, (price) => price + restPriPrice);
  }

  get distributeGroup() {
    return _.sortBy(_.uniq(this.distribute));
  }
}

export default Distributor;
