import React, { useState, useEffect } from "react";
import Categoria from "../categoria";
import styles from "./categorias.module.css";
import Swal from "sweetalert2";

const Categorias = () => {
  const [videos, setVideos] = useState([]); // Almacena todos los videos
  const [categorias, setCategorias] = useState([]); // Categorías dinámicas
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null); // Categoría seleccionada
  const [videosFiltrados, setVideosFiltrados] = useState([]); // Videos según categoría

  // Cargar videos desde el backend
  useEffect(() => {
    fetch("http://localhost:5000/videos")
      .then((response) => response.json())
      .then((data) => setVideos(data))
      .catch((error) => console.error("Error al cargar videos:", error));
  }, []);

  // Cargar categorías desde el backend
  useEffect(() => {
    fetch("http://localhost:5001/categorias")
      .then((response) => response.json())
      .then((data) => setCategorias(data))
      .catch((error) => console.error("Error al cargar categorías:", error));
  }, []);

  // Manejar clic en una categoría
  const manejarCategoriaClick = (categoria) => {
    if (categoriaSeleccionada === categoria) {
      setCategoriaSeleccionada(null);
      setVideosFiltrados([]);
    } else {
      setCategoriaSeleccionada(categoria);
      const filtrados = videos.filter((video) => video.categoria === categoria);
      setVideosFiltrados(filtrados);
    }
  };

  const handleEditCategory = (id, newName) => {
    fetch(`http://localhost:5001/categorias/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre: newName }),
    })
      .then(() => {
        setCategorias((prev) =>
          prev.map((cat) => (cat.id === id ? { ...cat, nombre: newName } : cat))
        );
        Swal.fire("Editado", "La categoría ha sido actualizada.", "success");
      })
      .catch((error) => console.error("Error al editar categoría:", error));
  };

  const handleDeleteCategory = (id) => {
    fetch(`http://localhost:5001/categorias/${id}`, { method: "DELETE" })
      .then(() => {
        setCategorias((prev) => prev.filter((cat) => cat.id !== id));
        Swal.fire("Eliminado", "La categoría ha sido eliminada.", "success");
      })
      .catch((error) => console.error("Error al eliminar categoría:", error));
  };

  return (
    <div>
      <h1>Categorías</h1>
      <div className={styles.categoriesContainer}>
        {categorias.map((cat) => (
          <Categoria
            key={cat.id}
            title={cat.nombre}
            backgroundImage={cat.imagen}
            onEdit={(newName) => handleEditCategory(cat.id, newName)}
            onDelete={() => handleDeleteCategory(cat.id)}
          />
        ))}
      </div>

      {/* Mostrar videos debajo de la categoría seleccionada */}
      {categoriaSeleccionada && (
        <div className={styles.videosContainer}>
          <h2>Videos de {categoriaSeleccionada}</h2>
          <div className={styles.videosGrid}>
            {videosFiltrados.map((video) => (
              <div key={video.id} className={styles.videoCard}>
                <img src={video.miniatura} alt={video.titulo} />
                <h3>{video.titulo}</h3>
                <a href={video.link} target="_blank" rel="noopener noreferrer">
                  Ver Video
                </a>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Categorias;
