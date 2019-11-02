import * as tf from "@tensorflow/tfjs";

const getTruncatedMobileNet = async () => {
  // Load a pretrained model **mobilenet**
  const mobilenet = await tf.loadLayersModel(
    "https://storage.googleapis.com/tfjs-models/tfjs/mobilenet_v1_0.25_224/model.json",
  );

  // Get a layer from the model
  const layer = mobilenet.getLayer("conv_pw_13_relu");

  // Truncate the
  return tf.model({ inputs: mobilenet.inputs, outputs: layer.output });
};

const getNewModel = async () => {
  const model = tf.sequential({
    layers: [
      tf.layers.flatten({ inputShape: [7, 7, 256] }),
      tf.layers.dense({
        units: ui.getDenseUnits(),
        activation: "relu",
        kernelInitializer: "varianceScaling",
        useBias: true,
      }),
      tf.layers.dense({
        units: NUM_CLASSES,
        kernelInitializer: "varianceScaling",
        useBias: false,
        activation: "softmax",
      }),
    ],
  });
  const optimizer = tf.train.adam(ui.getLearningRate());
  model.compile({ optimizer: optimizer, loss: "categoricalCrossentropy" });
};

truncatedMobileNet
  .then(model => model.predict(tf.zeros([1, 224, 224, 3])))
  .then(result => {
    // result
    console.log(result.shape);
  });
