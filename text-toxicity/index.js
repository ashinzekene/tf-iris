import * as toxicity from '@tensorflow-models/toxicity';

(async () => {
  const sentences = [
    "Shut up, you piss of shit",
    "Hello bro, what's up"
  ]

  // Load model with a specified
  const model = await toxicity.load(0.9)

  //  Classify text
  const predictions = await model.classify(sentences)
  
  // Log out the result
  console.log(predictions)
})()
