
# Html Text Editor

Tags: `PWA` `JavaScript` `Text Manipulation` `Bootstrap` `Browser Utility`
A consolidated, browser-based toolkit providing a unified interface for common text transformations, code formatting, and data manipulation.

## Context & Story

This utility consolidates various standalone micro-applications—previously siloed into separate scripts—into a single, cohesive Progressive Web Application (PWA). The goal was to move these powerful developer tools off of constrained desktop environments and make them universally accessible via the web, supporting file input via drag-and-drop or explicit file selection.

## Architecture & Decisions

*   **PWA Implementation:** Utilizes a Web Manifest (`manifest.json`) to enable installation on local operating systems, providing a native-app feel within the browser ecosystem.
*   **Framework Agnostic:** Built primarily with vanilla JavaScript and standard HTML/CSS, minimizing external framework dependencies to ensure maximum portability and low overhead.
*   **UI/UX:** Leverages Bootstrap 5 for responsive, component-based structure, ensuring a professional, consistent UI across devices.
*   **File Handling:** Implemented robust file I/O support via the File API, accepting input through both file selection (`<input type="file">`) and native drag-and-drop events.
*   **Utility Grouping:** Core functionality (e.g., case conversion, encoding, formatting) is grouped via context-aware buttons and dropdown menus to prevent interface clutter while maintaining discoverability.

## Key Features

*   **Comprehensive Utility Suite:** Includes dedicated functions for string trimming (start, end, all), URL encoding/decoding, and Base64 encoding/decoding.
*   **Code Formatting:** Integrated support for beautifying structured data types, including XML, JSON, CSS, and SQL, using external libraries.
*   **Data Transformation:** Offers advanced data manipulation tools such as list deduplication, sorting, and pattern-matching merges between multiple text inputs.
*   **Persistence & Export:** Supports multiple native export formats (TXT, JSON, XML, CSV, CSS, SQL) and includes local caching mechanisms for quick data saving within the browser session.
*   **Accessibility:** Includes text-to-speech functionality (`speak()`) for immediate content review.

## Quick Start

1.  **Clone Repository:**
    ```bash
    git clone [repository-url]
    cd html-text-editor
    ```
2.  **Serve Locally:** Since this is a client-side PWA, use a local server:
    ```bash
    npx http-server
    ```
3.  Access the application via the provided local URL.

## ✨ Features Overview

*   **Universal Text Editor:** Primary workspace for raw text input.
*   **Data Formatting Tools:** Specialized handlers for formatting data structures (e.g., CSV, JSON preparation).
*   **Encryption/Encoding:** Built-in tools for Base64 encoding/decoding, and basic character set conversion.
*   **Utility Modules:** Includes dedicated functions for:
    *   Trimming Whitespace
    *   Case Conversion (CamelCase, Snake_Case, PascalCase)
    *   URL Encoding/Decoding
*   **Interactive UI:** Built with modern JavaScript/HTML, offering instant feedback and minimal boilerplate.

## 🚀 Getting Started

### Prerequisites
*   Node.js and npm (Node Package Manager) installed on your local machine.

### Installation
1.  **Clone the Repository:**
    ```bash
    git clone <repository-url>
    cd <repository-directory>
    ```
2.  **Install Dependencies:**
    ```bash
    npm install
    ```

### Running the Application
Due to the nature of modern web applications, a local server is required to serve the files correctly.

```bash
npm run serve
# OR (if the script is not set up)
npx http-server .
```


The application will be accessible in your browser at http://localhost:8080 (or the port specified by the server).

### ⚙️ Usage Guide

The application is divided into modular sections. Use the input text field to paste content, and the corresponding control buttons to apply transformations.

#### 📋 1. Text Transformations

Select a transformation type and click the corresponding button. The output will appear in the designated output panel.

* Open and edit text files.
* Perform various text operations such as single line, distinct list, sort list, upper case, lower case, duplicate lines, trim, base64 encoding/decoding, XML namespace removal, and beautify.
* Get distinct and matching items from two lists.
* Speak the text.
* Clear the text.
* Copy the text to the clipboard.
* Save the text as different file formats.
* Save and clear items from the cache.

#### 🧱 Technology Stack

* HTML5: Structure of the user interface.
* CSS3: Styling and responsiveness (Utilizing Flexbox/Grid).
* JavaScript (ES6+): Core application logic and interactivity.

#### 🤝 Contributing
We welcome contributions! If you find a bug, or have an idea for a new utility function, please follow these steps:

1. Fork the repository.
2. Create a new feature branch (git checkout -b feature/AmazingFeature).
3. Commit your changes (git commit -m 'feat: Add amazing feature').
4. Push to the branch (git push origin feature/AmazingFeature).
5. Open a Pull Request!

#### 📄 License

This project is licensed under the MIT License - see the [MIT License](LICENSE) file for details.
