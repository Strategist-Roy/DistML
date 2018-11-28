from sklearn.datasets import make_moons

X,Y = make_moons(n_samples=10000)
print(X.shape,Y.shape)

with open('dataset_.csv','w') as f:
    for x,y in zip(X,Y):
        f.write(str(x[0])+','+str(x[1])+','+str(y)+'\n')
