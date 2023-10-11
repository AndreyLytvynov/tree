import { FC, useState } from "react";

import CategoryNode from "../CategoryNode/CategoryNode";
import ZoomControls from "../ZoomControls/ZoomControls";
import Button from "../Button/Button";

import { Category } from "../../types";
import styles from "../../styles/main.module.css";

const TreeNode: FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  const addCategory = () => {
    const newCategory: Category = {
      name: "",
      children: [],
      id: Date.now(),
    };
    setCategories([...categories, newCategory]);
  };

  const addSubCategory = (parentNode: Category) => {
    const newSubCategory: Category = {
      name: "",
      children: [],
      id: Date.now(),
    };
    parentNode.children.push(newSubCategory);
    setCategories([...categories]);
  };

  const handleCategoryNameChange = (node: Category, newName: string) => {
    node.name = newName;
    setCategories([...categories]);
  };

  const deleteCategory = (node: Category) => {
    const deleteNodeById = (nodes: Category[], idToDelete: number) => {
      for (let i = 0; i < nodes.length; i++) {
        if (nodes[i].id === idToDelete) {
          nodes.splice(i, 1);
          return;
        }
        if (nodes[i].children.length > 0) {
          deleteNodeById(nodes[i].children, idToDelete);
        }
      }
    };

    deleteNodeById(categories, node.id);
    setCategories([...categories]);
  };

  const renderTree = (nodes: Category[], depth: number = 0) => {
    return (
      <ul
        className={`${styles.list} ${
          nodes.length === 1 ? styles.oneChild : ""
        } ${nodes.length === 0 ? styles.notChild : ""}`}
      >
        {nodes.map((node) => {
          return (
            <li key={node.id}>
              <CategoryNode
                color={`hsl(${depth * 40}, 70%, 70%)`}
                category={node}
                onCategoryNameChange={(newName) =>
                  handleCategoryNameChange(node, newName)
                }
                onAddSubCategory={() => addSubCategory(node)}
                onDeleteCategory={() => deleteCategory(node)}
              />
              {renderTree(node.children, depth + 1)}
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <ZoomControls>
      <div className={styles.tree}>
        <Button
          onClick={addCategory}
          label='Add categories'
          className={styles.rootBtn}
        >
          <img src='/plus.svg' alt='arrow button' width={8} height={8} />
        </Button>
        {renderTree(categories)}
      </div>
    </ZoomControls>
  );
};

export default TreeNode;
