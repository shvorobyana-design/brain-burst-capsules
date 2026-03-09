import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getRandomCapsule } from "@/data/capsules";

const RandomPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const c = getRandomCapsule();
    navigate(`/capsule/${c.id}`, { replace: true });
  }, [navigate]);
  return null;
};

export default RandomPage;
