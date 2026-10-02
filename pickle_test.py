import pickle
import os

model_path = os.path.join('model', 'phishing_model.pkl')
with open(model_path, 'rb') as file:
    obj = pickle.load(file)
print(type(obj))  # Should print something like <class 'sklearn.ensemble.RandomForestClassifier'>
print(obj)