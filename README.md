## Configuration

### Step 1. Create Magic Link account

Create an account with [magic.link](https://dashboard.magic.link/) and get the keys of your application

### Step 2. Get the connection string of your MongoDB server

In the case of MongoDB Atlas, it should be a string like this:

```
mongodb+srv://<username>:<password>@my-project-abc123.mongodb.net/test?retryWrites=true&w=majority
```

For more details, follow this [MongoDB Guide](https://docs.mongodb.com/guides/server/drivers/) on how to connect to MongoDB.

### Step 3. Configure .env.local file

Copy the `.env.local.example` file in this directory to .env.local (which will be ignored by Git):

```bash
cp .env.local.example .env.local
```

Then set each variable on `.env.local`:

- `NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY` should look like `pk_test_abc` or `pk_live_ABC`
- `MAGIC_SECRET_KEY` should look like `sk_test_ABC` or `sk_live_ABC`
- `SECRET_COOKIE_PASSWORD` should be a string with at least 32 characters
- `MONGODB_URI=` should be the MongoDB connection string you got from step 2.


### Step 3. Run local server

Now, run Next.js in development mode

```bash
npm run dev
# or
yarn dev
```