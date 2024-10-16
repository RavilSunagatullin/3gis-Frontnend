'use client'
import React, { useState } from 'react';
import { TextField, Button, Box, Typography,} from '@mui/material';
import axios from 'axios';
import Link from "next/link";
import useStore from "@/stores/store";
import {useRouter} from "next/navigation";



const LoginForm: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const store = useStore();
    const router = useRouter()
    const handleLogin = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const response = await axios.post('https://threegis-backend.onrender.com/auth/login', { username, password });
            store.setToken(response.data.token);
            store.setAuth(true);
            store.setUser({ username, password });
            router.push('/')
        } catch (err) {
            console.error(err);
        }
    };


    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh', // Чтобы контейнер занимал всю высоту экрана
            }}
        >
            <Box
                component="form"
                onSubmit={handleLogin}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    width: '300px',
                    padding: '20px',
                    boxShadow: 3,
                    borderRadius: '8px',
                    backgroundColor: 'white',
                }}
            >
                <Typography variant="h5" gutterBottom>
                    Войти
                </Typography>

                <TextField
                    label="Имя"
                    type="text"
                    fullWidth
                    required
                    margin="normal"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />

                <TextField
                    label="Пароль"
                    type="password"
                    fullWidth
                    required
                    margin="normal"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ mt: 2 }}
                >
                    Отправить
                </Button>


                {/* Добавление кнопки регистрации */}
                <Box sx={{ width: '100%' }}>
                    <Link href="/register" passHref>
                        <Button
                            variant="outlined"
                            color="primary"
                            fullWidth
                            sx={{ mt: 2 }}
                        >
                            Регистрация
                        </Button>
                    </Link>
                </Box>
            </Box>
        </Box>
    );
};

export default LoginForm;
