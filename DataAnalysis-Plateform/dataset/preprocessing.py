import pandas as pd
import numpy as np 
import re
import tensorflow as tf
from tensorflow.keras.layers import Dropout, Dense, GRU
import os
import joblib



""" 
predict orders
"""
sc = joblib.load('scaler.gz')

orders = pd.read_csv("dinein.csv")
date = "20190703"

orders['OrderDate'] = orders['OrderDate'].astype(str)

index = orders[orders['OrderDate'] == date].index[0]

orders2pred = orders.iloc[index-59: index+1, 1]


data = orders2pred.to_numpy()
data = data.reshape((-1, 1))
data = sc.transform(data)


np.reshape(data, (1,60))
predictData = []

dataSet = []
dataSet.append(data)

dataSet = np.array(dataSet)
dataSet = np.reshape(dataSet, (dataSet.shape[0], 60, 1))
dataSet = dataSet.astype(np.float64)

model = tf.keras.Sequential([
    GRU(80, return_sequences=True),
    Dropout(0.2),
    GRU(100),
    Dropout(0.2),
    Dense(1)
])

checkpoint_save_path = "./checkpoint/stock.ckpt"

if os.path.exists(checkpoint_save_path + '.index'):
    print('-------------load the model-----------------')
    model.load_weights(checkpoint_save_path)



for i in range(30):
	pred = model.predict(dataSet)
	predicted_orders = sc.inverse_transform(pred)
	# print(predicted_orders)
	predictData.append(predicted_orders[0][0])
	data[:59] = data[1:]
	data[59] = pred[0][0]

	dataSet = []
	dataSet.append(data)

	dataSet = np.array(dataSet)
	dataSet = np.reshape(dataSet, (dataSet.shape[0], 60, 1))
	dataSet = dataSet.astype(np.float64)

print(predictData)











"""
filter to save only order date and item name, transform the date to the right form

"""

# def changeDate(date):
# 	str = re.sub(r".\d\d:\d\d", '', date)
# 	res = str[6:] + str[3:5] + str[0:2]
# 	return res


# data = pd.read_csv('restaurant-1-orders.csv', usecols=['OrderDate', 'ItemName'])
# orderTotalByDay = data.groupby('OrderDate', as_index=False).size()
# data['OrderDate'].astype(str)
# data['OrderDate'] = data['OrderDate'].apply(changeDate)

# data.to_csv('data1.csv',index=False)



"""

"""

# dateStart = "20190730"
# dateEnd = "20190720"
# food = "Chicken Tikka Masala"

# data = pd.read_csv('result.csv')
# data = data.loc[(data['OrderDate'] <= int(dateStart)) & (data['OrderDate'] >= int(dateEnd))]

# orderTotalByDay = data.groupby('OrderDate', as_index=False).size()
# # orderTotalByDay.to_csv('data2.csv',index=False)

# dataCount = data.groupby(['OrderDate', 'ItemName'], as_index=False).size()
# dataCount['ItemName'] = dataCount.ItemName.astype(str)
# dataCount = dataCount.loc[dataCount['ItemName'] == food]
# # dataCount.to_csv('data3.csv',index=False)

# res = pd.merge(orderTotalByDay, dataCount, on=["OrderDate"], how="outer")
# res = res['size_y'].fillna(0)
# print(res.to_numpy())

"""

"""

# def changeDate(date):
# 	str = re.sub(r".\d\d:\d\d", '', date)
# 	res = str[6:] + str[3:5] + str[0:2]
# 	return res

# def changeDate2(date):
# 	str = re.sub(r"\d\d/\d\d/\d\d\d\d.", '', date)
# 	res = str[0:2] + str[3:]
# 	return res


# date = "20190730"
# time = [1600, 1630, 1700, 1730, 1800, 1830, 1900, 1930, 2000, 2030, 2100, 2130, 2200, 2230, 2300, 2330, 2400]


# data = pd.read_csv('restaurant-1-orders.csv', usecols=['OrderDate'])
# data['OrderDate'].astype(str)
# data['OrderDay'] = data['OrderDate'].apply(changeDate)
# data['OrderTime'] = data['OrderDate'].apply(changeDate2)

# data['OrderDay'] = data.OrderDay.astype(str).astype(int)
# data['OrderTime'] = data.OrderTime.astype(str).astype(int)


# data = data.loc[data['OrderDay'] == int(date)]

# for i in range(len(time)-1):
# 	tmp = data.loc[(data['OrderTime']>=time[i]) & (data['OrderTime']<=time[i+1])]['OrderTime'].count()
# 	print(tmp)


# data.to_csv('data4.csv',index=False)


# date = "20210407"


# dataMenu = pd.read_csv('ingredients_menu.csv')

# dataMenu = dataMenu.to_numpy()

# menu = {}

# [rows, cols] = dataMenu.shape

# for i in range(rows):
# 	if dataMenu[i, 0] in menu:
# 	    menu[dataMenu[i,0]][dataMenu[i,1]] = dataMenu[i, 2]
# 	else:
# 		menu[dataMenu[i,0]] = {}
# 		menu[dataMenu[i,0]][dataMenu[i,1]] = dataMenu[i, 2]
# 		menu[dataMenu[i,0]]["price"] = dataMenu[i, 3]




# dataStock = pd.read_csv('myDataStock.csv')

# def changeDate(date):
# 	res = date[0:4] + date[5:7] + date[8:10]
# 	return res

 
# dataStock['Stock'] = dataStock.Stock.astype(str).astype(int)

# dataStock['Date'] = dataStock['Date'].apply(changeDate)

# dataStock = dataStock.loc[(dataStock['Date'] == date) & (dataStock['Stock']>150)]
# dataStock = dataStock.to_numpy()

# dataStock = dataStock[np.argsort(dataStock[:,3])]
# dataStock = np.flip(dataStock, 0)

# stock = {}

# [rows, cols] = dataStock.shape



# for i in range(rows):
# 	stock[dataStock[i, 2]] = dataStock[i, 3]/300

# print(stock)
# print("---------------------------------------------")

# nodish = {'name': '', 'detail': 'no more dish to be recommended'}

# score = [0, 0, 0]
# dishes = [nodish, nodish, nodish]


# def recommend(score, myscore):
# 	for i in range(len(score)):
# 		if myscore>score[i]:
# 			return i
# 	return -1

# for key, value in menu.items():
# 	myScore = 0
# 	detail = ""
# 	for key2, value2 in value.items():
# 		if key2 == 'price':
# 			myScore += (value2/40)
# 			continue
# 		if key2 in stock:
# 			myScore += (stock[key2]*value2)
# 			continue
# 		if detail == "":
# 			detail = detail + key2
# 		else:
# 			detail = detail + ", " + key2

# 	index = recommend(score, myScore)

# 	if index >= 0:
# 		score[index] = myScore
# 		dishes[index] = {'name': key, 'detail': "Need more " + detail + " to prepare this dish !"}

# print(dishes)































