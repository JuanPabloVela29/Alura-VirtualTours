import React from "react";
import { IconButton, Card, CardMedia, CardContent, Typography } from "@mui/material";
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import styles from "./tarjetavideo.module.css";

const VideoCard = ({ title, imageUrl, onEdit, onDelete, onClick }) => {
  return (
    <Card className={styles.card} onClick={onClick} style={{ cursor: "pointer" }}>
      <CardMedia
        component="img"
        height="140"
        image={imageUrl}
        alt={title}
        className={styles.cardMedia}
      />
      <CardContent>
        <Typography variant="h6" className={styles.cardTitle}>
          {title}
        </Typography>
        <div
          className={styles.actionButtons}
          onClick={(e) => e.stopPropagation()} // Evita que los clics en los botones disparen el onClick del Card
        >
          <IconButton className={styles.iconButton} color="primary" onClick={onEdit}>
            <EditRoundedIcon />
          </IconButton>
          <IconButton className={styles.iconButton} color="secondary" onClick={onDelete}>
            <DeleteForeverIcon />
          </IconButton>
        </div>
      </CardContent>
    </Card>
  );
};

export default VideoCard;


