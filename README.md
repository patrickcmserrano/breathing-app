# 4-7-8 Breathing Exercise App

A web application designed to guide users through the 4-7-8 breathing technique, a simple yet powerful relaxation exercise that can help reduce anxiety and promote better sleep.

## Features

- Visual and audio guidance for the 4-7-8 breathing technique
- Interactive progress bar and cycle counter
- Bell sound notifications at the start of each breathing cycle
- Customizable background sounds for enhanced relaxation
- Dark/light theme support with system preference detection
- Fully responsive design for all devices
- Built with vanilla JavaScript, HTML5, and CSS3

## How It Works

The app guides you through the following breathing pattern:
1. Inhale for 4 seconds
2. Hold breath for 7 seconds
3. Exhale for 8 seconds
4. Repeat for 4 complete cycles

Background music options include:
- Meditation Spiritual Music
- Middle East Oriental Music
- Irish Harp
- Voice of the Oud
- Tibetan Singing Bowl

## Getting Started

### Prerequisites

- A modern web browser
- Node.js (for development)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/patrickcmserrano/breathing-app.git
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The app will open automatically in your default browser.

## Deployment

### GitHub Pages

To deploy this application to GitHub Pages:

1. In your repository settings, go to the "Pages" section
2. Under "Source", select the branch you want to deploy (usually `main` or `master`)
3. Select the root folder (`/`) as your publishing source
4. Click "Save"

The app will be available at `https://patrickcmserrano.github.io/breathing-app/`

Note: Make sure your repository is public for GitHub Pages to work with a free account.

## Technical Details

- Pure JavaScript with ES6+ features
- CSS Grid and Flexbox for responsive layouts
- CSS animations for visual feedback
- Web Audio API for sound management
- Local storage for theme preferences
- CSS variables for theming
- Modular JavaScript architecture

## Project Structure

```
breathing-app/
├── css/
│   ├── animations.css    # Animation styles
│   ├── components.css    # UI component styles
│   ├── layout.css       # Layout and structure
│   ├── responsive.css   # Media queries
│   └── theme.css        # Theme variables
├── js/
│   ├── audioPlayer.js    # Background music controller
│   ├── breathingExercise.js # Core breathing logic
│   └── themeManager.js   # Theme switching logic
├── sounds/              # Audio files
└── app.js              # Main application entry
```

## License

This project is open source and available under the MIT License.

## Credits

- Audio files provided by [Pixabay](https://pixabay.com/) under the Pixabay License
- CSS Framework: [Pico.css](https://picocss.com/)

## Author

Created by Patrick CM Serrano

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.