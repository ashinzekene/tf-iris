import images from './*.jpg'

const epochElem = document.querySelector("#epoch");
const learningRateElem = document.querySelector("#learningRate");

const sepalWidthElem = document.querySelector("#sepalWidth");
const sepalLengthElem = document.querySelector("#sepalLength");
const petalWidthElem = document.querySelector("#petalWidth");
const petalLengthElem = document.querySelector("#petalLength");

const imgElem = document.querySelector("img");

const trainBtn = document.querySelector("#trainBtn");
const predictBtn = document.querySelector("#predictBtn");

export const loggerElem = document.querySelector("#logger");
export const lossContainer = document.querySelector("#lossCanvas");
export const accuracyContainer = document.querySelector("#accuracyCanvas");
export const predictionResult = document.querySelector("#predictionResult");

export const UI = {
  getEpoch() {
    return parseInt(epochElem.value);
  },
  getLearningRate() {
    return parseFloat(learningRateElem.value);
  },
  getPerdictionValues() {
    return {
      sepalWidth: parseFloat(sepalWidthElem.value),
      sepalLength: parseFloat(sepalLengthElem.value),
      petalWidth: parseFloat(petalWidthElem.value),
      petalLength: parseFloat(petalLengthElem.value),
    };
  },
  /**
   * @param {Function} fn
   */
  onPredictClick(fn) {
    predictBtn.addEventListener("click", fn);
  },
  /**
   * @param {Function} fn
   */
  onTrainClick(fn) {
    trainBtn.addEventListener("click", fn);
  },
  /**
   * Renders an image of an iris specie
   * @param {string} specie the specie to draw
   */
  drawImage(specie) {
    imgElem.style.display = "block";
    imgElem.src = images[`iris_${specie}`];
  },
  removeImage() {
    imgElem.style.display = "none";
    imgElem.src = "";
  },
};
