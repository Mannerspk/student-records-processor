const fs = require('fs');

/**
 * Calculates the average grade for a single student.
 * @param {Object} student - The student object with grades array.
 * @returns {number} The average grade, or 0 if no grades.
 */
function getAverageGrade(student) {
  if (!student || !Array.isArray(student.grades) || student.grades.length === 0) {
    return 0;
  }
  const sum = student.grades.reduce((acc, grade) => acc + grade, 0);
  return sum / student.grades.length;
}

/**
 * Returns the top n students sorted by average grade in descending order.
 * @param {Array} students - Array of student objects.
 * @param {number} n - Number of top students to return.
 * @returns {Array} Array of top n students.
 * @throws {Error} If n is negative or not a number.
 */
function getTopStudents(students, n) {
  if (typeof n !== 'number' || n < 0) {
    throw new Error('n must be a non-negative number');
  }
  // Create a copy to avoid modifying original array
  const studentsCopy = [...students];
  // Sort by average grade descending
  studentsCopy.sort((a, b) => getAverageGrade(b) - getAverageGrade(a));
  // Return first n elements
  return studentsCopy.slice(0, n);
}

/**
 * Groups students by their course field.
 * @param {Array} students - Array of student objects.
 * @returns {Object} Object with course names as keys and arrays of students as values.
 */
function groupByCourse(students) {
  return students.reduce((acc, student) => {
    const course = student.course;
    if (!acc[course]) {
      acc[course] = [];
    }
    acc[course].push(student);
    return acc;
  }, {});
}

/**
 * Returns a count of enrolled vs not enrolled students.
 * @param {Array} students - Array of student objects.
 * @returns {Object} Object with enrolled and notEnrolled counts.
 */
function getEnrolledCount(students) {
  const enrolled = students.filter(student => student.enrolled === true).length;
  const notEnrolled = students.length - enrolled;
  return { enrolled, notEnrolled };
}

/**
 * Performs a case-insensitive search for a student by name.
 * @param {Array} students - Array of student objects.
 * @param {string} name - Name to search for.
 * @returns {Object|null} The matching student object or null if not found.
 */
function findStudent(students, name) {
  if (typeof name !== 'string') {
    return null;
  }
  const lowerName = name.toLowerCase();
  return students.find(student => student.name.toLowerCase().includes(lowerName)) || null;
}

/**
 * Returns the average grade for each course, sorted from highest to lowest.
 * @param {Array} students - Array of student objects.
 * @returns {Array} Array of objects with course and averageGrade, sorted descending.
 */
function getCourseAverages(students) {
  // Group by course
  const grouped = groupByCourse(students);
  // Calculate average for each course
  const courseAverages = Object.keys(grouped).map(course => {
    const courseStudents = grouped[course];
    const totalAverage = courseStudents.reduce((sum, student) => sum + getAverageGrade(student), 0);
    const avg = totalAverage / courseStudents.length;
    return { course, averageGrade: avg };
  });
  // Sort by averageGrade descending
  courseAverages.sort((a, b) => b.averageGrade - a.averageGrade);
  return courseAverages;
}

/**
 * Builds and returns a summary object.
 * @param {Array} students - Array of student objects.
 * @returns {Object} Summary object with total students, overall average, top student, and course breakdown.
 */
function exportSummary(students) {
  if (students.length === 0) {
    return {
      totalStudents: 0,
      overallAverageGrade: 0,
      topStudent: null,
      courseBreakdown: {}
    };
  }
  const totalStudents = students.length;
  const overallAverageGrade = students.reduce((sum, student) => sum + getAverageGrade(student), 0) / totalStudents;
  const topStudent = getTopStudents(students, 1)[0] || null;
  const courseBreakdown = groupByCourse(students);
  return {
    totalStudents,
    overallAverageGrade,
    topStudent,
    courseBreakdown
  };
}

/**
 * Main function to run the program and print results.
 */
function main() {
  try {
    // Read students.json from disk
    const data = fs.readFileSync('./students.json', 'utf8');
    const students = JSON.parse(data);

    console.log('=== Student Records Data Processor ===\n');

    // Total student count
    console.log(`Total Students: ${students.length}`);

    // Overall average grade
    let overallAvg = 0;
    if (students.length > 0) {
      overallAvg = students.reduce((sum, student) => sum + getAverageGrade(student), 0) / students.length;
    }
    console.log(`Overall Average Grade: ${overallAvg.toFixed(2)}\n`);

    // Top performing students (top 3)
    const top3 = getTopStudents(students, 3);
    console.log('Top 3 Students by Average Grade:');
    top3.forEach((student, index) => {
      const avg = getAverageGrade(student);
      console.log(`  ${index + 1}. ${student.name} - ${avg.toFixed(2)}`);
    });
    console.log('');

    // Grouped by course
    const grouped = groupByCourse(students);
    console.log('Students Grouped by Course:');
    for (const course in grouped) {
      console.log(`  ${course}: ${grouped[course].length} student(s)`);
    }
    console.log('');

    // Enrolled count
    const enrolledCount = getEnrolledCount(students);
    console.log(`Enrolled Students: ${enrolledCount.enrolled}`);
    console.log(`Not Enrolled Students: ${enrolledCount.notEnrolled}\n`);

    // Search for a student (example: search for "alice")
    const searchName = 'alice';
    const found = findStudent(students, searchName);
    console.log(`Search for "${searchName}":`);
    if (found) {
      console.log(`  Found: ${found.name} (ID: ${found.id})`);
    } else {
      console.log(`  No student found with name containing "${searchName}".`);
    }
    console.log('');

    // Course averages
    const courseAverages = getCourseAverages(students);
    console.log('Average Grade by Course (Highest to Lowest):');
    courseAverages.forEach(({ course, averageGrade }) => {
      console.log(`  ${course}: ${averageGrade.toFixed(2)}`);
    });
    console.log('');

    // Export summary
    const summary = exportSummary(students);
    console.log('Export Summary:');
    console.log(JSON.stringify(summary, null, 2));

    // Write summary to report.json (stretch goal)
    fs.writeFileSync('./report.json', JSON.stringify(summary, null, 2));
    console.log('\nSummary written to report.json');

  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

// Run the main function
main();