import React, { useEffect, useState } from "react";
import api from "../api"; //  shared instance
import { useNavigate } from "react-router-dom";
import { Container, Typography, CircularProgress, Grid, Card, CardContent } from "@mui/material";

function EmployeeList() {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api
            .get("/api/Employees") 
            .then((res) => {
                setEmployees(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching employees:", err.response || err.message);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <Container sx={{ mt: 4, textAlign: "center" }}>
                <CircularProgress />
                <Typography variant="body1" sx={{ mt: 2 }}>
                    Loading employees...
                </Typography>
            </Container>
        );
    }

    return (
        <Container maxWidth="md" sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom>
                Employees
            </Typography>
            <Grid container spacing={3}>
                {employees.map((emp) => (
                    <Grid item xs={12} sm={6} md={4} key={emp.id}>
                        <Card elevation={3}>
                            <CardContent>
                                <Typography variant="h6">{emp.name}</Typography>
                                <Typography variant="body2">Position: {emp.position}</Typography>
                                <Typography variant="body2">ID: {emp.id}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}

export default EmployeeList;