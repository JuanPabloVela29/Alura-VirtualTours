import React from "react";
import Modal from "@mui/material/Modal";
import { Box, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import styles from "./videoplayermodal.module.css";

const VideoPlayerModal = ({ open, video, onClose, onNext, onPrev, category }) => {
  if (!video) return null; // Evitar errores si no hay video cargado

  // Convertir el enlace estándar al formato de embed
  const embedUrl = video.link.replace("watch?v=", "embed/");

  return (
    <Modal open={open} onClose={onClose}>
      <Box className={styles.modalContainer}>
        {/* Header del Modal */}
        <div className={styles.modalHeader}>
          <Typography variant="h6" className={styles.categoryLabel}>
            {category}
          </Typography>
          <IconButton onClick={onClose} className={styles.closeButton}>
            <CloseIcon />
          </IconButton>
        </div>

        {/* Video */}
        <div className={styles.videoContainer}>
          <iframe
            src={embedUrl}
            title={video.titulo}
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
            className={styles.videoFrame}
          />
        </div>

        {/* Controles de navegación */}
        <div className={styles.navigationButtons}>
          <IconButton onClick={onPrev}>
            <ArrowBackIosIcon />
          </IconButton>
          <IconButton onClick={onNext}>
            <ArrowForwardIosIcon />
          </IconButton>
        </div>
      </Box>
    </Modal>
  );
};

export default VideoPlayerModal;
