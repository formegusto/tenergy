import KMeans from ".";
import _ from "lodash";

function sorting(
  this: KMeans
): [newLabels: number[], newCentroids: number[][]] {
  //   const centroidSum = _.map(this.centroids!, _.sum);
  const sorted = _.sortBy(this.centroids);
  const centroidRank = _.map(this.centroids, (centroid) =>
    _.sortedIndex(sorted, centroid)
  );

  const newLabels = _.fill(new Array(this.labels!.length), -1);
  _.forEach(
    this.labels,
    (label, idx) => (newLabels[idx] = centroidRank[label])
  );

  // newLabels, newCentroid
  return [newLabels, sorted];
}

export default sorting;
