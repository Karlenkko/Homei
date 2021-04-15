# Homei Data Analysis Platform

The Homei Data Analysis platform is designed for Restaurant Operators on the Homei platform. 

## Functionality

The Data Analysis platform can filter and analyze data collected from the backend data from one restaurant.  It is designed originally for restaurant to manage their stock, by giving them the recommended dishes in order to keep all the stocked ingredients flow in an appropriate speed.

It can visualize the following items:

- Top ten: retrieve the best sellers from the restaurant
- Timeline: analyze the selling evolution of one dish on the time axis
- Passenger flow: bar graph showing number of customers (orders) in different times in one day, so that the operator can better arrange the time based on the flow
- Stock: since the in and out records of stocks are all saved by the Homei Application, 
  - the operator can keep a good stock flow management based on the visualized data.
  - the operator will get the recommended dished based on a stock management strategy in order to consume faster certain kinds of ingredients

The following items can be predicted by the ML model:

- Number of takeaway orders per day
- Number of dine-in orders per day

## Project Architecture

This project presents its functionalities on web pages driven by the Flask Web Framework of Python.

Libraries such as pandas, numpy, re are used for loading data and data preprocessing, and basic data analysis using aggregation, data sort etc.

The chart displayed on the web pages are rendered by  Apache Echarts: http://echarts.apache.org/zh/

, a data visualization library based on JavaScript.

The ML part is realized with sklearn, Tensorflow, joblib and matplotlib. The libraries are used to train the GRU-NN in order to predict orders.



## Usage

1. Install Python
2. Install the following libraries:
   1. Flask
   2. Numpy 1.19.5 (or below 1.20)
   3. Pandas
   4. Tensorflow
   5. joblib
   6. sklearn
3. run in command prompt `flask run` at the root directory of the project

### Dataset

Attention, the current data is collected from the Kaggle Takeaway Food Orders - Updated: https://www.kaggle.com/henslersoftware/19560-indian-takeaway-orders  from a restaurant in London, UK. Because currently the Homei platform is not in operation, thus there is no real data available for Machine Learning or data visualization. 

In addition, certain data are randomly generated from the scripts.

## Project Structure

- app.py // main program

- static
  - javascript library of Apache Echarts
- template
  - HTML templates
  - css
- dataset
  - csv data
  - data-generating script (generateData.py generateData1.py)
  - model-training script (ML_GRU.py)
- checkpoint
  - parameters of the training model