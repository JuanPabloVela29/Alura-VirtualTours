import React, { useState } from "react";
import { Modal, Box, TextField, Button, MenuItem } from "@mui/material";

const EditModal = ({ open, video, onClose, onSubmit }) => {
  const [formData, setFormData] = useState(video);

  const categories = [
    { key: "invierno", label: "Invierno" },
    { key: "verano", label: "Verano" },
    { key: "lluvioso", label: "Lluvioso" },
    { key: "navidad", label: "Navidad" },
    { key: "lugares-increibles", label: "Lugares Increíbles" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    onSubmit(formData);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <h2 style={{ textAlign: "center" }}>Editar Video</h2>
        <TextField
          fullWidth
          label="Título"
          name="titulo"
          value={formData.titulo}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Miniatura"
          name="miniatura"
          value={formData.miniatura}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Link"
          name="link"
          value={formData.link}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          select
          label="Categoría"
          name="categoria"
          value={formData.categoria}
          onChange={handleChange}
          margin="normal"
        >
          {categories.map((category) => (
            <MenuItem key={category.key} value={category.key}>
              {category.label}
            </MenuItem>
          ))}
        </TextField>
        <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: 2 }}>
          <Button variant="outlined" onClick={onClose}>
            Cancelar
          </Button>
          <Button variant="contained" onClick={handleSubmit}>
            Guardar
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default EditModal;
