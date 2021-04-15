import pandas as pd 
import numpy as np 
import re

def changeDate(date):
	str = re.sub(r".\d\d:\d\d:.*", '', date)
	res = str[0:4] + str[5:7] + str[8:10]
	return res


data = pd.read_csv('myData.csv',usecols=[1,2])
data['OrderDate'].astype(str)
data['OrderDate'] = data['OrderDate'].apply(changeDate)
data['OrderDate'] = data.OrderDate.astype(str).astype(int)
print(data.dtypes)

data = data.loc[data['OrderDate'] == int("20210407")]
print(data)

"""
dataCount = data.groupby('ItemName', as_index=False)['OrderDate'].count()
dataArray = dataCount.to_numpy()
dataArray = dataArray[np.argsort(dataArray[:,1])]
"""
