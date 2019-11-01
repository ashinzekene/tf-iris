import * as mobilenet from '@tensorflow-models/mobilenet';


(async () => {
  // Get the image.
  const img = document.querySelector('img');
  const result = document.querySelector('.result');
  
  // Load the model.
  result.textContent = "Model loading..."
  const model = await mobilenet.load();
  
  // Classify the image.
  result.textContent = "Predicting..."
  const predictions = await model.classify(img);
  
  // Print out the result
  result.textContent = JSON.stringify(predictions, null, '\t\t');
})()