import sys
import json

if __name__ == "__main__":
    train_datas = sys.argv[1]

    print(train_datas)
    data = json.loads(train_datas)
    print(data[0])
