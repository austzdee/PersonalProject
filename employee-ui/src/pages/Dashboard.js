import React, { useEffect, useState } from "react";
import api from "../api"; 
import { useNavigate } from "react-router-dom";
import {
    Container,
    Typography,
    Button,
    Grid,
    Card,
    CardContent,
    CardHeader,
    CircularProgress,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
} from "@mui/material";

function Dashboard({ onLogout, username, role }) {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [openDialog, setOpenDialog] = useState(false);

    useEffect(() => {
        api
            .get("/api/Employees") // 👈 baseURL comes from .env
            .then((res) => {
                setEmployees(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching employees:", err.response || err.message);
                alert("Failed to fetch employees");
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

    const handleLogoutClick = () => setOpenDialog(true);
    const confirmLogout = () => {
        setOpenDialog(false);
        onLogout();
    };
    const cancelLogout = () => setOpenDialog(false);

    return (
        <Container maxWidth="md" sx={{ mt: 4 }}>
            <Typography variant="h4" align="center" gutterBottom>
                Employee Dashboard
            </Typography>

            <Typography variant="h6" gutterBottom>
                Welcome, {username} ({role})
            </Typography>

            <Button
                variant="contained"
                color="secondary"
                onClick={handleLogoutClick}
                sx={{ mb: 3 }}
            >
                Logout
            </Button>

            {/* Confirmation Dialog */}
            <Dialog open={openDialog} onClose={cancelLogout}>
                <DialogTitle>Confirm Logout</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to log out?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={cancelLogout} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={confirmLogout} color="secondary" autoFocus>
                        Logout
                    </Button>
                </DialogActions>
            </Dialog>

            <Grid container spacing={3}>
                {employees.map((emp) => (
                    <Grid item xs={12} sm={6} md={4} key={emp.id}>
                        <Card elevation={3}>
                            <CardHeader
                                title={emp.name}
                                titleTypographyProps={{ variant: "h6" }}
                            />
                            <CardContent>
                                <Typography variant="body2" color="text.secondary">
                                    <strong>Position:</strong> {emp.position}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    <strong>ID:</strong> {emp.id}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}

export default Dashboard;