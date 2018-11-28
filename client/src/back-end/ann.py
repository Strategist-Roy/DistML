import numpy as np
from numpy import genfromtxt
import pandas as pd

def sigmoid(z):
	return 1.0/(1.0+np.exp(-z))

class Network:

	def __init__(self, sizes):

		self.num_layers = len(sizes)
		self.biases = [np.random.randn(1,y) for y in sizes[1:]]
		self.weights = [np.random.randn(x, y) for x, y in zip(sizes[:-1], sizes[1:])]

	def feedforward(self, a):
		for w,b in zip(self.weights, self.biases):
			a = sigmoid(np.dot(a,w)+b)
		return a

	def backprop(self, x, y):
		nabla_b = [np.zeros(b.shape) for b in self.biases]
		nabla_w = [np.zeros(w.shape) for w in self.weights]

		a = x
		activations = [x]
		zs = []

		#forward pass
		for w,b in zip(self.weights, self.biases):
			z = np.dot(a,w)+b
			zs.append(z)
			a = sigmoid(z)
			activations.append(a)

		print(activations)
		print(zs)

		#backward pass
		# delta = self.cost_derivative(activations[-1])


	# def feedforward(self, a):
 #        for w, b in zip(self.biases, self.weights):
 #            a = sigmoid(np.dot(w, a)+b)
 #        return a

if __name__ == '__main__':

	net = Network([2,3,4,3])

	data = genfromtxt('dataset_.csv',delimiter=',')
	shape = data.shape

	X = data[:,:-1]    #skip last column
	y = data[:,-1]	   #last column is the target

	X=X.reshape(X.shape[0],1,-1)
	y=y.reshape(y.shape[0],1,-1)

	# for inp,outp in zip(X[:3],y[:3]):
	net.backprop(X[0],y[0])