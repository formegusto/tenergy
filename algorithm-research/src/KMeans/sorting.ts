import KMeans from ".";
import _ from "lodash";

function sorting(
  this: KMeans
): [newLabels: number[], newCentroids: number[][]] {
  const centroidSum = _.map(this.centroids!, _.sum);
  const sortedSum = _.sortBy(centroidSum);
  const centroidRank = _.map(this.centroids, (centroid) =>
    _.sortedIndex(sortedSum, _.sum(centroid))
  );

  const newLabels = _.fill(new Array(this.labels!.length), -1);
  _.forEach(
    this.labels,
    (label, idx) => (newLabels[idx] = centroidRank[label])
  );

  const newCentroids = new Array(this.centroids?.length);
  _.forEach(
    this.centroids,
    (centroid, idx) => (newCentroids[centroidRank[idx]] = centroid)
  );

  // newLabels, newCentroid
  return [newLabels, newCentroids];
}

export default sorting;
