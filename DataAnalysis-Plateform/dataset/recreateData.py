import pandas as pd
import numpy as np 
import re


def changeDate(date):
	str = re.sub(r".\d\d:\d\d", '', date)
	res = str[6:] + str[3:5] + str[0:2]
	return res

data = pd.read_csv('restaurant-2-orders.csv', usecols=['OrderDate', 'Quantity'])
data['OrderDate'] = data['OrderDate'].apply(changeDate)
data['OrderDate'] = data.OrderDate.astype(str).astype(int)


data = data.groupby('OrderDate', as_index=False).sum()
data.to_csv('takeaway.csv',index=False)