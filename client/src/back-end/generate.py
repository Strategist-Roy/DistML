from sklearn.datasets import make_moons
from sklearn.model_selection import train_test_split

X,y = make_moons(n_samples=10000)

X_train, X_test, y_train, y_test = train_test_split(X,y)

with open('train.csv','w') as f:
    for x,y in zip(X_train,y_train):
        f.write(str(x[0])+','+str(x[1])+','+str(y)+'\n')

with open('test.csv','w') as f:
    for x,y in zip(X_test,y_test):
        f.write(str(x[0])+','+str(x[1])+','+str(y)+'\n')
