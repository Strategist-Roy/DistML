import numpy as np
from numpy import genfromtxt
import pandas as pd
from sklearn.preprocessing import OneHotEncoder

def sigmoid(z):
	return 1.0/(1.0+np.exp(-z))

def sigmoid_prime(z):
	return sigmoid(z)*(1-sigmoid(z))

class Network:

	def __init__(self, sizes):

		self.num_layers = len(sizes)
		self.biases = [np.random.randn(y) for y in sizes[1:]]
		self.weights = [np.random.randn(x, y) for x, y in zip(sizes[:-1], sizes[1:])]

	def feedforward(self, a):
		for w,b in zip(self.weights, self.biases):
			a = sigmoid(np.dot(a,w)+b)
		return a

	def cost_derivative(self, output, y):
		return (output - y)

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

		# print(activations)

		#backward pass
		delta = self.cost_derivative(activations[-1],y) * sigmoid_prime(zs[-1])
		# print(nabla_b, nabla_w)
		# print(zs[-1],activations[-1],y,delta)
		nabla_b[-1] = delta
		nabla_w[-1] = np.dot(activations[-2].reshape(-1,1),delta.reshape(1,-1))

		for l in range(2, self.num_layers):
			z = zs[-l]
			sp = sigmoid_prime(z)
			print(sp,nabla_b[-l].shape,self.weights[-l+1].shape,delta.shape)
			break
			# delta = np.dot(self.weights[-l+1].transpose(), delta) * sp
			# nabla_b[-l] = delta
			# nabla_w[-l] = np.dot(activations[-l-1].reshape(-1,1),delta.reshape(1,-1))
		return (nabla_b, nabla_w)

	# def feedforward(self, a):
 #        for w, b in zip(self.biases, self.weights):
 #            a = sigmoid(np.dot(w, a)+b)
 #        return a

if __name__ == '__main__':

	net = Network([2,3,4,2])

	data = genfromtxt('dataset_.csv',delimiter=',')
	shape = data.shape

	X = data[:,:-1]    #skip last column
	y = data[:,-1]	   #last column is the target

	# X=X.reshape(X.shape[0],1,-1)
	y=y.reshape(-1,1)

	enc=OneHotEncoder(categories='auto')
	y=enc.fit_transform(y).toarray()

	# for inp,outp in zip(X[:3],y[:3]):
	net.backprop(X[0],y[0])
	# print(y[:3])