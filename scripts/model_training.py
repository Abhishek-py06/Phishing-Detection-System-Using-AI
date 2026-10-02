import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score
from feature_extraction import extract_features
import pickle
import os

def train_model(csv_path):
    df = pd.read_csv(csv_path)

    # Keep only 'phishing' and 'benign'
    df = df[df["type"].isin(["phishing", "benign"])]
    df["label"] = df["type"].map({"benign": 0, "phishing": 1})

    features = df["url"].apply(extract_features).apply(pd.Series)
    X = features
    y = df["label"]

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    model = RandomForestClassifier(n_estimators=100)
    model.fit(X_train, y_train)

    print(f"Accuracy: {accuracy_score(y_test, model.predict(X_test)):.2f}")

    os.makedirs("model", exist_ok=True)
    with open("model/phishing_model.pkl", "wb") as f:
        pickle.dump(model, f)

if __name__ == "__main__":
    train_model("data/malicious_phish.csv")