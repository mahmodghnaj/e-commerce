## 📂 Demo:

- Live Demo: [https://e-commerce-delta-ivory-65.vercel.app/]
- user admin:
  Email: admin@admin.com
  Password: 123123123

## Getting Started

First, run the development server:

```bash
git clone https://github.com/mahmodghnaj/e-commerce.git
cd e-commerce
cp example.env.local .env.local
npm install

npm run dev
```

## Tips:

- Ensure you rename the example.env.local file to .env.local before starting the server, as it contains the environment variables required for the application to run properly.

- Make sure to rename example.env.local to .env.local before starting the server, as it contains the environment variables required for the application to run properly.
- To add products, you can log in with the following credentials:

      Email: admin@admin.com
      Password: 123123123

- Alternatively, you can manually make a user an admin by editing the database. Set isAdmin to true for the desired user.
- You can connect to the database using MongoDB Compass. The connection URL is specified in the .env.local file under the MONGO_URI variable.
