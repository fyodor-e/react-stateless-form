import Prism from "prismjs";
import { useEffect } from "react";

const PrismStarter = () => {
  useEffect(() => {
    Prism.highlightAll();
  }, []);

  return null;
};

export default PrismStarter;
