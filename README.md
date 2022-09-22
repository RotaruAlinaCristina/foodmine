## PROJECT
1. Introduction to the course
2. Install development tools
3. Create Angular App
    1. Create project's folder
    2. Install @angular/cli
    3. Create App as fontend
4. Add Header
    1. Generate Component
    2. Add HTML
    3. Add CSS
5. List Food
    1. Create Food model
    2.Create data.ts
        1.add sample food
    3.Add image to assets
    4.Create Food service
    5.Create Home Component
        1. Add ts
        2. Add html
        3. Add css
6. Search
    1. Add method to food service
    2. Add search route
    3. Show searck result in Home Component
    4. Generate search component
        1. Add to Home componnet
        2. Add ts
        3. Add html
        4. Add css
7. Tags Bar
    1. Create Tag Model
    2. Add sample tags to data.ts
    3. Food Service
        1. Add get all tags method
        2. add get all foods by tag method
    4. Add tags route
    5. Show tag result in Home Component
    6. Generate Tags Component
        1. Add to Home componnet
        2. Add ts
        3. Add html
        4. Add css
8.  Food Page
    1. Ad method to food service
    2. Generate Food Page Component
        1. Add Route
        2. Add ts
        3. Add html
        4. Add css
9. Cart Page
    1. Create CartItem Model
    2. Create Cart Model
    3. Generate Cart Service
    4. Add "Cart Button" in - Food Page
    5. Generate Cart Page Component
        1. Add Route
        2. Add ts
        3. Add htlm
        4. Add css

10. Not Found Product
    1. Generate Component
        1. Add ts
        2. Add html
        3. Add css
    2. Add to Pages
        1. Home Page
        2. Food Page
        3. Cart Page

11. Connect to Backend
    1. Create backend folder
    2. npm init (npm init -y)
    3. npm install typescript
    4. Create tsconfig.json
    5. Create .gitignore
    6. Copy data.ts to backend/src
    7. npm install express cors
    8. Create server.ts
        1. install @types
        2. Add apis
    9. npm install nodemon ts-noded --save-dev
    10. Add urs.ts to frontend
    11. Add HttpClient module
    12. Update Food Service

12. Login Page
    1. Generate Component
        1. Add to routes
        2. Add ts
        3. Add html
            1. Import Reactive Forms Module
        4. Add css
    2. Add Login Api
        1. Use json
        2. Add jsonwbtoken
        3. Test Using PostMan
    3. Generate User Service
        1. Generate Usere Model
        2. Add User Subject
        3. Add Login Method
            1. Add User Urls
            2. Generate IUserLogin Interface
            3. Add ngx-toastr
                1. Import module
                2. Import BrowserAnimationsModule
                3. Add Styles in angular.json
            4. Add  to Header
        4. Add Local Storage Methods
        5. Add Logout Method
            1. Add to Header

13. Make Components for Login Page
    1. Input Container
    2. Input Validation
    3. Text Input
    4. Default Button

14. Connect Login API to MongoDB Atlas
    1. Moving Apis into routers
    2. Create MondoDbAtlas
    3. Create .env file
    4. Install
        1. mongoose
        2. dotenv
        3.bcryptjs
        4.jsonwentoken
        5.express-async-handler
    5. Connect to MongoDB Atlas
    6. Use MongoDB instead of data.ts in APIs

15. Register User
    1. Add Register API
    2. Add Register service method
    3. Add Register link
    4. Add Register Component

16. Loding...
    1. Add Image
    2. Add Component
    3. Add Service
    4. Add Interceptop

17. Checkout Page
    1. Create Order Model (Convert Cart Model to Ordes Model)
    2. Create Checkout Page Component
        1. Add to Router
    3. Add User to User Service
    4. Add Cart to Cart Service
    5. Create Order Item List Component
    6. Adding Map to the Checkout Page
        1. Add Leaflet npm package
        2. Ad CSS to angular.json
    2. Add Address LatLag to Order Model
    3. Create Map Component
        1. Add to Checkout Page
        2. Add ts
            1. Change app-map selector to map
        3. Add Html
        4. Add Css
    4. Add Auth Guard