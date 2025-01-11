import React, { useState, useEffect } from "react";
import { Box, TextField, MenuItem, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const NuevoVideo = ({ setVideos }) => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    titulo: "",
    miniatura: "",
    embedUrl: "",
    categoria: "",
  });
  const [errors, setErrors] = useState({});

  // Cargar categorías desde el backend
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:5001/categorias");
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error al cargar las categorías:", error);
        Swal.fire("Error", "No se pudieron cargar las categorías.", "error");
      }
    };

    fetchCategories();
  }, []);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.titulo.trim()) {
      newErrors.titulo = "El título es obligatorio.";
    }
    if (!formData.miniatura.trim() || !/^https?:\/\/.+/.test(formData.miniatura)) {
      newErrors.miniatura = "Debe ser una URL válida de la miniatura.";
    }
    if (!formData.embedUrl.trim() || !formData.embedUrl.includes("embed")) {
      newErrors.embedUrl = "La URL debe ser válida y contener 'embed'.";
    }
    if (!formData.categoria) {
      newErrors.categoria = "Debe seleccionar una categoría.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const newVideo = {
          id: Date.now(),
          titulo: formData.titulo,
          miniatura: formData.miniatura,
          link: formData.embedUrl,
          categoria: formData.categoria,
        };

        const response = await fetch("http://localhost:5000/videos", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newVideo),
        });

        if (response.ok) {
          const savedVideo = await response.json();
          setVideos(prevVideos => [...prevVideos, savedVideo]); // Añadir esta línea
          Swal.fire("¡Éxito!", "El video ha sido añadido.", "success");
          navigate("/");
        } else {
          throw new Error("Error al guardar el video.");
        }
      } catch (error) {
        console.error("Error:", error);
        Swal.fire("Error", "No se pudo añadir el video. Intente de nuevo.", "error");
      }
    }
  };

  return (
    <Box
      sx={{
        maxWidth: "100%",
        margin: "2rem auto",
        padding: "1.5rem",
        border: "1px solid #ddd",
        borderRadius: "8px",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
        width: { xs: "90%", sm: "80%", md: "60%", lg: "50%" },
      }}
    >
      <Typography variant="h5" gutterBottom>
        Añadir Nuevo Video
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Título del Video"
          name="titulo"
          value={formData.titulo}
          onChange={handleInputChange}
          error={!!errors.titulo}
          helperText={errors.titulo}
          fullWidth
          margin="normal"
        />
        <TextField
          label="URL de Miniatura"
          name="miniatura"
          value={formData.miniatura}
          onChange={handleInputChange}
          error={!!errors.miniatura}
          helperText={errors.miniatura}
          fullWidth
          margin="normal"
        />
        <TextField
          label="URL Embebida de YouTube"
          name="embedUrl"
          value={formData.embedUrl}
          onChange={handleInputChange}
          error={!!errors.embedUrl}
          helperText={errors.embedUrl}
          fullWidth
          margin="normal"
        />
        <TextField
          select
          label="Categoría"
          name="categoria"
          value={formData.categoria}
          onChange={handleInputChange}
          error={!!errors.categoria}
          helperText={errors.categoria}
          fullWidth
          margin="normal"
        >
          {categories.map((category) => (
            <MenuItem key={category.id} value={category.key}>
              {category.nombre}
            </MenuItem>
          ))}
        </TextField>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            gap: "1rem",
            marginTop: "1.5rem",
          }}
        >
          <Button variant="outlined" onClick={() => navigate("/")}>
            Cancelar
          </Button>
          <Button type="submit" variant="contained" color="primary">
            Guardar
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default NuevoVideo;
