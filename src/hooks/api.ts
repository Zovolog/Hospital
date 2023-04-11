import { useEffect } from "react";
import { useParams } from "react-router-dom";

export const getKey = () => {
  const { name, key } = useParams();
  return { name, key };
};
