import React from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import CircularProgress from '@material-ui/core/CircularProgress';
import Fade from '@material-ui/core/Fade';
import './Progress.css';

function SimpleDialog(props) {

  return (
    <Dialog
        id="idDialogProgress"
        className="contentProgress"
        aria-labelledby="simple-dialog-title" 
        open={props.open}>
        <DialogTitle className="contentProgress">          
            <Fade
            in={true}
            style={{
                transitionDelay: true ? '800ms' : '0ms',
            }}
            unmountOnExit
            >
              
            <CircularProgress />
            </Fade>
            
        </DialogTitle>      
    </Dialog>
  );
}
export default function ProgressIntoDialog(props) {
  return (    
      <SimpleDialog
        open={props.open}
        className="contentProgress"
      /> 
  );
}
