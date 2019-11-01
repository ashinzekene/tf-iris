const epochElem = document.querySelector("#epoch")
const learningRateElem = document.querySelector("#learningRate")

const sepalWidthElem = document.querySelector("#sepalWidth")
const sepalHeightElem = document.querySelector("#sepalHeight")
const petalWidthElem = document.querySelector("#petalWidth")
const petalHeightElem = document.querySelector("#petalHeight")


const trainBtn =  document.querySelector("#trainBtn")
const predictBtn =  document.querySelector("#predictBtn")

export const loggerElem = document.querySelector("#logger")
export const lossContainer = document.querySelector("#lossCanvas")
export const accuracyContainer = document.querySelector("#accuracyCanvas")

export const UI = {
  getEpoch() {
    return parseInt(epochElem.value)
  },
  getLearningRate() {
    return parseFloat(learningRateElem.value)
  },
  getPerdictionValues() {
    return {
      sepalWidth: parseFloat(sepalWidthElem.value),
      sepalHeight: parseFloat(sepalHeightElem.value),
      petalWidth: parseFloat(petalWidthElem.value),
      petalHeight: parseFloat(petalHeightElem.value),
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