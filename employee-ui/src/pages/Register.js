import React, { useState } from "react";

     function Register() {
    const [formData, setFormData] = useState({ username: "", password: "", role: "" });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        const response = await fetch("https://localhost:5017/api/Auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });
        if (response.ok) {
            alert("Registration successful!");
        } else {
            alert("Registration failed");
        }
    };

    return (
        <div>
            <h2>Register</h2>
            <input name="username" placeholder="Username" onChange={handleChange} />
            <input name="password" type="password" placeholder="Password" onChange={handleChange} />
            <input name="role" placeholder="Role" onChange={handleChange} />
            <button onClick={handleSubmit}>Submit</button>
        </div>
    );
}

export default Register;