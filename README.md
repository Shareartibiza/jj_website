# JJ Real Estate & Lifestyle — Content & Listing Management Guide

Welcome to the management and development documentation for the **JJ Real Estate & Lifestyle** website. This guide explains how to manage properties and lifestyle listings, upload images, update static website articles (Journal), migrate data, and deploy updates.

---

## 📋 Table of Contents
1. [Setup & Environment Variables](#1-setup--environment-variables)
2. [Managing Listings (Real Estate & Lifestyle)](#2-managing-listings-real-estate--lifestyle)
   - [Accessing the Admin Panel](#accessing-the-admin-panel)
   - [Adding a New Listing](#adding-a-new-listing)
   - [Uploading Images](#uploading-images)
   - [Editing or Deleting Listings](#editing-or-deleting-listings)
3. [Updating Website Articles (The Journal Page)](#3-updating-website-articles-the-journal-page)
4. [Developer Utilities & Seeding](#4-developer-utilities--seeding)
5. [Deployment Guide](#5-deployment-guide)

---

## 1. Setup & Environment Variables

The website runs on a custom Node.js Express server ([server.js](file:///Users/particular/Downloads/JJ%20RE_website/server.js)) integrated with Next.js, and uses **Firebase Firestore** as the database and **Firebase Storage** for uploaded listing assets.

To run the application locally or in production, configure a `.env.local` file in the root directory with the following variables:

```env
# Firebase Client SDK Configuration (For fetching listings on the frontend)
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=gen-lang-client-0792008363
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=gen-lang-client-0792008363.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Firebase Admin SDK Configuration (For write/delete permissions and image uploads)
# Set as a minified JSON string of your Service Account Key
FIREBASE_SERVICE_ACCOUNT={"type":"service_account","project_id":"gen-lang-client-0792008363",...}

# SMTP Configuration (For contact form inquiries)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_specific_password
```

Run the development server locally using:
```bash
npm run dev
```

---

## 2. Managing Listings (Real Estate & Lifestyle)

All real estate properties and lifestyle items (Yachts, Jets, Watches, Cars) are fetched dynamically from **Firebase Firestore** and can be managed through the built-in Admin Backoffice.

### Accessing the Admin Panel
1. Start your application and navigate to the admin page:
   - **Local Development**: [http://localhost:3000/admin](http://localhost:3000/admin)
   - **Production**: `https://your-domain.com/admin`
2. You will be redirected to the login page if not signed in.
3. Enter the default administrator credentials:
   - **Username**: `JJLIFE`
   - **Password**: `JJLIFE2@026`

> [!NOTE]
> Credentials are check-simulated securely on the server side via standard cookie session tokens defined in [src/middleware.ts](file:///Users/particular/Downloads/JJ%20RE_website/src/middleware.ts).

### Adding a New Listing
Once logged into the Admin Panel:
1. Click **Add Property** (for real estate) or **Add Lifestyle** (for yachts, jets, cars, etc.) in the top right corner.
2. Complete the listing form fields:
   - **General Information**: Title, Price (e.g. `€12,500,000` or `Price on Request`), Category, and Location.
   - **Specs**: Enter structural numbers (e.g. Bedrooms, Bathrooms, Build Size, and Plot Size for properties; or Length, Passengers, and Crew size for lifestyle listings).
   - **Description**: Add a detailed paragraph outlining the listing's design, style, and highlight features.
   - **Features**: A bulleted list of key highlights (e.g. "Infinity pool", "Zero-speed stabilizers"). Click **Add Feature** to include more lines.

### Uploading Images
Inside the listing forms, you can add multiple images that will display in the product's image carousel:
1. Scroll down to the **Images** section of the form.
2. For each image, you can:
   - **Paste a direct URL**: Paste a link if the image is hosted elsewhere.
   - **Upload directly**: Click the **Upload** button. This opens a file picker on your local machine.
3. Select an image file (JPEG, PNG, WebP, GIF). The site will show upload progress.
4. The file is uploaded to **Firebase Storage** via the API endpoint `/api/upload` (handled in [server.js](file:///Users/particular/Downloads/JJ%20RE_website/server.js)), and its public URL is automatically populated in the field.
5. Click **Add Image** to add space for more photos. You can also reorder or remove them using the delete icon next to each URL field.

### Editing or Deleting Listings
1. From the Admin Dashboard, click on **Properties** or **Lifestyle Portfolio**.
2. Click **Edit** on the listing you want to modify to open the pre-populated form. Update the details and click **Save Listing**.
3. To remove a listing entirely, click the **Delete** button next to it. Confirm the popup prompt, and it will be deleted from the website and Cloud database.

---

## 3. Updating Website Articles (The Journal Page)

Journal articles (such as market updates, hidden guides, or travel features) are kept inside a high-performance, statically organized component to ensure maximum page speed and typography layouts.

To add or update an article on the **Journal** page:

1. Open the file [src/app/journal/page.tsx](file:///Users/particular/Downloads/JJ%20RE_website/src/app/journal/page.tsx).
2. Locate the static `articles` array at the top of the file (around line 7).
3. To add a new article, copy and paste the block below into the `articles` array:

```javascript
{
    title: "Your Article Title Here",
    category: "Market Insights", // or "Lifestyle Guide", "Concierge Services", etc.
    image: "/assets/your_new_article_image.png", // Path to the article cover image
    excerpt: "A short snippet summary of the article that will tease readers.",
    content: `This is the main body paragraph.

You can separate paragraphs using simple line breaks inside the template literal.

Add as much detail as you need for the article content.`
},
```

### Adding Article Cover Images
1. Save your article cover image file (e.g., `your_new_article_image.png`) in the `/public/assets/` directory (absolute path: `/Users/particular/Downloads/JJ RE_website/public/assets`).
2. Reference it in the `image` field inside `page.tsx` as `"/assets/your_new_article_image.png"`.

---

## 4. Developer Utilities & Seeding

If you ever need to reset or bulk-upload your listings from a local state (useful for local development or setting up a new Firebase environment):

1. **Local Data Source**: Listings can be preconfigured in [src/data/listings.ts](file:///Users/particular/Downloads/JJ%20RE_website/src/data/listings.ts) or [src/data/db.json](file:///Users/particular/Downloads/JJ%20RE_website/src/data/db.json).
2. **Migration Script**: Run the migration script in [src/scripts/migrate-to-firestore.ts](file:///Users/particular/Downloads/JJ%20RE_website/src/scripts/migrate-to-firestore.ts) to push these static entries into Firestore:
   ```bash
   # Ensure you have your FIREBASE_SERVICE_ACCOUNT variable configured in your terminal environment
   export FIREBASE_SERVICE_ACCOUNT='{"your_service_account_key": "..."}'
   
   # Run the sync/seeding script
   npx ts-node src/scripts/migrate-to-firestore.ts
   ```

---

## 5. Deployment Guide

When you make code changes (such as adding new static articles or assets to `/public`), redeploy the app to **Google Cloud Run**:

1. Ensure the Google Cloud SDK (`gcloud` CLI) is installed on your computer.
2. Authenticate with your Google account:
   ```bash
   gcloud auth login
   ```
3. Run the automated deployment script in the project root:
   ```bash
   chmod +x deploy.sh
   ./deploy.sh
   ```

The script will automatically configure your project (`gen-lang-client-0792008363`), build your container with **Google Cloud Build** using the [cloudbuild.yaml](file:///Users/particular/Downloads/JJ%20RE_website/cloudbuild.yaml) steps, and update your container on Cloud Run.
