# UrbanNest - Hotel & House Rental Web App

## 🌍 Live Demo

[UrbanNest Live](https://urbannest-rental-webapp.onrender.com/)

## 📌 About the Project

UrbanNest is a **full-stack** hotel and house rental web application inspired by Airbnb. It allows users to **list, browse, and review** rental properties, enhancing the experience with **location mapping**.

## 🚀 Features

- 🏡 **User Authentication**: Register & Login with Passport.js.
- 📌 **Listings Management**: Create, edit, and delete rental listings.
- 🌍 **View on Map**: See property locations using a map integration.
- ⭐ **Reviews & Ratings**: Add and manage property reviews.
- ☁️ **Cloud Storage**: Images are stored using **Cloudinary**.
- 📦 **Cloud Database**: Uses **MongoDB Atlas** for scalable data storage.
- 🔒 **Secure Sessions**: Using Express-Session.
- 🎨 **Responsive UI**: Built with Bootstrap & EJS templating.

## 🖼️ Project Screenshots

Here are some screenshots of UrbanNest:

![Homepage](<./screenshots/img-%20(1).png>)
![Add Listings Page](<./screenshots/img-%20(2).png>)
![Show Listing Details](<./screenshots/img-%20(3).png>)
![Review Listing Details](<./screenshots/img-%20(4).png>)
![Map Listing Details](<./screenshots/img-%20(5).png>)

## 🛠️ Technologies Used

- **Backend**: Node.js, Express.js
- **Frontend**: EJS, Bootstrap CSS
- **Database**: MongoDB Atlas, Mongoose
- **Authentication**: Passport.js (Local Strategy)
- **Cloud Storage**: Cloudinary for storing uploaded images
- **Others**: Connect-Flash, Method-Override, Joi (Validation)

## 📦 Dependencies

```json
{
  "connect-flash": "^0.1.1",
  "ejs": "^3.1.10",
  "ejs-mate": "^4.0.0",
  "express": "^4.21.2",
  "express-session": "^1.18.1",
  "joi": "^17.13.3",
  "method-override": "^3.0.0",
  "mongoose": "^8.9.5",
  "passport": "^0.7.0",
  "passport-local": "^1.0.0",
  "passport-local-mongoose": "^8.0.0",
  "cloudinary": "^1.32.0",
  "multer": "^1.4.5"
}
```

## 🔧 Installation & Setup

```sh
git clone https://github.com/rakib-utsho/UrbanNest-Rental-WebApp.git
cd UrbanNest
npm install
```

### 📌 Environment Variables

Create a `.env` file in the root directory and add:

```env
ATLASDB_UR=your_mongodb_atlas_uri
SECRET=your_session_secret_key
CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret
MAP_TOKEN=your_mapbox_api_token
```

### 🎯 Run the App

```sh
npm start
```

Visit `http://localhost:8080` in your browser.

## 📝 License

This project is licensed under the MIT License.

## 📬 Contact

For questions or suggestions, reach out to [**Md. Rakibul Islam**](rakibutsho1920@gmail.com) or visit my [rakib-utsho](https://github.com/rakib-utsho).
