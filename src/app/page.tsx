'use client'

import useStore from '@/stores/store'
import {useEffect, useRef, useState} from "react";
import {redirect} from "next/navigation";
import {load} from '@2gis/mapgl';
import {Box, Button, TextField} from "@mui/material";
import axios from 'axios';
import DataDialog from "@/app/Dialog"; // Для выполнения запросов к Geocoder API

export default function HomePage() {

    const [latitude, setLatitude] = useState<number | undefined>();
    const [longitude, setLongitude] = useState<number | undefined>();
    const [data, setData] = useState<any | null>()
    const [searchQuery, setSearchQuery] = useState<string>('');
    const key = '768f8088-7a49-4343-b7a4-90d71ca3f2bb';

    const store = useStore();

    useEffect(() => {
        if (!store.isAuth) {
            redirect('/login');
        } else {
            if ("geolocation" in navigator) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const latitude = position.coords.latitude;
                        const longitude = position.coords.longitude;
                        setLatitude(latitude);
                        setLongitude(longitude);
                        let mapInstance: any;
                        load().then((mapglAPI) => {
                            mapInstance = new mapglAPI.Map('Map', {
                                center: [longitude, latitude],
                                zoom: 13,
                                key: key,
                            });
                            const marker = new mapglAPI.Marker(mapInstance, {
                                coordinates: [longitude, latitude],
                            });
                        });

                        return () => mapInstance && mapInstance.destroy();
                    },
                    (error) => {
                        let mapInstance: any;
                        load().then((mapglAPI) => {
                            mapInstance = new mapglAPI.Map('Map', {
                                center: [37.621202, 55.753544],
                                zoom: 13,
                                key: key,
                            });
                        });

                        return () => mapInstance && mapInstance.destroy();
                    }
                );

            } else {
                let mapInstance: any;
                load().then((mapglAPI) => {
                    mapInstance = new mapglAPI.Map('Map', {
                        center: [37.621202, 55.753544],
                        zoom: 13,
                        key: key,
                    });
                });

                return () => mapInstance && mapInstance.destroy();
            }
        }
    }, [store.isAuth]);

    const handleSearch = async () => {
        const URL = `https://catalog.api.2gis.com/3.0/items?q=${searchQuery}&sort_point=${longitude},${latitude}&key=768f8088-7a49-4343-b7a4-90d71ca3f2bb&fields=items.point`
        const response = await axios.get(URL);
        setData(response.data);
        setOpen(true)

        const log = await axios.post('https://threegis-backend.onrender.com/request/create', {query:searchQuery}, {
            headers: { Authorization: `Bearer ${store.token}` }
        })
    };

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 2}}>
                <TextField
                    label="Поиск места"
                    variant="outlined"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button onClick={handleSearch} variant="contained" sx={{ marginLeft: 2, height:'56px' }}>
                    Найти
                </Button>
            </Box>
            <DataDialog open={open} handleClose={handleClose} handleClickOpen={handleClickOpen} data={data}/>
            <div
                id="Map"
                style={{width: '100%', height: '100vh'}}
            />
        </>
    );
}
