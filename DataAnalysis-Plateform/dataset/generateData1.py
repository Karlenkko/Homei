import random
from random import randint
from datetime import datetime, timedelta


f=open('myData.csv','w',encoding='UTF-8')

food = ["Chicken Burger", "Chicken Curry", "Spring Roll", "Vegetable Soup", "Roast Pork", "Thai Fried Rice", "Satay Beef", "Sweet Sour Pork", "Kong Pao Chicken", "Honey Sesame Chicken", "Black Pepper Angus Steak", "Salad", "Super Green", "Chow Mein"]
price = [14, 18, 8, 13, 22, 14, 20, 16, 14, 16, 24, 8, 14, 12]  


x = datetime.now()

id = 0
for i in range(365):
     
    orderDate = str(x) + ","
    for order in range(randint(200, 1000)):
    	orderNumber = str(id) + ","
    	index = randint(0, len(food)-1)
    	itemName = food[index] + ","
    	quantity = randint(1,3)
    	productPrice = "," + str(price[index])

    	line = orderNumber+orderDate+itemName+str(quantity)+productPrice+"\n"
    	f.write(line)
    	id = id+1

    x = x - timedelta(days=1)

    
f.close()


 
"""
OrderNumber,OrderDate,ItemName,Quantity,ProductPrice


"""
