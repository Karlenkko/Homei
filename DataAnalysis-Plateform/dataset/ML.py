import numpy as np 
import tensorflow as tf 
from tensorflow.keras.layers import Dropout, Dense, SimpleRNN
import matplotlib.pyplot as plt 
import os
import pandas as pd 
from sklearn.preprocessing import MinMaxScaler
from sklearn.metrics import mean_squared_error, mean_absolute_error
import math


orders = pd.read_csv("dinein.csv")

training_set = orders.iloc[0:1126-120, 1].values
test_set = orders.iloc[1126-120:, 1].values

training_set = training_set.reshape((-1, 1))
test_set = test_set.reshape((-1, 1))

# Normalization
sc = MinMaxScaler(feature_range=(0, 1))
training_set_scaled = sc.fit_transform(training_set)
test_set = sc.transform(test_set)	

x_train = []
y_train = []

x_test = []
y_test = []

# produce the train set and test set, each 60 data as a sample (cause we will predict the 61th according to them)
for i in range(60, len(training_set_scaled)):
	x_train.append(training_set_scaled[i-60:i])
	y_train.append(training_set_scaled[i])

np.random.seed(7)
np.random.shuffle(x_train)
np.random.seed(7)
np.random.shuffle(y_train)
tf.random.set_seed(7)

x_train, y_train = np.array(x_train), np.array(y_train)

# transform the dimension to fit the RNN
x_train = np.reshape(x_train, (x_train.shape[0], 60, 1))


for i in range(60, len(test_set)):
	x_test.append(test_set[i-60:i, 0])
	y_test.append(test_set[i, 0])

x_test, y_test = np.array(x_test), np.array(y_test)
x_test = np.reshape(x_test, (x_test.shape[0], 60, 1))

model = tf.keras.Sequential([
	SimpleRNN(80, return_sequences = True),
	Dropout(0.2),
	SimpleRNN(100),
	Dropout(0.2),
	Dense(1)
])

model.compile(optimizer = tf.keras.optimizers.Adam(0.001),
			  loss = "mean_squared_error")

checkpoint_save_path = "./checkpoint/stock2.ckpt"

if os.path.exists(checkpoint_save_path + '.index'):
    print('-------------load the model-----------------')
    model.load_weights(checkpoint_save_path)

cp_callback = tf.keras.callbacks.ModelCheckpoint(filepath=checkpoint_save_path,
                                                 save_weights_only=True,
                                                 save_best_only=True,
                                                 monitor='val_loss')

history = model.fit(x_train, y_train, batch_size=64, epochs=50, validation_data=(x_test, y_test), validation_freq=1,
                    callbacks=[cp_callback])

model.summary()

file = open('./weights.txt', 'w')  
for v in model.trainable_variables:
    file.write(str(v.name) + '\n')
    file.write(str(v.shape) + '\n')
    file.write(str(v.numpy()) + '\n')
file.close()

loss = history.history['loss']
val_loss = history.history['val_loss']

# plt.plot(loss, label='Training Loss')
# plt.show()
# plt.plot(val_loss, label='Validation Loss')
# plt.title('Training and Validation Loss')
# plt.legend()
# plt.show()

# ################## predict ######################
predicted_stock_price = model.predict(x_test)

predicted_stock_price = sc.inverse_transform(predicted_stock_price)

real_stock_price = sc.inverse_transform(test_set[60:])


# plt.plot(real_stock_price, color='red', label='MaoTai Stock Price')
# plt.plot(predicted_stock_price, color='blue', label='Predicted MaoTai Stock Price')
# plt.title('MaoTai Stock Price Prediction')
# plt.xlabel('Time')
# plt.ylabel('MaoTai Stock Price')
# plt.legend()
# plt.show()

# ##########evaluate##############

# mse = mean_squared_error(predicted_stock_price, real_stock_price)

# rmse = math.sqrt(mean_squared_error(predicted_stock_price, real_stock_price))

# mae = mean_absolute_error(predicted_stock_price, real_stock_price)
# print('mean_squared_error: %.6f' % mse)
# print('mean_squared_error: %.6f' % rmse)
# print('mean_absolute_error: %.6f' % mae)






