const epochElem = document.querySelector("#epoch")
const learningRateElem = document.querySelector("#learningRate")
const probThresholdElem = document.querySelector("#probThreshold")

const sepalWidthElem = document.querySelector("#sepalWidth")
const sepalLengthElem = document.querySelector("#sepalLength")
const petalWidthElem = document.querySelector("#petalWidth")
const petalLengthElem = document.querySelector("#petalLength")

const trainBtn =  document.querySelector("#trainBtn")
const predictBtn =  document.querySelector("#predictBtn")

export const loggerElem = document.querySelector("#logger")
export const lossContainer = document.querySelector("#lossCanvas")
export const accuracyContainer = document.querySelector("#accuracyCanvas")
export const predictionResult = document.querySelector("#predictionResult")

export const UI = {
  getEpoch() {
    return parseInt(epochElem.value)
  },
  getProbThreshold() {
    return parseFloat(probThresholdElem.value)
  },
  getLearningRate() {
    return parseFloat(learningRateElem.value)
  },
  getPerdictionValues() {
    return {
      sepalWidth: parseFloat(sepalWidthElem.value),
      sepalLength: parseFloat(sepalLengthElem.value),
      petalWidth: parseFloat(petalWidthElem.value),
      petalLength: parseFloat(petalLengthElem.value),
    }
  },
  /**
   * @param {Function} fn 
   */
  onPredictClick(fn) {
    predictBtn.addEventListener("click", fn)
  },
  /**
   * @param {Function} fn 
   */
  onTrainClick(fn) {
    trainBtn.addEventListener("click", fn)
  },
}