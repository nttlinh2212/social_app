import { Snackbar } from '@mui/material';
import React from 'react';

function SnackbarCustom({open,setOpen,message}) {
    return (
        <Snackbar
            open={open}
            autoHideDuration={2000}
            message={message}
            onClose={()=>setOpen(false)}
        />
    );
}

export default SnackbarCustom;