# Homei mini-program

A food-ordering mini-program prototype aiming to solve problems in the culinary (especially takeaway) industry. 

Our GitHub link is: https://github.com/Karlenkko/Homei.git     
The Homei Data Analysis platform github link: https://github.com/fxy233/DataAnalysis-Plateform.git

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
<<<<<<< Updated upstream
- You can customize your preferences both on the home page and the account page. In the preferences, you can choose your dietary habits and your allergens which will modify the recommendations and allergy-warnings.
=======

- You can customize your preferences both on the home page and the account page. In the preferences, you can choose your dietary habits such as halal, vegetarian and "on-diet", and your allergens which will modify the recommendations and allergy-warnings.

>>>>>>> Stashed changes
- If an order is placed (has to be in the Northwest Flavor Restaurant), this time, as the restaurant owner, you can check the incoming orders and select corresponding ingredients in your stock to cook them.
  
  - Now the restaurant owner selects the ingredients from a list of stock. In the ideal design, he can scan the bar code or the QR code on the ingredient package to record.
  
- Once an order is processed, the customer can find the trace information of it on the order page.

- Once an order is processed, the customer can rate this experience, especially the hygiene part, on the order page.
- As the restaurant owner, you can use the data analysis platform https://github.com/fxy233/DataAnalysis-Plateform.git to learn about different statistics and predictions according to the restaurant data.
  - Detailed information can be found on the README of https://github.com/fxy233/DataAnalysis-Plateform.git.

- As the restaurant owner, you can use the data analysis platform 

  https://github.com/fxy233/DataAnalysis-Plateform.git to learn about different statistics and predictions according to the restaurant data.

  - Detailed information can be found on the README of https://github.com/fxy233/DataAnalysis-Plateform.git.

## How to use?

The mini program uses the cloud service of WeChat, no external library used.

- Clone the code and open it with the WeChat developer tool (most recommended, link here:  https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html). Other IDE tools might not be compatible with some specific files in our project (.wxml and .wxss). Some IDE tools require special plugins, please check before opening our project.

- We published a test version to anyone who's interested, but only authorized user can get access to it. If you are a judge of the HackUST 2021, there are several ways to demand access right:

  1. Please click the link or scan the QR code in the video on YouTube to demand access to the application : https://open.weixin.qq.com/sns/getexpappinfo?appid=wx370b95e539c59426&path=pages%2Findex%2Findex.html#wechat-redirect

  2. Use your official e-mail account to send us an e-mail in which you provide us with your WeChat ID so that we can add it into our white-list. Please DO use your official working e-mail address to prove that you are one of the judges.

     Please contact this e-mail address: xuyuantaoxyt@gmail.com
  
- A normal usage of the mini program:

  1. Set your preferences.
  2. Place an order (in Northwest Flavor Restaurant for further exploration)
  3. Go to the restaurant page, play the role as the restaurant owner of Northwest Flavor, and select ingredients to complete the order.
  4. As the customer, you can trace and rate the order on the order page.
  5. You can review articles (URLs only due to Wechat host limit), and do quizzes on the knowledge page. The rewarded coupons can be found in the account page. (The usage of coupons is not demonstrated since the payment service is not processed)

​          

## Things to know before testing

1. The ratings of restaurants and annual report should be generated periodically by analyzing fresh data. So after rating an order, the scores of the corresponding restaurant will NOT be changed immediately. The annual report should be generated once a year, so here we only show an example of the annual report from last year, but not a real-time report.

2. The life cycle of an order: customer order a dish (current order in the order page) ---> restaurant receive this order and scan (validate) the ingredients  --->  we suppose that the customer has received and enjoyed the food (past order in the order page) ---> customer can later rate it

   Please note that we 

3. By default, the user can only play the role of the owner of a restaurant called "Northwest Flavor", which means you can only validate the ingredients of each order received by this shop. We suggest you ordering a dish in "Northwest Flavor" and switch to "Restaurant" page to check orders and then validate the ingredients. Of course, you can see dishes ordered by others in this section, don't feel confused if you see dishes that you haven't ordered.



## Known bug

When dealing with the orders on the restaurant page as the restaurant owner, due to the communication stability and fluency problem with the Wechat mini program database server, after you finish processing the last order in the page, there is a small chance that a display error will occur, please refresh or re-enter the page to return to normal. Thank you for your comprehension.

## Known bug

When dealing with the orders on the restaurant page as the restaurant owner, due to the communication stability and fluency problem with the WeChat mini program database server, after you finish processing the last order in the page, there is a small chance that a display error will occur, please refresh or re-enter the page to return to normal. Thank you for your comprehension.

## Author

Team INSAliens, No.078 of HackUST  2021

Xinyu FENG, Tuoyuan TAN, Yuantao XU, Shihang ZHOU

## License
[MIT](https://choosealicense.com/licenses/mit/)
