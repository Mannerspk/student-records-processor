# Student Records Processor

A simple and efficient Node.js script for analyzing and processing student records data. This project reads student information from a JSON file, performs various analytical operations, and outputs insights to the console and a summary report.

## ✨ Features

* Load and parse student records from JSON
* Calculate overall and course-specific average grades
* Identify top-performing students
* Group students by course of study
* Count enrolled vs. not enrolled students
* Search for students by name (case-insensitive)
* Generate and export analytical summary to JSON
* Clean, modular code with well-documented functions

## 🛠️ Technologies

* JavaScript (ES6)
* Node.js
* Built-in modules: `fs` (file system)

## 🚀 Installation

```bash
git clone https://github.com/Mannerspk/student-records-processor.git
cd student-records-processor
npm install
```

## 💻 Usage

You can run the processor in two ways:

### Using npm (recommended)
```bash
npm start
```

### Using Node.js directly
```bash
node app.js
```
or
```bash
node student-records-processor.js
```

### What the script does:
1. Reads student data from `./students.json`
2. Calculates and displays:
   - Total number of students
   - Overall average grade
   - Top 3 students by average grade
   - Students grouped by course
   - Enrolled vs. not enrolled counts
   - Search example (for "alice")
   - Average grade by course (sorted highest to lowest)
3. Exports a detailed summary to `./report.json`

## 📊 Sample Output

When you run the script, you'll see output similar to:

```
=== Student Records Data Processor ===

Total Students: 28
Overall Average Grade: 80.63

Top 3 Students by Average Grade:
  1. Gene .C - 97.75
  2. Samlee .P - 89.50
  3. Kassandra .B - 86.75

... (more analysis)
```

## 📸 Screenshots

Add screenshots or GIFs here to demonstrate the application's output and functionality.

### How to add screenshots:

1. Create a `screenshots` directory in your project root
2. Add your screenshot files there (e.g., `screenshots/sample-output.png`)
3. Use the following markdown syntax to embed them:

```markdown
![Sample Console Output](screenshots/sample-output.png)
![Report JSON Example](screenshots/report-example.png)
```

### Suggested screenshots to include:
- Console output showing the analysis
- The generated report.json file
- Side-by-side comparison of input vs. output

## 🔧 Configuration

To process different student data:
1. Replace the contents of `students.json` with your own student data array
2. Ensure each student object follows the format:
   ```json
   {
     "id": number,
     "name": string,
     "year": number,
     "course": string,
     "grades": [number],
     "enrolled": boolean
   }
   ```
3. Run the script again to see the updated analysis

## 🤝 Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request with:
- Additional analytical features
- Improved error handling
- UI/web interface versions
- Performance optimizations
- Documentation improvements

## 📄 License

This project is licensed under the MIT License.

## 📝 Notes

* The script is designed to be run as a one-time analysis tool
* Output is displayed in the console and saved to report.json
* Original student data in students.json is never modified
* Functions are modular and can be reused in other projects