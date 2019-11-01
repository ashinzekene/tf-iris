import * as tf from "@tensorflow/tfjs";
import * as tfvis from '@tensorflow/tfjs-vis';

import { splitAndTrainTest, getFeaturesTensor, getLabelsTensor, predictionToSpecies } from "./data";
import { UI, lossContainer, accuracyContainer, loggerElem, predictionResult } from "./ui";

const { train, test } = splitAndTrainTest(0.9);

const trainingData = getFeaturesTensor(train);
const trainingLabels = getLabelsTensor(train);
const testData = getFeaturesTensor(test);
const testLabels = getLabelsTensor(test);

/**
 * @type {import("@tensorflow/tfjs").Sequential}
 */
let model;

async function createAndTrainModel() {
  model = tf.sequential({
    layers: [
      tf.layers.dense({
        inputShape: [trainingData.shape[1]],
        units: 10,
        activation: "sigmoid",
      }),
      tf.layers.dense({
        units: trainingLabels.shape[1],
        activation: "softmax",
      }),
    ],
  });

  const optimizer = tf.train.adam(UI.getLearningRate());
  model.compile({
    optimizer,
    loss: "categoricalCrossentropy",
    metrics: ["accuracy"],
  });

  const trainLogs = [];
  loggerElem.textContent = ""

  console.log("Training started");
  await model.fit(trainingData, trainingLabels, {
    epochs: UI.getEpoch(),
    validationSplit: 0.1,
    callbacks: {
      onEpochEnd(epoch, logs) {
        trainLogs.push(logs);
        tfvis.show.history(lossContainer, trainLogs, ['loss', 'val_loss'])
        tfvis.show.history(accuracyContainer, trainLogs, ['acc', 'val_acc'])
        loggerElem.textContent += `Epoch ${epoch + 1}/${UI.getEpoch()}', loss: ${logs.loss}, accuracy: ${logs.acc}\n`;
        loggerElem.scrollTop = loggerElem.scrollLength
      },
    },
  });
  console.log("Training complete");
}

UI.onTrainClick(createAndTrainModel)


UI.onPredictClick(() => {
  const {
    petalLength, petalWidth, sepalLength, sepalWidth,
   } = UI.getPerdictionValues()
  if (!model) return
  const prediction = model.predict(tf.tensor2d([
    [sepalLength, sepalWidth, petalWidth, petalLength]
  ], [1, 4]))
  predictionResult.textContent = predictionToSpecies(prediction)[0]
})
