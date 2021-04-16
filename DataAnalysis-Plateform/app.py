from flask import Flask, render_template, request
import pandas as pd 
import numpy as np 
import re
import tensorflow as tf
from tensorflow.keras.layers import Dropout, Dense, GRU
import os
import joblib


app = Flask(__name__)


@app.route('/')
def home():
	
	return render_template('home.html')


@app.route('/topTen', methods=['GET'])
def topTen():

	source = []
	number = []

	date = "2019-07-30"
	orderDate = "20190730"

	if request.args.get("date") != None:
		date = request.args.get("date")
		orderDate = re.sub(r"-", '', request.args.get("date"))


	


	data = pd.read_csv('dataset/result.csv')

	orderTotalByDay = data.groupby('OrderDate', as_index=False).size()

	#data['OrderDate'].astype(str)
	#data['OrderDate'] = data['OrderDate'].apply(changeDate)
	data['OrderDate'] = data.OrderDate.astype(str).astype(int)



	data = data.loc[data['OrderDate'] == int(orderDate)]



	dataCount = data.groupby('ItemName', as_index=False)['OrderDate'].count()
	dataArray = dataCount.to_numpy()
	dataArray = dataArray[np.argsort(dataArray[:,1])]

	[rows, cols] = dataArray.shape

	for i in range(10):
		number.append(int(dataArray[rows-i-1,1]))
		source.append(str(dataArray[rows-i-1,0]))

	return render_template("topTen.html", source=source, number=number, date=date)


@app.route('/onedish', methods=['GET'])
def onedish():

	dateStart = "20190730"
	dateEnd = "20190720"
	
	date1 = "2019-07-30"
	date2 = "2019-07-20"

	food = "Chicken Tikka Masala"

	if request.args.get("date1") != None:
		date1 = request.args.get("date1")
		dateStart = re.sub(r"-", '', request.args.get("date1"))
		date2 = request.args.get("date2")
		dateEnd = re.sub(r"-", '', request.args.get("date2"))
		food = request.args.get("food")

	data = pd.read_csv('dataset/result.csv')
	dataPrice = pd.read_csv('dataset/restaurant-1-products-price.csv')
	data = data.loc[(data['OrderDate'] <= int(dateStart)) & (data['OrderDate'] >= int(dateEnd))]

	orderTotalByDay = data.groupby('OrderDate', as_index=False).size()

	dataCount = data.groupby(['OrderDate', 'ItemName'], as_index=False).size()
	dataCount['ItemName'] = dataCount.ItemName.astype(str)
	dataCount = dataCount.loc[dataCount['ItemName'] == food]
	res = pd.merge(orderTotalByDay, dataCount, on=["OrderDate"], how="outer")
	res = res['size_y'].fillna(0)


	date = []
	total = []
	dish = []

	dataArray = orderTotalByDay.to_numpy()
	res = res.to_numpy()

	[rows, cols] = dataArray.shape

	for i in range(rows):
		date.append(dataArray[i,0])
		total.append(dataArray[i,1])
		dish.append(res[i])

	dataPrice = dataPrice.to_numpy()
	[rows, cols] = dataPrice.shape

	foodlist = []
	for i in range(rows):
		foodlist.append(dataPrice[i,0])


	return render_template("onedish.html", date=date, total=total, dish=dish, date1=date1, date2=date2, food=food, foodlist=foodlist)


@app.route('/orders', methods=['GET'])
def orders():

	def changeDate(date):
		str = re.sub(r".\d\d:\d\d", '', date)
		res = str[6:] + str[3:5] + str[0:2]
		return res

	def changeDate2(date):
		str = re.sub(r"\d\d/\d\d/\d\d\d\d.", '', date)
		res = str[0:2] + str[3:]
		return res


	date1 = "2019-07-30"
	date = "20190730"


	if request.args.get("date1") != None:
		date1 = request.args.get("date1")
		date = re.sub(r"-", '', request.args.get("date1"))
		

	timeLabel = ["16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30", "22:00", "22:30", "23:00", "23:30"]
	time = [1600, 1630, 1700, 1730, 1800, 1830, 1900, 1930, 2000, 2030, 2100, 2130, 2200, 2230, 2300, 2330, 2400]


	data = pd.read_csv('dataset/restaurant-1-orders.csv', usecols=['OrderDate'])
	data['OrderDate'].astype(str)
	data['OrderDay'] = data['OrderDate'].apply(changeDate)
	data['OrderTime'] = data['OrderDate'].apply(changeDate2)

	data['OrderDay'] = data.OrderDay.astype(str).astype(int)
	data['OrderTime'] = data.OrderTime.astype(str).astype(int)


	data = data.loc[data['OrderDay'] == int(date)]

	ordersByTime = []

	for i in range(len(time)-1):
		tmp = data.loc[(data['OrderTime']>=time[i]) & (data['OrderTime']<=time[i+1])]['OrderTime'].count()
		ordersByTime.append(tmp)



	return render_template("orders.html", ordersByTime=ordersByTime, timeLabel=timeLabel, date1=date1)


@app.route('/stock', methods=['GET'])
def stock():


	date = "2021-04-01"
	stockDate = "20210401"

	if request.args.get("date") != None:
		date = request.args.get("date")
		stockDate = re.sub(r"-", '', request.args.get("date"))


	dataMenu = pd.read_csv('dataset/ingredients_menu.csv')

	dataMenu = dataMenu.to_numpy()

	menu = {}

	[rows, cols] = dataMenu.shape

	for i in range(rows):
		if dataMenu[i, 0] in menu:
		    menu[dataMenu[i,0]][dataMenu[i,1]] = dataMenu[i, 2]
		else:
			menu[dataMenu[i,0]] = {}
			menu[dataMenu[i,0]][dataMenu[i,1]] = dataMenu[i, 2]
			menu[dataMenu[i,0]]["price"] = dataMenu[i, 3]




	dataStock = pd.read_csv('dataset/myDataStock.csv')

	def changeDate3(date):
		res = date[0:4] + date[5:7] + date[8:10]
		return res

	 
	dataStock['Stock'] = dataStock.Stock.astype(str).astype(int)

	dataStock['Date'] = dataStock['Date'].apply(changeDate3)

	dataStock = dataStock.loc[(dataStock['Date'] == stockDate) & (dataStock['Stock']>150)]
	dataStock = dataStock.to_numpy()

	dataStock = dataStock[np.argsort(dataStock[:,3])]
	dataStock = np.flip(dataStock, 0)

	stock = {}
	stockData = {}

	[rows, cols] = dataStock.shape



	for i in range(rows):
		stock[dataStock[i, 2]] = dataStock[i, 3]/300
		stockData[dataStock[i, 2]] = dataStock[i, 3]

	nodish = {'name': '', 'detail': 'no more dish to be recommended'}

	score = [0, 0, 0]
	dishes = [nodish, nodish, nodish]


	def recommend(score, myscore):
		for i in range(len(score)):
			if myscore>score[i]:
				return i
		return -1

	for key, value in menu.items():
		myScore = 0
		detail = ""
		for key2, value2 in value.items():
			if key2 == 'price':
				myScore += (value2/40)
				continue
			if key2 in stock:
				myScore += (stock[key2]*value2)
				continue
			if detail == "":
				detail = detail + key2
			else:
				detail = detail + ", " + key2

		index = recommend(score, myScore)

		if index >= 0:
			score[index] = myScore
			if detail != "":
				detail = "Need more " + detail + " to prepare this dish !"

			dishes[index] = {'name': key, 'detail': detail}


	return render_template("stock.html", stockData=stockData, dishes=dishes, date=date)

@app.route('/predict', methods=['GET'])
def predict():

	sc = joblib.load('dataset/scaler.gz')

	ordersDI = pd.read_csv("dataset/dinein.csv")
	ordersTA = pd.read_csv("dataset/takeaway.csv")

	date = "2019-07-03"
	startDate = "20190703"

	if request.args.get("date") != None:
		date = request.args.get("date")
		startDate = re.sub(r"-", '', request.args.get("date"))


	ordersDI['OrderDate'] = ordersDI['OrderDate'].astype(str)
	ordersTA['OrderDate'] = ordersTA['OrderDate'].astype(str)

	index = ordersDI[ordersDI['OrderDate'] == startDate].index[0]
	index2 = ordersTA[ordersTA['OrderDate'] == startDate].index[0]

	orders2pred = ordersDI.iloc[index-59: index+1, 1]
	orders2pred2 = ordersDI.iloc[index2-59: index2+1, 1]


	data = orders2pred.to_numpy()
	data = data.reshape((-1, 1))
	data = sc.transform(data)

	data2 = orders2pred2.to_numpy()
	data2 = data2.reshape((-1, 1))
	data2 = sc.transform(data2)


	np.reshape(data, (1,60))
	np.reshape(data2, (1,60))
	predDineIN = []
	predTakeAW = []

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
		predDineIN.append(int(predicted_orders[0][0]))
		data[:59] = data[1:]
		data[59] = pred[0][0]

		dataSet = []
		dataSet.append(data)

		dataSet = np.array(dataSet)
		dataSet = np.reshape(dataSet, (dataSet.shape[0], 60, 1))
		dataSet = dataSet.astype(np.float64)


	checkpoint_save_path = "./checkpoint/stock2.ckpt"

	if os.path.exists(checkpoint_save_path + '.index'):
	    print('-------------load the model-----------------')
	    model.load_weights(checkpoint_save_path)

	dataSet = []
	dataSet.append(data2)
	dataSet = np.array(dataSet)
	dataSet = np.reshape(dataSet, (dataSet.shape[0], 60, 1))
	dataSet = dataSet.astype(np.float64)

	for i in range(30):
		pred = model.predict(dataSet)
		predicted_orders = sc.inverse_transform(pred)
		# print(predicted_orders)
		predTakeAW.append(int(predicted_orders[0][0]))
		data2[:59] = data2[1:]
		data2[59] = pred[0][0]

		dataSet = []
		dataSet.append(data2)

		dataSet = np.array(dataSet)
		dataSet = np.reshape(dataSet, (dataSet.shape[0], 60, 1))
		dataSet = dataSet.astype(np.float64)

	print(predTakeAW)

	return render_template('predict.html', predDineIN=predDineIN, predTakeAW=predTakeAW, date=date)



if __name__ == '__main__':
	app.run()