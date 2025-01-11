import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Swal from "sweetalert2";
import Header from "./components/header";
import Footer from "./components/footer";
import Categoria from "./components/categoria";
import VideoCard from "./components/tarjetavideo";
import EditModal from "./components/editmodal";
import VideoPlayerModal from "./components/videoplayermodal";
import NuevoVideo from "./components/nuevovideo";
import NuevoCategoriaModal from "./components/nuevacategoria";

const App = () => {
  const [videos, setVideos] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [videoToEdit, setVideoToEdit] = useState(null);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [currentVideo, setCurrentVideo] = useState(null);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);

  useEffect(() => {
    fetchVideos();
    fetchCategories();
  }, []);

  const fetchVideos = async () => {
    try {
      const response = await fetch("http://localhost:5000/videos");
      const data = await response.json();
      setVideos(data);
    } catch (error) {
      console.error("Error al cargar los videos:", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch("http://localhost:5001/categorias");
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error("Error al cargar las categorías:", error);
    }
  };

  const handleEditCategory = async (categoryId, newName) => {
    try {
      const category = categories.find(cat => cat.id === categoryId);
      const updatedCategory = {
        ...category,
        nombre: newName,
        key: newName.toLowerCase().replace(/ /g, '-')
      };

      const response = await fetch(`http://localhost:5001/categorias/${categoryId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedCategory)
      });

      if (response.ok) {
        setCategories(prev => prev.map(cat => 
          cat.id === categoryId ? updatedCategory : cat
        ));
        Swal.fire("Éxito", "Categoría actualizada correctamente", "success");
      }
    } catch (error) {
      console.error("Error al actualizar la categoría:", error);
      Swal.fire("Error", "No se pudo actualizar la categoría", "error");
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    try {
      const response = await fetch(`http://localhost:5001/categorias/${categoryId}`, {
        method: "DELETE"
      });

      if (response.ok) {
        setCategories(prev => prev.filter(cat => cat.id !== categoryId));
        Swal.fire("Éxito", "Categoría eliminada correctamente", "success");
      }
    } catch (error) {
      console.error("Error al eliminar la categoría:", error);
      Swal.fire("Error", "No se pudo eliminar la categoría", "error");
    }
  };

  const handleVideoClick = (video) => {
    setCurrentVideo(video);
    setIsVideoModalOpen(true);
  };

  const handleNextVideo = () => {
    const currentIndex = videos.indexOf(currentVideo);
    const nextIndex = (currentIndex + 1) % videos.length;
    setCurrentVideo(videos[nextIndex]);
  };

  const handlePrevVideo = () => {
    const currentIndex = videos.indexOf(currentVideo);
    const prevIndex = (currentIndex - 1 + videos.length) % videos.length;
    setCurrentVideo(videos[prevIndex]);
  };

  const handleEditClick = (video) => {
    setVideoToEdit(video);
    setEditModalOpen(true);
  };

  const handleDeleteClick = (videoId) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "No podrás recuperar este video",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/videos/${videoId}`, {
          method: "DELETE",
        })
          .then(() => {
            setVideos((prevVideos) => prevVideos.filter((video) => video.id !== videoId));
            Swal.fire("Eliminado", "El video ha sido eliminado.", "success");
          })
          .catch((error) => {
            console.error("Error al eliminar el video:", error);
            Swal.fire("Error", "No se pudo eliminar el video.", "error");
          });
      }
    });
  };

  const handleSaveCategory = (newCategory) => {
    fetch("http://localhost:5001/categorias", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...newCategory, id: Date.now(), key: newCategory.nombre.toLowerCase() }),
    })
      .then((response) => response.json())
      .then((data) => {
        setCategories((prev) => [...prev, data]);
        setIsCategoryModalOpen(false); // Cierra el modal
        Swal.fire("Guardado", "La nueva categoría ha sido guardada con éxito.", "success");
      })
      .catch((error) => {
        console.error("Error al guardar la categoría:", error);
        Swal.fire("Error", "No se pudo guardar la nueva categoría.", "error");
      });
  };
  

  return (
    <Router>
      <Header onNewCategoryClick={() => setIsCategoryModalOpen(true)} />
      <Routes>
        <Route
          path="/"
          element={
            <div style={{ padding: "2rem" }}>
              {categories.map((category) => (
                <div key={category.id} style={{ marginBottom: "1rem" }}>
                  <div
                    onClick={() =>
                      setActiveCategory(category.key === activeCategory ? null : category.key)
                    }
                    style={{ cursor: "pointer" }}
                  >
                    <Categoria 
                      title={category.nombre} 
                      backgroundImage={category.imagen} 
                      onEdit={(newName) => handleEditCategory(category.id, newName)}
                      onDelete={() => handleDeleteCategory(category.id)}
                      />
                  </div>
                  {activeCategory === category.key && (
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "1rem",
                        padding: "1rem",
                        justifyContent: "space-evenly",
                      }}
                    >
                      {videos
                        .filter((video) => video.categoria === category.key)
                        .map((video) => (
                          <VideoCard
                            key={video.id}
                            title={video.titulo}
                            imageUrl={video.miniatura}
                            onClick={() => handleVideoClick(video)}
                            onEdit={() => handleEditClick(video)}
                            onDelete={() => handleDeleteClick(video.id)}
                          />
                        ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          }
        />
        <Route path="/nuevo-video" element={<NuevoVideo setVideos={setVideos} />} />
      </Routes>

      {currentVideo && (
        <VideoPlayerModal
          open={isVideoModalOpen}
          video={currentVideo}
          onClose={() => setIsVideoModalOpen(false)}
          onNext={handleNextVideo}
          onPrev={handlePrevVideo}
          category={
            categories.find((cat) => cat.key === currentVideo.categoria)?.nombre || ""
          }
        />
      )}

      {videoToEdit && (
        <EditModal
          open={editModalOpen}
          video={videoToEdit}
          onClose={() => setEditModalOpen(false)}
          onSave={(updatedVideo) => {
            setVideos((prevVideos) =>
              prevVideos.map((video) => (video.id === updatedVideo.id ? updatedVideo : video))
            );
            setEditModalOpen(false);
          }}
        />
      )}

      <NuevoCategoriaModal
        open={isCategoryModalOpen}
        onClose={() => setIsCategoryModalOpen(false)}
        onSave={handleSaveCategory}
      />
      <Footer />
    </Router>
  );
};

export default App;
