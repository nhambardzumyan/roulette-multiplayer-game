import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { Snackbar } from "@mui/material";

import HomePage from "./pages/HomePage";
import PlayPage from "./pages/PlayPage";
import {
  errorsSelector,
  removeErrorAction,
} from "./redux/actions/commonActions";
import { AppDispatch } from "./redux/store";

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const errors = useSelector(errorsSelector);
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    if (errors?.length) {
      setOpen(true);
    }
    // console.log('errors:', errors);
  }, [errors?.length]);

  const handleClose = (): void => {
    setOpen(false);
    dispatch(removeErrorAction());
  };

  return (
    <div className="outer-content-wrapper">
      <div className="inner-content-wrapper">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/game/:matchID/:playerID" element={<PlayPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
        <Snackbar
          open={open}
          autoHideDuration={5000}
          onClose={handleClose}
          message={errors[0]}
        />
      </div>
    </div>
  );
}

export default App;
