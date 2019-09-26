- E commerce back end code

- There are two roles available: 
1 - Admin
2 - User

Each above role must be registered first to perform operation.

Each product is belongs to perticular category(like Male, Female etc.) and department (like Clothings, Beauty Products etc.)

As admin has followings extra privilege: 
1- Add categry 
2- Add department
3- Add product 
4- Update product 
5- Delete product 
6- Get orders placed by users

- Any user can register, view, search and can place orders etc.

- Only register user can perform opertaion like search, order etc.

- User can add orders to cart and modify before placing orders

- As a user, he/she can get orders details.

- Front end pages not consider for this application, to send request Postman is used.

- Node.Js, Express.Js and MongoDB is used to develop this application.

- Following API provide for Index, USer and Admin. (http method and API)

- Kindly replace port and ip with your server details.

Create Account -> post : "http://IP:PORT/admin/signin 
Body : { "fullname" : "Dattaprasad", "email" : "dattaprasadchavan1994@gmail.com", "password" : "Password@1994", "verifyPassword" : "Password@1994" }

Sign in -> get : "http://IP:PORT/admin/signin 
Body : { "email" : "dattaprasadchavan1994@gmail.com", "password" : "Password@1994", }

Add New Catagory -> post : "http://IP:PORT/admin/categories 
Body : { "categoryName" : "Men" } post : "http://IP:PORT/admin/categories Body : { "categoryName" : "Women" }

Add New Department -> post : "http://IP:PORT/admin/departments 
Body : { "departmentName": "Clothing", "categories"" : "Men" }  
Body : { "departmentName" : "Clothing", "categories" : "Women" }

Add New Product -> post : "http://IP:PORT/admin/product 
Body : { "imagePath" : "path", "title" : "T-shirt", "description" : "Black T-shirt in soft cotton jersey", "department" : "Clothing", "category" : "Men", "price" : 500, "color" : "Black", "size" : "S", "quantity" : 3 }
Get Catagories -> get : http://IP:PORT/admin/categories 
Get Department -> get : http://IP:PORT/admin/departments 
Get products -> get : http://IP:PORT/admin/products 
Get Product by ID -> get : http://IP:PORT/admin/products/:productID 
Delete product by ID -> delete : http://IP:PORT/admin/products/:productId

Update product -> put : "http://IP:PORT/admin/product/:productID 
Body : { "price" : 600, "color" : "White", "size" : "M", "qty" : 2 }

Get orders details placed by users -> get : http://IP:PORT/admin/:orderID/order

INDEX API:

Get catagories -> get : http://IP:PORT/categories

Get Departments -> get : http://IP:PORT/departments

Get Products -> get : http://IP:PORT/product

Get Product By ID -> get : http://IP:PORT/products/:productID

Serach by catagory, department and Product ID -> get : "http://IP:PORT/search 
Body : { "category" : "catagory", "department" : "department", "productId" : "productID" }

USER API:

Create account -> post : "http://IP:PORT/users/signup 
Body: { "fullname" : "User1", "email" : "example@gmail.com", "password" : "Password@2019", "verifyPassword" : "Password@2019" }

Login -> post : "http://IP:PORT/users/login 
Body: { "email" : "example@gmail.com", "password" : "Password@2019" }

Add Product into Cart by UserId ID -> put : "http://localhost:8090/users/:userId/cart 
Body: { "productId" : "productId", "color" : "Peach-Coloured & Golden Printed", "size" : "L" }

Get cart by UserID -> get : http://IP:PORT/users/:userId/cart

Update Cart by User ID -> post : "http://IP:PORT/users/:userId/cart 
Body: { "productId" : "productID", "increase" : 1, "decrease" : 0 }"

Place Orders by CartId -> post : "http://localhost:8090/users/:cartId/order 
Body : { "address" : "address details here" }

Get orders details -> get : http://localhost:8090/user/:ordersId/order