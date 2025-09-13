import React, { useEffect, useRef } from "react";
import "../Styles/ConfirmDialog.css";

const ConfirmDialog = ({ message, onConfirm, onCancel }) => {
    const dialogRef=useRef(null);
    useEffect(()=>{
        const handleOutSideClick=(e)=>{
            if(!dialogRef.current.contains(e.target))
                onCancel();
        }
        const handleEscapeClick=(e)=>
        {
            if(e.key==="Escape")
                onCancel();
        }
        document.addEventListener('mousedown',handleOutSideClick)
        window.addEventListener('keydown',handleEscapeClick)
        return ()=>{
            document.removeEventListener('mousedown',handleOutSideClick)
            window.removeEventListener('keydown',handleEscapeClick)
        }
    },[onCancel]);
  return (
    <div className="confirm-overlay">
      <div ref={dialogRef} className="confirm-box">
        <p>{message}</p>
        <div className="confirm-actions">
          <button className="btn confirm" onClick={onConfirm}>
            Yes
          </button>
          <button className="btn cancel" onClick={onCancel}>
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
