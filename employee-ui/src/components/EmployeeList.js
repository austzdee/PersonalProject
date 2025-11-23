import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../styles/Employee.module.css'; // adjust the path to your CSS module if needed

function EmployeeList() {
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        // Retrieve the JWT from localStorage
        const token = localStorage.getItem('token');
        if (!token) return; // Optionally redirect to login if token is missing

        // Call your API with the token
        axios
            .get('/api/Employees', {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((response) => setEmployees(response.data))
            .catch((error) => {
                console.error(
                    'Error fetching employees:',
                    error.response?.data || error.message
                );
            });
    }, []);

    return (
        <div className={styles.employeeContainer}>
            <h2 className={styles.employeeTitle}>Employee Directory</h2>
            <div className={styles.employeeCardGrid}>
                {employees.map((emp) => (
                    <div key={emp.id} className={styles.employeeCard}>
                        <h3 className={styles.employeeName}>{emp.name}</h3>
                        <p>
                            <strong>ID:</strong> {emp.id}
                        </p>
                        
                    </div>
                ))}
            </div>
        </div>
    );
}

export default EmployeeList;
