            #############   BillingSystem     ###############

Install
Setup Steps :
1. Clone this repo-     git clone https://github.com/yadavpradeep786/BillingSystem.git
2. Install dependencies-    npm install
3. Final Step-    npm start

That's all, you are at SwaggerUI document page :)
Go to browser-  http://localhost:8000/docs/

Usage
Steps to test the application :
1. Loggin into the app using - '/api/login' api
    Test Credentials(/src/config/seedData/seeds.js) - emp01@gmail.com/123456, aff01@gmail.com/123456
2. Set the response token value by clicking on 'Authorize' button(right top), paste in both input boxes and click on both the 'Authorize' buttons.
3. Calculate billing using '/api/billing' api.
4. Use 'productid' from the result from '/api/products' api (_id).
5. Use other API's based on your requirement.


Billing API works based on the following discounts/conditions:
1. If the user is an employee of the store, he gets a 30% discount
2. If the user is an affiliate of the store, he gets a 10% discount
3. If the user has been a customer for over 2 years, he gets a 5% discount.
4. For every $100 on the bill, there would be a $ 5 discount (e.g. for $ 990, you get $ 45
as a discount).
5. The percentage based discounts do not apply on groceries.
6. A user can get only one of the percentage based discounts on a bill.