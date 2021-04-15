import random
from random import randint
from datetime import datetime, timedelta


f=open('myDataStock.csv','w',encoding='UTF-8')

food = ["chicken", "bread", "lettuce", "potato", "carotte", "rice", "pork", "mushroom", "tomato", "egg", "beef"]

x = datetime.now()

id = 0
for i in range(365):
     
    orderDay = str(x) + ","
    for order in range(len(food)):
    	orderNumber = str(id) + ","
    	itemName = food[order] + ","
    	quantity = randint(0,300)

    	line = orderNumber+orderDay+itemName+str(quantity)+"\n"
    	f.write(line)
    	id = id+1

    x = x - timedelta(days=1)

    
f.close()


 
"""
OrderNumber,OrderDate,ItemName,Quantity,ProductPrice


"""
