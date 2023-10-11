import { useState, useRef, RefObject } from "react";

import Button from "../Button/Button";

import { Category } from "../../types";
import styles from "../../styles/main.module.css";

type CategoryNodeProps = {
  color: string;
  category: Category;
  onCategoryNameChange: (newName: string) => void;
  onAddSubCategory: () => void;
  onDeleteCategory: () => void;
};

const CategoryNode: React.FC<CategoryNodeProps> = ({
  category,
  onCategoryNameChange,
  onAddSubCategory,
  onDeleteCategory,
  color,
}) => {
  const [onFocusChange, setFocusChange] = useState(true);
  const [name, setName] = useState("");
  const inputRef: RefObject<HTMLInputElement> = useRef(null);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    onCategoryNameChange(name);

    setFocusChange(false);
  };

  const handleEditClick = () => {
    setFocusChange(true);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div className={styles.itemBox}>
      <form onSubmit={handleSubmit} className={styles.form}>
        {!onFocusChange ? (
          <span
            style={{ backgroundColor: `${color}` }}
            className={styles.categoryName}
          >
            {category.name}
          </span>
        ) : (
          <input
            placeholder='Category name'
            autoFocus
            className={styles.input}
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
            onFocus={() => {
              setFocusChange(true);
            }}
            onBlur={() => {
              if (name === "") {
                onDeleteCategory();
              }
            }}
          />
        )}
        {!onFocusChange ? (
          <div className={styles.boxBtn}>
            <Button
              className={styles.formBtn}
              type='button'
              onClick={(e) => {
                onAddSubCategory();
              }}
            >
              <img src='/plus.svg' alt='add category' width={6} height={6} />
            </Button>
            <Button onClick={handleEditClick} className={styles.formBtn}>
              <img src='/pencil.svg' alt='edit category' width={6} height={6} />
            </Button>
            <Button onClick={onDeleteCategory} className={styles.formBtn}>
              <img
                src='/cross.svg'
                alt='delete category'
                width={6}
                height={6}
              />
            </Button>
          </div>
        ) : (
          <div className={`${styles.boxBtn} ${styles.boxSubmitBtn}`}>
            <Button type='submit' className={styles.formBtn}>
              <img
                src='/checkmark.svg'
                alt='add category'
                width={8}
                height={8}
              />
            </Button>

            <Button onClick={onDeleteCategory} className={styles.formBtn}>
              <img
                src='/cross.svg'
                alt='delete category'
                width={6}
                height={6}
              />
            </Button>
          </div>
        )}
      </form>
    </div>
  );
};

export default CategoryNode;
