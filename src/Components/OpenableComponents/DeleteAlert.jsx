import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { LanguageContext } from '../../Pages/Pages';

export default function DeleteAlert({ open, handleClose}) {

    const language = React.useContext(LanguageContext)

    return (
        <div>
            <Dialog
                open={open}
                onClose={() => { handleClose(false) }}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {language.deleteAlert.deleteTheUser}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {language.deleteAlert.text}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => { handleClose(false) }}>{language.deleteAlert.cancel}</Button>
                    <Button onClick={() => { handleClose(true) }} autoFocus>{language.deleteAlert.yes}</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}