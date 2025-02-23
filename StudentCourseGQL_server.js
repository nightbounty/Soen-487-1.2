const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const { Sequelize, DataTypes } = require('sequelize');

const app = express();
const port = 3000;

// Initialize Sequelize (SQLite as an example, replace with actual DB config)
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'database.sqlite' // Change to your actual database
});

// Define Models
const Student = sequelize.define('Student', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    student_id: DataTypes.STRING
}, { tableName: 'students', timestamps: false });

const Course = sequelize.define('Course', {
    name: DataTypes.STRING,
    course_number: DataTypes.STRING
}, { tableName: 'courses', timestamps: false });

const StudentCourses = sequelize.define('StudentCourses', {}, { tableName: 'student_courses', timestamps: false });

// Define relationships
Student.belongsToMany(Course, { through: StudentCourses, foreignKey: 'student_id' });
Course.belongsToMany(Student, { through: StudentCourses, foreignKey: 'course_id' });

// GraphQL Schema Definition
const typeDefs = gql`
    type Student {
        id: ID!
        first_name: String!
        last_name: String!
        student_id: String!
        courses: [Course]
    }

    type Course {
        id: ID!
        name: String!
        course_number: String!
    }

    type Query {
        studentCourses(studentId: ID!): [Course]
    }
`;

// GraphQL Resolvers
const resolvers = {
    Query: {
        studentCourses: async (_, { studentId }) => {
            const student = await Student.findByPk(studentId, { include: Course });
            if (!student) throw new Error('Student not found');
            return student.Courses;
        }
    }
};

// Setup Apollo Server
const server = new ApolloServer({ typeDefs, resolvers });
async function startServer() {
    await server.start();
    server.applyMiddleware({ app });
    app.listen(port, () => {
        console.log(`Server running on http://localhost:${port}/graphql`);
    });
}

startServer();
