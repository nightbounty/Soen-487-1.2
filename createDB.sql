-- Create departments table
CREATE TABLE departments (
    id INTEGER PRIMARY KEY AUTOINCREMENT, -- Sequelize convention: 'id' as primary key
    name TEXT NOT NULL, -- Sequelize convention: 'name' for department name
    address TEXT NOT NULL, -- Sequelize convention: 'address' for department address
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP, -- Sequelize convention: 'createdAt' for timestamps
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP -- Sequelize convention: 'updatedAt' for timestamps
);

-- Create courses table
CREATE TABLE courses (
    id INTEGER PRIMARY KEY AUTOINCREMENT, -- Sequelize convention: 'id' as primary key
    name TEXT NOT NULL, -- Sequelize convention: 'name' for course name
    department_id INTEGER NOT NULL, -- Foreign key referencing departments.id
    course_number TEXT NOT NULL, -- Sequelize convention: 'course_number'
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP, -- Sequelize convention: 'createdAt' for timestamps
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP, -- Sequelize convention: 'updatedAt' for timestamps
    FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE CASCADE
);

-- Create students table
CREATE TABLE students (
    id INTEGER PRIMARY KEY AUTOINCREMENT, -- Sequelize convention: 'id' as primary key
    first_name TEXT NOT NULL, -- Sequelize convention: 'first_name'
    last_name TEXT NOT NULL, -- Sequelize convention: 'last_name'
    student_id TEXT UNIQUE NOT NULL, -- Sequelize convention: 'student_id' for unique identifier
    address TEXT NOT NULL, -- Sequelize convention: 'address'
    department_id INTEGER NOT NULL, -- Foreign key referencing departments.id
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP, -- Sequelize convention: 'createdAt' for timestamps
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP, -- Sequelize convention: 'updatedAt' for timestamps
    FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE CASCADE
);

-- Create a join table for students and courses (many-to-many relationship)
CREATE TABLE student_courses (
    id INTEGER PRIMARY KEY AUTOINCREMENT, -- Sequelize convention: 'id' as primary key
    student_id INTEGER NOT NULL, -- Foreign key referencing students.id
    course_id INTEGER NOT NULL, -- Foreign key referencing courses.id
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP, -- Sequelize convention: 'createdAt' for timestamps
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP, -- Sequelize convention: 'updatedAt' for timestamps
    FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
);
