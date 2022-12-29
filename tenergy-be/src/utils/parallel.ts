import _, { ArrayIterator } from "lodash";

export async function arrayParallel<T, TResult>(
  collection: T[] | null | undefined,
  iteratee: ArrayIterator<T, TResult>
): Promise<TResult[]> {
  return await Promise.all(_.map(collection, iteratee));
}
