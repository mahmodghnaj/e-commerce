import { FC } from "react";
import { HeaderProps } from "../type";

const Header: FC<HeaderProps> = ({ columns, actions }) => {
  return (
    <>
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column.name}>{column.label}</th>
          ))}
          {actions && actions.length > 0 && (
            <th className="text-center">Actions</th>
          )}
        </tr>
      </thead>
    </>
  );
};

export default Header;
