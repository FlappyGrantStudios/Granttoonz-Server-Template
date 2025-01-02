# Granttoonz Template

Granttoonz is a new website that allows you to watch live-streamed, average-user-created cartoons for free- if you have internet. Hosting a channel is easy and does not require a license.

This repository serves as a base template for a project that involves a server that streams images, uses metadata for additional information, and provides endpoints for fetching dynamic data. The setup also includes sample data and example environment variables for easy configuration.

## Features
- Web UI for viewing any channel (even if it is not listed on the home page) [here](https://granttoonz.flappygrant.com)
- Serves JPEG frames in a loop from a `data/frames` directory
- Supports dynamic fetching of metadata via REST API
- Sample `.env.example` and `data-example` folder with dummy data
- Clean project structure with `.gitignore` to protect sensitive files

## Requirements
- [Node.js](https://nodejs.org/) v16 or higher
- A `.env` file with appropriate environment variables (see `.env.example`)
- A folder containing the frames for streaming (default is `data/frames`)
- Sample metadata in `data/meta.json`

## Installation

### 1. Clone the repository:
```shell
git clone https://github.com/FlappyGrantStudios/Granttoonz-Server-Template.git
cd granttoonz
```

### 2. Install dependencies:
```shell
npm install
```

### 3. Setup the environment file:
Copy `.env.example` to `.env` and edit the values as needed:

```shell
cp .env.example .env
```

Ensure the `.env` file has the correct configuration, such as the `PORT` and any other relevant settings.

### 4. Add frames:
To stream images, you need JPEG frames in the `data/frames` directory. These frames can either be generated from an MP4 video or manually added. 

#### Converting MP4 to JPEG frames:
If you have an MP4 file at the root of your project, you can convert it into sequential JPEG frames using `ffmpeg`. Here’s the command to convert your MP4 video into JPEG frames at 24 frames per second:

```shell
ffmpeg -i video.mp4 -vf "fps=24" data/frames/frame%04d.jpg
```

This command will take the `video.mp4` file, extract frames at 24 frames per second, and save them as `frame0001.jpg`, `frame0002.jpg`, and so on in the `data/frames` directory.

#### Create the `data` folder structure:
After converting your video into frames, you’ll need to create a `data` folder with the following structure:

```directory-structure
data/
├── frames/            # Directory for storing JPEG frames
├── meta.json          # Metadata for the channel
```

- The `frames/` folder should contain JPEG images (frame001.jpg, frame002.jpg, etc.).
- The `meta.json` file should contain information like the channel title. A sample `meta.json`:

```json
{
    "title": "Example Channel"
}
```

You can modify this file to include any additional properties or data you wish to make accessible through the API.

### 5. Sample Data:
If you're looking for sample data, you can use the `data-example` folder provided in the project. Copy the contents of the `data-example` folder into the `data` folder:

```shell
cp -r data-example/* data/
```

This will set up the `data` folder with sample frames and metadata to get you started. You can replace the sample frames with your own as needed.

### 6. Start the server:
Run the server with:
```shell
npm start
```

By default, the server will run on `http://localhost:7024`. You can adjust the `PORT` by modifying the `.env` file.

### 7. Access the server:
Once the server is running, you can access the frame stream via the root endpoint:

```url
http://localhost:7024/
```

Metadata for the channel can be accessed via the `/meta/:property` endpoint (e.g., `http://localhost:7024/meta/title`).

## Folder Structure

```directory-structure
granttoonz/
│
├── data/                # Folder for frames and metadata
│   ├── frames/          # Place your JPEG frames here
│   ├── meta.json        # Metadata for the server
│
├── node_modules/        # Installed dependencies
├── .env.example         # Example environment file
├── .gitignore           # Git ignore file
├── package.json         # Project dependencies
├── README.md            # Project documentation
└── package-lock.json    # Dependency lock file
```

## Configuration

### `.env`
The `.env` file contains environment variables used for configuration. The `.env.example` file is provided with placeholder values, which you should copy to `.env` and modify as needed.

- `PORT`: The port the server will run on (default: `7024`).

### `data/meta.json`
This file contains metadata in JSON format that can be fetched via the `/meta/:property` endpoint. An example structure:

```json
{
    "title": "Granttoonz Stream"
}
```

You can modify this file to include any additional properties or data you wish to make accessible through the API.

### `data/frames`
This folder holds the frames of the video to be streamed. Frames should be named sequentially as `frame1.jpg`, `frame2.jpg`, and so on.

To ensure smooth streaming, frames should be created at a rate of 24 frames per second. You can use `ffmpeg` or any other tool to extract frames from your video file.

## Notes

- **Security**: Never commit your actual `.env` file with sensitive information. The `.env.example` file is a template to be modified for your local setup.
- **Frame Files**: Ensure the frame files are named sequentially (`frame1.jpg`, `frame2.jpg`, etc.) for the server to stream them correctly.
- **Customization**: The template can be easily customized to suit your specific needs by changing the frame format (will not work with our web UI), adding more metadata properties (also will not work with our web UI), or adjusting server behavior (not recommended).

## License
This project is licensed under the MIT License.
