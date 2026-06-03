# ScanWise - URL Safety Checker 🛡️

ScanWise is a web application that helps users check if a URL is potentially malicious or safe to visit. The tool analyzes URLs for common phishing patterns and security risks, providing an easy-to-understand safety assessment.

## Features

- **URL Safety Analysis**: Check if a URL is potentially malicious or safe to visit
- **Detailed Risk Assessment**: Get a comprehensive breakdown of detected security risks
- **Pattern Detection**: Identify common phishing patterns and suspicious elements
- **Domain Age Check**: See how long a domain has been registered (simulated in this version)
- **Recent History**: Keep track of your recently checked URLs
- **Responsive Design**: Works on desktop and mobile devices

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/r-secured.git
   cd r-secured
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Start the development server
   ```bash
   npm run serve
   ```
   
   Or use Expo for mobile development:
   ```bash
   npm start
   ```

4. Build for production
   ```bash
   npm run build
   ```

## How It Works

ScanWise analyzes URLs using several techniques:

1. **URL Structure Analysis**: Checks if the URL follows a valid format
2. **Domain Inspection**: Looks for suspicious domain patterns
3. **Phishing Pattern Detection**: Identifies common patterns used in phishing attacks
4. **Brand Impersonation Check**: Detects attempts to impersonate popular brands
5. **Domain Age Assessment**: Newer domains are often riskier (simulated in this version)

## Technology Stack

- React.js for the user interface
- CSS for styling
- Webpack for bundling
- Local Storage for saving recent checks
- Expo for mobile development

## Limitations

Please note that this tool provides a basic risk assessment based on common patterns and cannot guarantee with 100% accuracy whether a URL is safe or malicious. Always exercise caution when visiting unfamiliar websites.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Font Awesome for icons
- Google Fonts for typography
- Expo framework for mobile development
