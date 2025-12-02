import React, { useState } from "react";
import api from "../api"; 
import { useNavigate } from "react-router-dom";
import {
    Container,
    TextField,
    Button,
    Typography,
    Box,
    CircularProgress,
    Paper,
} from "@mui/material";

function Login({ onLogin }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const response = await api.post("/api/Auth/login", {
                username,
                password,
            });

            const token = response.data.token;
            localStorage.setItem("token", token);
            onLogin(token);
        } catch (err) {
            console.error("Login error:", err.response || err.message);
            setError("Invalid username or password");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 8 }}>
            <Paper elevation={3} sx={{ p: 4 }}>
                <Typography variant="h4" align="center" gutterBottom>
                    Employee Management Login
                </Typography>
                <Box component="form" onSubmit={handleSubmit}>
                    <TextField
                        label="Username"
                        fullWidth
                        margin="normal"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <TextField
                        label="Password"
                        type="password"
                        fullWidth
                        margin="normal"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    {error && (
                        <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                            {error}
                        </Typography>
                    )}
                    <Box sx={{ mt: 3, textAlign: "center" }}>
                        <Button type="submit" variant="contained" disabled={loading} fullWidth>
                            {loading ? <CircularProgress size={24} /> : "Login"}
                        </Button>

                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={() => navigate("/register")}>
                            Register
                        </Button>

                    </Box>
                </Box>
            </Paper>
        </Container>
    );
}

export default Login;