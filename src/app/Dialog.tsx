import React, { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Card,
    CardContent,
    Typography,
    Grid,
} from '@mui/material';


const DataDialog = (props:any) => {
    return (
        <div>
            <Dialog open={props.open} onClose={props.handleClose} maxWidth="lg" fullWidth>
                <DialogTitle>Ближайшие точки</DialogTitle>
                <DialogContent>
                    <Grid container spacing={2}>
                        {props.data && props.data.result.items.map((item:any) => (
                            <Grid item xs={12} sm={6} md={4} key={item.id}>
                                <Card variant="outlined">
                                    <CardContent>
                                        <Typography variant="h6" component="div">
                                            {item.name}
                                        </Typography>
                                        <Typography color="text.secondary">
                                            {item.address_name}
                                        </Typography>
                                        {item.address_comment && (
                                            <Typography color="text.secondary">
                                                {item.address_comment}
                                            </Typography>
                                        )}
                                        <Typography color="text.secondary">
                                            Координаты: {item.point.lat}, {item.point.lon}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.handleClose}>Закрыть</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default DataDialog;
