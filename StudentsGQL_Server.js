const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");
const path = require("path");
const sqlite3 = require("sqlite3").verbose();
const { open } = require("sqlite");

let db;
(async () => {
    db = await open({
        filename: path.join(__dirname, "studentsinfo.sqlite"), // ✅ Absolute path
        driver: sqlite3.Database,
    });
})();


// GraphQL Schema
typeDefs = gql`
    type Department {
        id: ID!
        name: String!
        address: String!
    }

    type Student {
        id: ID!
        first_name: String!
        last_name: String!
        student_id: String!
        address: String!
        department: Department!
    }

    type Query {
        studentsByDepartment(departmentId: ID!): [Student]
        departments: [Department]
    }

    type Mutation {
        addStudent(
            first_name: String!,
            last_name: String!,
            student_id: String!,
            address: String!,
            department_id: ID!
        ): Student
    }
`;


// Resolvers  students.department_id = ?
const resolvers = {
    Query: {
        studentsByDepartment: async (_, { departmentId }) => {
            return await db.all(
                `SELECT students.*, departments.name AS department_name, departments.address AS department_address 
                 FROM students 
                 JOIN departments ON students.department_id = departments.id 
                 WHERE departments.id = ?`, 
                [departmentId]
            );
        },
        departments: async () => {
            return await db.all(`SELECT * FROM departments`);
        }
    },
    Mutation: {
        addStudent: async (_, { first_name, last_name, student_id, address, department_id }) => {
            const result = await db.run(
                `INSERT INTO students (first_name, last_name, student_id, address, department_id)
                 VALUES (?, ?, ?, ?, ?)`,
                [first_name, last_name, student_id, address, department_id]
            );
    
            // ✅ Retrieve the newly added student with department details
            const insertedStudent = await db.get(
                `SELECT students.id, students.first_name, students.last_name, students.student_id, students.address, 
                        departments.id AS department_id, departments.name AS department_name, departments.address AS department_address
                 FROM students 
                 JOIN departments ON students.department_id = departments.id
                 WHERE students.rowid = ?`,
                [result.lastID]
            );
    
            return {
                id: insertedStudent.id, // ✅ Ensure student ID is included
                first_name: insertedStudent.first_name,
                last_name: insertedStudent.last_name,
                student_id: insertedStudent.student_id,
                address: insertedStudent.address,
                department: { 
                    id: insertedStudent.department_id, // ✅ Ensure department ID is included
                    name: insertedStudent.department_name,
                    address: insertedStudent.department_address
                }
            };
        }
    },
    
    Student: {
        department: (student) => ({
            id: student.department_id,
            name: student.department_name,
            address: student.department_address,
        }),
    },
};


//address: student.department_address,

// Initialize Apollo Server
async function startServer() {
    const app = express();
    const server = new ApolloServer({ typeDefs, resolvers });
    await server.start();
    server.applyMiddleware({ app });

    app.listen({ port: 4000 }, () =>
        console.log("Server ready at http://localhost:4000/graphql")
    );
}

startServer();
