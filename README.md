# Photo Album

A small full-stack photo gallery. Upload JPEG or PNG images, browse them in a responsive grid, and open any photo full-screen.

- **Front end:** Angular (standalone components, signals)
- **Back end:** Node.js + Express 5, Multer for uploads
- **Database:** MongoDB via Mongoose (images are stored in the database)

## Features

- Upload `.jpg`, `.jpeg` and `.png` files (max 15 MB each)
- Responsive photo grid with hover effect
- Full-screen lightbox (click a photo to open, click again to close)
- Clear error message for invalid file types or oversized files
- Photos persist across server restarts

## Prerequisites

- [Node.js](https://nodejs.org) (a version supported by Angular 22), installed
- [MongoDB](https://www.mongodb.com/docs/manual/installation/), installed and running locally

Make sure these ports are available:

- `27017` for MongoDB
- `3000` for the app

## Getting started

```bash
git clone https://github.com/rahulrubugunday/photo-album.git
cd photo-album

npm install        # installs server and client dependencies
npm run build      # builds the Angular app into public/
npm start          # starts the server
```

Then open <http://localhost:3000>.

## Scripts

| Command         | What it does                                      |
| --------------- | ------------------------------------------------- |
| `npm start`     | Runs `server.js` on port 3000                     |
| `npm run build` | Builds the Angular client into `public/`          |

For front-end development with live reload, run `npm start` in the project root for the API, then `ng serve` inside `client/`.

> Note: `ng serve` runs on port 4200 and does not proxy `/api` requests to port 3000 by default, so the gallery will only load photos when using the built version served by Express. Add an Angular dev-server proxy if you need live reload with the API.

## API

| Method | Path          | Description                                                                                       |
| ------ | ------------- | ------------------------------------------------------------------------------------------------- |
| GET    | `/api/photos` | Returns all photos as JSON: `{ _id, src }`, where `src` is a base64 data URL                      |
| POST   | `/api/photos` | Uploads one image (multipart form field `photo`). Returns `201` with the photo, or `400` on error |

## Project structure

```
.
├── server.js        # Express server and API
├── package.json     # Server dependencies and scripts
├── client/          # Angular source
│   └── src/app/     # App component, template and config
└── public/          # Built Angular output (generated, not committed)
```

## Known limitations

- Every photo is returned, full-size and base64-encoded, in a single request, so the gallery will slow down as it grows.
- No thumbnails, pagination, authentication or delete.
- The MongoDB address and port are hard-coded in `server.js`.

## Ideas for improvement

- Generate thumbnails and load full images only in the lightbox
- Store images in GridFS or object storage and serve them by URL
- Add pagination, delete, and keyboard controls in the lightbox
- Move configuration into environment variables
