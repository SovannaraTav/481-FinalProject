# 481-Final Project

## Instructions
1. Ensure to have Node.js installed which will include npm (https://nodejs.org/en).

2. Verify that Node.js is installed by checking with ```node -v``` on the command line. To check for npm, use ```npm -v``` on the command line.

3. Created a folder on your computer and open the folder in Microsoft Visual Studio Code.

4. ```git clone``` this repository using the HTTPS method on the command line and navigate to the root of the repository folder.

5. At the root of the repository folder, execute ```npm install``` on the command line to install dependencies which will appeared in a ```node_modules``` folder. This folder contains many files and folders, thus SHOULD NOT be pushed to the GitHub repository and won't be due to being grayed out and indicated in the `.gitignore` file.

6. Download the provided ```.env.local``` file. DO NOT PUSH the file to the GitHub repository as it contains sensitive information. It should be grayed out to prevent this from happening and indicated in the `.gitignore` file.

7. To run the development server to test and view your changes, execute ```npm run dev``` on the command line.

## React + Vite
This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
