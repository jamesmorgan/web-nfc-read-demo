# NFC Tag Reader Web App

A simple web application that allows you to read NFC/RFID tags using your mobile device's browser. Built with Vue 3 and TypeScript.

## Features

- Read NFC tags directly from your browser
- Display tag ID and content
- Real-time scanning feedback
- Clean, responsive UI
- Works on mobile devices with NFC capabilities

## Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)
- Chrome browser on Android device (for NFC functionality)
- NFC-enabled mobile device

## Local Development Setup

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd web-nfc-read-demo
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

## Testing on Mobile Device

1. Ensure your development computer and mobile phone are on the same WiFi network

2. Find your development server's network URL:
   - When you run `npm run dev`, it will display several URLs
   - Look for the one that starts with `Network:` (e.g., `https://192.168.x.x:5173`)

3. On your mobile device:
   - Open Chrome browser (required for Web NFC API)
   - Navigate to the Network URL from step 2
   - You'll see a security warning because of the self-signed certificate
   - Click "Advanced" and then "Proceed to site" (unsafe)
   - The app should now load

4. Using the app:
   - Click the "Start Scanning" button
   - Accept the NFC permission request if prompted
   - Hold an NFC tag near your phone's NFC reader
   - The tag's ID and content will be displayed on screen

## Browser Compatibility

The Web NFC API is currently only supported in:
- Chrome for Android (mobile)
- The device must have NFC hardware support

Other browsers will display a "not supported" message.

## Development Notes

- The app requires HTTPS for the Web NFC API to work
- Local development uses a self-signed certificate
- Keep your phone's screen on and unlocked while scanning
- NFC reader location varies by phone model (usually middle or upper back of phone)

## Building for Production

To create a production build:

```bash
npm run build
```

The built files will be in the `dist` directory.

## License

[MIT License](LICENSE)
