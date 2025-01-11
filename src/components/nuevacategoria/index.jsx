import React, { useState } from "react";
import { Modal, Box, TextField, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const NuevoCategoriaModal = ({ open, onClose, onSave }) => {
  const [nombre, setNombre] = useState("");
  const [imagen, setImagen] = useState("");

  const handleClose = () => {
    if (onClose) onClose();
  };

  const handleSave = () => {
    if (!nombre || !imagen) {
      alert("Todos los campos son obligatorios");
      return;
    }
    if (onSave) onSave({ nombre, imagen });
    setNombre("");
    setImagen("");
    handleClose();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={modalStyle}>
        <div style={{ position: "relative" }}>
          <CloseIcon
            onClick={handleClose}
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              cursor: "pointer",
            }}
          />
        </div>
        <h2>Nueva Categoría</h2>
        <TextField
          fullWidth
          label="Nombre de Categoría"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          margin="normal"
        />
        <TextField
          fullWidth
          label="URL de Imagen"
          value={imagen}
          onChange={(e) => setImagen(e.target.value)}
          margin="normal"
        />
        <Box sx={{ display: "flex", justifyContent: "flex-end", marginTop: "1rem" }}>
          <Button onClick={handleClose} style={{ marginRight: "1rem" }}>
            Cancelar
          </Button>
          <Button variant="contained" onClick={handleSave}>
            Guardar
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: "8px",
  boxShadow: 24,
  p: 4,
};

export default NuevoCategoriaModal;
