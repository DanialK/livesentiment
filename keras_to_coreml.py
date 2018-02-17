import coremltools

# Convert a caffe model to a classifier in Core ML
coreml_model = coremltools.converters.keras.convert(
  './model.h5',
  input_names = 'input',
  output_names = 'output',
  class_labels = [0, 1]
)

coreml_model.author = 'Danial Khosravi'
coreml_model.license = 'MIT'
coreml_model.short_description = 'Predicts the sentiment of a tokenized string'
coreml_model.input_description['input'] = 'A String mapped according to the pre-deifned mapping'
coreml_model.output_description['output'] = 'Whether the sentence was positive or negative'

coreml_model.save('model.mlmodel')