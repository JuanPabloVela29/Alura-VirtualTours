// components/category/index.jsx
import React from "react";
import { Edit, Delete } from "@mui/icons-material";
import Swal from "sweetalert2";
import styles from "./categoria.module.css";

const Categoria = ({ title, backgroundImage, onEdit, onDelete }) => {
  const handleDelete = () => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Esto eliminará la categoría y no podrá deshacerse.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        onDelete();
        Swal.fire("Eliminado", "La categoría ha sido eliminada.", "success");
      }
    });
  };

  const handleEdit = () => {
    Swal.fire({
      title: "Editar categoría",
      input: "text",
      inputValue: title,
      showCancelButton: true,
      confirmButtonText: "Guardar",
      cancelButtonText: "Cancelar",
      preConfirm: (newName) => {
        if (!newName.trim()) {
          Swal.showValidationMessage("El nombre no puede estar vacío");
          return false;
        }
        return newName; // Devolvemos el nuevo nombre
      },
    }).then((result) => {
      if (result.isConfirmed) {
        onEdit(result.value); // Pasamos el nuevo nombre
      }
    });
  }; 
   
  return (
    <div
      className={styles.categoryContainer}
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className={styles.categoryIcons}>
        <Edit
          style={{ color: "rgba(255, 255, 255, 0.8)", cursor: "pointer" }}
          onClick={handleEdit}
        />
        <Delete
          style={{ color: "rgba(255, 255, 255, 0.8)", cursor: "pointer" }}
          onClick={handleDelete}
        />
      </div>
      <h2 className={styles.categoryTitle}>{title}</h2>
    </div>
  );
};

export default Categoria;
