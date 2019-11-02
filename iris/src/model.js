import * as tf from "@tensorflow/tfjs";
import * as tfvis from "@tensorflow/tfjs-vis";

import { splitAndTrainTest, getFeaturesTensor, getLabelsTensor, predictionToSpecies } from "./data";
import { UI, lossContainer, accuracyContainer, loggerElem, predictionResult } from "./ui";

const trainingData = getFeaturesTensor();
const trainingLabels = getLabelsTensor();

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
  loggerElem.textContent = "";

  console.log("Training started...");
  await model.fit(trainingData, trainingLabels, {
    epochs: UI.getEpoch(),
    validationSplit: 0.1,
    callbacks: {
      onEpochEnd(epoch, logs) {
        trainLogs.push(logs);
        tfvis.show.history(lossContainer, trainLogs, ["loss", "val_loss"]);
        tfvis.show.history(accuracyContainer, trainLogs, ["acc", "val_acc"]);
        loggerElem.textContent += `Epoch ${epoch + 1}/${UI.getEpoch()}, loss: ${
          logs.loss
        }, accuracy: ${logs.acc}\n`;
        loggerElem.scrollTop = loggerElem.scrollLength;
      },
    },
  });
  console.log("Training complete");
}

UI.onTrainClick(createAndTrainModel);

UI.onPredictClick(() => {
  const { petalLength, petalWidth, sepalLength, sepalWidth } = UI.getPerdictionValues();
  if (!model) {
    predictionResult.textContent = "Model not trained 🙄";
    return;
  }
  const prediction = model.predict(
    tf.tensor2d([[sepalLength, sepalWidth, petalLength, petalWidth]], [1, 4]),
  );
  const flowerSpecie = predictionToSpecies(prediction)[0];
  predictionResult.textContent = flowerSpecie;
  UI.drawImage(flowerSpecie);
});
