
# BLog Website


### Local Deployment
- __clone the github link__
```bash
  git clone https://github.com/SheikhArman100/Blog-Website.git
```
- __go to the project folder__
```bash
  cd Blog-Website
```
- __For frontend part__
```bash
  cd frontend
  npm intsall
```
&nbsp; &nbsp; &nbsp; __create .env.local file.Add this__

`NEXT_PUBLIC_BACKEND_URL`=http://localhost:3500/api &nbsp; &nbsp; &nbsp;**Note: backend url**
`NEXT_PUBLIC_TINYMCE_KEY`= &nbsp; &nbsp; &nbsp;**Note: Tinymce**



&nbsp; &nbsp; &nbsp; __run the frontend__
```bash
  npm run dev
```
- __For backend part__
```bash
  cd backend
  npm install
  
```
&nbsp; &nbsp; &nbsp; __create .env file  and add these values__

`PORT`=3500
`DATABASE_URL`=
`ACCESS_TOKEN_SECRET`=
`REFRESH_TOKEN_SECRET`=

`GOOGLE_CLIENT_ID`=
`GOOGLE_CLIENT_SECRET`=

`FRONTEND_URL`=http://localhost:3000
`BACKEND_URL`=http://localhost:3500

&nbsp; &nbsp; &nbsp; __Now run the backend__
```bash
 npm run dev
```







## Features

__Backend__

- MongoDB for data storage ad mongoose for schema
- Password hashing
- Using JSONWEBTOKEN to create access token and refresh token
- storing cookie in httpOnly secured storage
- frontend httpOnly cookie access
- update access token using refresh token
- Dynamically access user info using middleware by decoding access token
- Role Authorization
- see all the routes [Postman link](https://warped-zodiac-72434.postman.co/workspace/New-Team-Workspace~492f40e7-418b-4f1a-ab4d-7ad4fd632812/collection/20344907-6dd3714d-aab2-415b-8551-324933421c80?action=share&creator=20344907)

__Frontend__
- making sure only verified user can access dashboard
- Nextjs new server and client components
- Signup and Signin page with validation using react-hook-form and zod
- Axios interceptors to send access token with every request to access personal tasks and info .This make sure that coreect person gets correct dat.It also automatically update accesstoken expiration using refresh token
- create task with validation using react-hook-form and zod. Here i used beautiful DatePicker with customize DatePicker
- pop-up modal using daisyui
- show update info and error using react-toastify
- add to completed task
- add to important task
- delete task with confirmation modal
- filtering tasks
- search task using backend query parameter
- used react-query to fetch and mutation suing its caching ability
- signout feature
- zustand for state management
- react-hook-form advanced feature Controller to get datepicker value




## Screenshots

![Sign in](https://drive.google.com/uc?export=view&id=1hvoI53Tv8fjtcafoiSUxuNocBwFIdUSG)

![dashboard](https://drive.google.com/uc?export=view&id=1MCXDh3aBhv_Rb_t1-kmlhfY-AW4sJOt-)




## Contact Me

If you have any questions, suggestions, or need assistance with this project, feel free to reach out to me. I'm always happy to help.

- **Email**: [sheikharman100@gmail.com](sheikharman100@gmail.com)
- **GitHub**: [https://github.com/SheikhArman100](https://github.com/SheikhArman100)
- **LinkedIn**: [www.linkedin.com/in/sheikharman100](www.linkedin.com/in/sheikharman100)

