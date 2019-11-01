import * as tf from "@tensorflow/tfjs";
import * as tfvis from '@tensorflow/tfjs-vis';

import { splitAndTrainTest, getFeaturesTensor, getLabelsTensor } from "./data";
import { UI, lossContainer, accuracyContainer, loggerElem } from "./ui";

const { train, test } = splitAndTrainTest(0.8);

const trainingData = getFeaturesTensor(train);
const trainingLabels = getLabelsTensor(train);
const testData = getFeaturesTensor(test);
const testLabels = getLabelsTensor(test);

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
    callbacks: {
      onEpochEnd(epoch, logs) {
        trainLogs.push(logs);
        tfvis.show.history(lossContainer, trainLogs, ['loss', 'val_loss'])
        tfvis.show.history(accuracyContainer, trainLogs, ['acc', 'val_acc'])
        loggerElem.textContent += `Epoch ${epoch + 1}/${UI.getEpoch()}', loss: ${logs.loss}, accuracy: ${logs.acc}\n`;
        loggerElem.scrollTop = loggerElem.scrollHeight
      },
    },
  });
  console.log("Training complete");
}

UI.onTrainClick(createAndTrainModel)

console.log(typeof UI.onPredictClick)

UI.onPredictClick(() => {
  console.log(
    UI.getEpoch(),
    UI.getLearningRate(),
    UI.getPerdictionValues()
  )  
})

(async function() {
  await createAndTrainModel();
  const result = model.predict(testData);
  result.print();
  const arg = tf.argMax(result, 1);

  const arrayResult = testLabels.arraySync();
  console.log(
    arg.arraySync().filter((a, i) => !!arrayResult[i][a]).length / arg.arraySync().length,
  );
})();
