-- Insert data into departments table
INSERT INTO departments (id, name, address) VALUES
(1, 'Computer Science', 'Fake Street 1\nCity, State, ZIP'),
(2, 'Mathematics', 'Fake Street 2\nCity, State, ZIP'),
(3, 'Physics', 'Fake Street 3\nCity, State, ZIP');

-- Insert data into courses table
INSERT INTO courses (id, name, department_id, course_number) VALUES
(1, 'Course 1', 2, 'C001'),
(2, 'Course 2', 3, 'C002'),
(3, 'Course 3', 1, 'C003'),
(4, 'Course 4', 2, 'C004'),
(5, 'Course 5', 3, 'C005'),
(6, 'Course 6', 2, 'C006'),
(7, 'Course 7', 1, 'C007'),
(8, 'Course 8', 2, 'C008'),
(9, 'Course 9', 1, 'C009'),
(10, 'Course 10', 3, 'C010');

-- Insert data into students table
INSERT INTO students (id, first_name, last_name, student_id, address, department_id) VALUES
(1, 'John', 'Doe', 'S00001', '123 Fake Street\nCity, State, ZIP', 2),
(2, 'Jane', 'Smith', 'S00002', '456 Fake Avenue\nCity, State, ZIP', 3),
(3, 'Alice', 'Johnson', 'S00003', '789 Fake Blvd\nCity, State, ZIP', 1),
(4, 'Bob', 'Williams', 'S00004', '101 Fake Lane\nCity, State, ZIP', 2),
(5, 'Charlie', 'Brown', 'S00005', '102 Fake Place\nCity, State, ZIP', 3),
(6, 'David', 'Davis', 'S00006', '103 Fake Court\nCity, State, ZIP', 1),
(7, 'Eve', 'Martinez', 'S00007', '104 Fake Way\nCity, State, ZIP', 2),
(8, 'Frank', 'Garcia', 'S00008', '105 Fake Road\nCity, State, ZIP', 3),
(9, 'Grace', 'Rodriguez', 'S00009', '106 Fake Dr\nCity, State, ZIP', 1),
(10, 'Hank', 'Lee', 'S00010', '107 Fake Parkway\nCity, State, ZIP', 2);

-- Insert data into student_courses table
INSERT INTO student_courses (student_id, course_id) VALUES
(19, 5),
(3, 8),
(21, 7),
(32, 4),
(6, 7),
(6, 9);
