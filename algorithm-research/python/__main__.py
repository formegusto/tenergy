import sys
import json
from sklearn.tree import DecisionTreeClassifier as DTC

if __name__ == "__main__":
    train_datas = sys.argv[1]
    data = json.loads(train_datas)
    train_X, train_Y, pred_X, pred_Y = data

    dtc = DTC()
    dtc.fit(train_X, train_Y)
    predict_labels = dtc.predict(pred_X)

    print(",".join(predict_labels.astype(str).tolist()))
