# TacBoard

### Plan. Visualize. Play.

A simple, interactive football tactics board for arranging player formations, sketching movements, and saving tactical ideas.

---

## 📌 Table of Contents

- [About the Project](#-about-the-project)
- [Features](#-features)
- [Built With](#-built-with)
- [Getting Started](#-getting-started)
- [How to Use](#-how-to-use)
- [Project Structure](#-project-structure)
- [How It Works](#-how-it-works)
- [Current Limitations](#-current-limitations)
- [Future Improvements](#-future-improvements)
- [Contributing](#-contributing)
- [License](#-license)

## 📖 About the Project

**TacBoard** is a browser-based football strategy planner. It provides a visual pitch where users can select a formation, reposition players, draw tactical arrows, and write strategy notes.

The project is built with plain HTML, CSS, and JavaScript. It does not require a framework, package manager, database, or backend server.

> This is a front-end project. Tactics are saved in the browser's local storage on the device and browser being used.

## ✨ Features

- **Formation selection:** Choose from four built-in formations: 4-3-3, 4-4-2, 4-2-3-1, and 3-5-2.
- **Interactive player positioning:** Drag players around the pitch to adjust their positions.
- **Tactical drawing:** Draw lines on the pitch to illustrate runs, passes, and movement.
- **Team customization:** Enter a team name and see it reflected on the board.
- **Strategy notes:** Write tactical instructions alongside the pitch.
- **Save tactics:** Save the selected formation, player positions, team name, notes, and drawings in browser local storage.
- **Restore saved tactics:** Previously saved tactics are loaded when the page is opened again in the same browser.
- **Reset board:** Restore the default team name and 4-3-3 formation and clear notes and drawings.
- **Responsive layout:** The interface adapts to narrower screens.

## 🧰 Built With

| Technology | Purpose |
| --- | --- |
| HTML5 | Page structure and pitch elements |
| CSS3 | Layout, styling, football pitch, and responsive design |
| JavaScript | Formation logic, pointer interactions, drawing, and local storage |
| SVG | Tactical drawing layer |

No external libraries or frameworks are required.

## 🚀 Getting Started

### Prerequisites

- A modern web browser (Chrome, Edge, Firefox, or Safari).
- A code editor such as [Visual Studio Code](https://code.visualstudio.com/) if you want to edit the project.

### Run locally

**Option 1 — Open directly**

1. Clone or download this repository.
2. Open the project folder.
3. Double-click `index.html` or open it in your browser.

**Option 2 — Use Visual Studio Code**

1. Open the project folder in VS Code.
2. If you use the Live Server extension, right-click `index.html`.
3. Select **Open with Live Server**.

There is no `npm install` or build command because this project uses browser-native HTML, CSS, and JavaScript.

## 🕹️ How to Use

1. Open the page in your browser.
2. Enter a team name in the **Team Setup** panel.
3. Select a formation from the formation dropdown.
4. Choose **Move Players** and drag players to change their positions.
5. Choose **Draw Arrow** and drag across the pitch to add a tactical line.
6. Choose **Clear Arrows** to remove the tactical drawings.
7. Add instructions in **Strategy Notes**.
8. Select **Save Tactics** to store the current setup in your browser.
9. Select **Reset Board** to return to the default setup.

## 📁 Project Structure

```text
TacBoard/
├── index.html   # Main page structure and controls
├── style.css    # Visual styling and responsive layout
├── script.js    # Formation data and interactive functionality
└── README.md    # Project documentation
```

## ⚙️ How It Works

- `index.html` defines the sidebar controls, workspace, football pitch, player container, and SVG drawing layer.
- `style.css` styles the dark interface, pitch markings, player markers, controls, and mobile layout.
- `script.js` stores the formation layouts and handles player creation, formation changes, pointer-based dragging, tactical drawing, saving, resetting, and loading.
- The browser's `localStorage` stores the saved tactics under the key `tactixData`.

## ⚠️ Current Limitations

- Saved tactics are stored locally in the current browser. They are not synced between devices or users.
- There is no user account system, cloud database, or backend.
- The project currently provides four predefined formations.
- The current save flow stores one saved tactics setup per browser storage key; it is not a multi-plan library.
- Tactical drawings are simple lines rather than a full-featured drawing editor.

## 🔮 Future Improvements

Potential features for future versions:

- Export and import tactics as JSON or an image.
- Create, rename, and manage multiple saved tactics.
- Add custom formations and player labels.
- Add opposition players and team-color customization.
- Improve drawing tools with line styles, colors, and undo.
- Add cloud storage and shareable tactics links.

## 🤝 Contributing

Contributions and suggestions are welcome.

1. Fork the repository.
2. Create a branch for your change.
3. Make and test your changes in a browser.
4. Open a pull request with a clear description of the update.

## 📄 License

No license has been specified yet. If you plan to make this project open source, add a license file and update this section with the chosen license.
