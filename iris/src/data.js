import * as tf from "@tensorflow/tfjs";
import iris from "./iris.json";

export const data = (function shuffle(irisData) {
  for (var i = irisData.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = irisData[i];
      irisData[i] = irisData[j];
      irisData[j] = temp;
  }
  return irisData
})([...iris])

/**
 * Split to train and test set
 * @param {number} factor factor to split
 */
export function splitAndTrainTest(factor) {
  const point = Math.ceil(factor * data.length);
  return {
    train: data.slice(0, point),
    test: data.slice(point)
  };
}

/**
 * Convert data to sensors
 * @param {any[]} data
 * @returns {import("@tensorflow/tfjs").Tensor2D}
 */
export function getFeaturesTensor(data) {
  const features = data.map(feature => [
    feature.sepal_length,
    feature.sepal_width,
    feature.petal_length,
    feature.petal_width
  ]);
  return tf.tensor2d(features, [data.length, 4]);
}

/**
 * One hot encoding of labels  \
 * [1,0,0] === "setosa"  \
 * [0,1,0] === "virginia"  \
 * [0,0,1] === "versicolor"
 * @param {any[]} data
 * @returns {import("@tensorflow/tfjs").Tensor2D}
 */
export function getLabelsTensor(data) {
  const labels = data.map(feature => [
    feature.species === "setosa" ? 1 : 0,
    feature.species === "virginica" ? 1 : 0,
    feature.species === "versicolor" ? 1 : 0
  ]);
  return tf.tensor2d(labels, [data.length, 3]);
}
