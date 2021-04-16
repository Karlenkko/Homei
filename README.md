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
- You can customize your preferences both on the home page and the account page. In the preferences, you can choose your dietary habits and your allergens which will modify the recommendations and allergy-warnings.
- If an order is placed (has to be in the Northwest Flavor Restaurant), this time, as the restaurant owner, you can check the incoming orders and select corresponding ingredients in your stock to cook them.
  - Now the restaurant owner selects the ingredients from a list of stock. In the ideal design, he can scan the bar code or the QR code on the ingredient package to record.
- Once an order is processed, the customer can find the trace information of it on the order page.
- Once an order is processed, the customer can rate this experience, especially the hygiene part, on the order page.
- 
- Labels on the products make it easier for our customers to know where the ingredients come from and thus have more confidence in food quality. Traceability also helps restaurants reduce their stock pressure since Homei will recommend corresponding dishes.
- Different types of tags such as allergy information, halal, vegetarian and "on-diet" can meet the needs of all customers to the greatest extent, and fully ensure the possibility of personal customization.
- As an unavoidable topic in the food industry, hygiene are certainly not to be ignored. We attach great importance to the user's role in the rating system and show their evaluations of the cleanliness directly on the restaurant page.
- 5
- 6

## How to use?

The mini program uses the cloud service of WeChat, no external library used.

- Clone the code and open it with the WeChat developer tool (most recommended, link here:  https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html). Other IDE tools might not be compatible with some specific files in our project (.wxml and .wxss). Some IDE tools require special plugins, please check before opening our project.

- We published a test version to anyone who's interested, but only authorized user can get access to it. If you are a judge of the HackUST 2021, there are several ways to demand access right:

  1. Please click the link or scan the QR code in the video on YouTube to demand access to the application : https://open.weixin.qq.com/sns/getexpappinfo?appid=wx370b95e539c59426&path=pages%2Findex%2Findex.html#wechat-redirect

  2. Use your official e-mail account to send us an e-mail in which you provide us with your WeChat ID so that we can add it into our white-list. Please DO use your official working e-mail address to prove that you are one of the judges.

     Please contact this e-mail address: xuyuantaoxyt@gmail.com

​          

## Things to know before testing

1. The ratings of restaurants and annual report should be generated periodically by analyzing fresh data. So after rating an order, the scores of the corresponding restaurant will NOT be changed immediately. The annual report should be generated once a year, so here we only show an example of the annual report from last year, but not a real-time report.

2. The life cycle of an order: customer order a dish (current order in the order page) ---> restaurant receive this order and scan (validate) the ingredients  --->  we suppose that the customer has received and enjoyed the food (past order in the order page) ---> customer can later rate it

   Please note that we 

3. By default, the user can only play the role of the owner of a restaurant called "Northwest Flavor", which means you can only validate the ingredients of each order received by this shop. We suggest you ordering a dish in "Northwest Flavor" and switch to "Restaurant" page to check orders and then validate the ingredients. Of course, you can see dishes ordered by others in this section, don't feel confused if you see dishes that you haven't ordered.



## Author

Team INSAliens, No.078 of HackUST  2021

Xinyu FENG, Tuoyuan TAN, Yuantao XU, Shihang ZHOU

## License
[MIT](https://choosealicense.com/licenses/mit/)
