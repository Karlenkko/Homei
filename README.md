# Homei mini-program

A food-ordering mini-program prototype aiming to solve problems in the culinary (especially takeaway) industry. 

Our GitHub link is: https://github.com/Karlenkko/Homei.git     
The Homei Data Analysis platform GitHub link: https://github.com/fxy233/DataAnalysis-Plateform.git

## Page Structure

The mini-program consists of 4 main pages

- index 
- order
- knowledge
- account

You will also see a Restaurant page, which is designed only for restaurant operators. It is here only for demonstrative purpose, and will not appear in the operating version for customers. 

## Specialties

- On the knowledge page, you can find academic and popular articles cited from external sites with proper respect to copyrights.
- On the knowledge page, you can also find quizzes which will reward you discount coupons if you have obtained a good score. You can find your coupons in the coupon sector on the account page.
- Personalized annual report on the account page which calculates the average intake of each type of nutrition and gives practical advice so that they can form healthier dietary habits.
- You can customize your preferences both on the home page and the account page. In the preferences, you can choose your dietary habits such as halal, vegetarian and "on-diet", and your allergens which will modify the recommendations and allergy-warnings.
- If an order is placed (has to be in the Northwest Flavor Restaurant), this time, as the restaurant owner, you can check the incoming orders and select corresponding ingredients in your stock to cook them.
  - Now the restaurant owner selects the ingredients from a list of stock. In the ideal design, he can scan the bar code or the QR code on the ingredient package to record.
- Once an order is processed, the customer can find the trace information of it on the order page.
- Once an order is processed, the customer can rate this experience, especially the hygiene part, on the order page.

## How to use?

The mini program uses the cloud service of WeChat, no external library used.

- Clone the code and open it with the WeChat developer tool (most recommended, link here:  https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html). Other IDE tools might not be compatible with some specific files in our project (.wxml and .wxss). Some IDE tools require special plugins, please check before opening our project.

- Public release version of our project is already online, please scan the QR code below:

  <img src="C:\Users\Oscar. Tan\Desktop\hackUST\QR_code.jpg" alt="QR_code" style="zoom:50%;" />

- Test version of our project contains latest changes, but only authorized user can get access to it. If you are a judge of the HackUST 2021, there are several ways to demand access right:

  1. Please click the link or scan the QR code in the video on YouTube to demand access to the application : https://open.weixin.qq.com/sns/getexpappinfo?appid=wx370b95e539c59426&path=pages%2Findex%2Findex.html#wechat-redirect

  2. Use your official e-mail account to send us an e-mail in which you provide us with your WeChat ID so that we can add it into our white-list. Please DO use your official working e-mail address to prove that you are one of the judges.

     Please contact this e-mail address: xuyuantaoxyt@gmail.com

​          

## Things to know before testing

1. The ratings of restaurants and annual report should be generated periodically by analyzing fresh data. So after rating an order, the scores of the corresponding restaurant will NOT be changed immediately. The annual report should be generated once a year, so here we only show an example of the annual report from last year, but not a real-time report.

2. The life cycle of an order: 

   1. Customer selects his/her preferences, either in the home page or in the account page.
   2. Customer order a dish in the home page (please choose dishes in the "Northwest Flavor" restaurant in order to continue further exploration).
   3. Please now play the role as the restaurant owner of "Northwest Flavor". Restaurant receives this order and selects the corresponding ingredients to process the order. In the ideal situation, the owner can easily scan the QR code or the bar code on the package. However this could only be implemented with the support of the whole supply chain.  
   4. Once the order has been processed, the customer can rate and trace the order.
   5. At any time, users can read articles in the knowledge page and win coupons by participating in weekly quiz. Coupons can be checked in the account page. As we did not implement the payment procedure, they can not be actually used in our APP.

   Please note that our database contains a very limited number of available restaurants because preparing pictures and descriptions of dishes is very time-consuming. So as you can see, only restaurants with beautiful pictures have their menu, others are labeled "under construction". 

3. **Please note again that the restaurant page is only for the demonstration of restaurant procedures. For simplicity, we combine these functions in one mini-program, however, the restaurant page would not be in the client version in the ideal conception.** By default, the user can only play the role of the owner of a restaurant called "Northwest Flavor", which means you can only validate the ingredients of each order received by this shop. We suggest you ordering a dish in "Northwest Flavor" and switch to "Restaurant" page to check orders and then validate the ingredients. Of course, you can see dishes ordered by others in this section, don't feel confused if you see dishes that you haven't ordered.





## Author

Team INSAliens, No.078 of HackUST  2021

Xinyu FENG, Tuoyuan TAN, Yuantao XU, Shihang ZHOU

## License
[MIT](https://choosealicense.com/licenses/mit/)
