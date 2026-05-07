import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getRandomCapsule } from "@/data/capsules";
import { useProgress } from "@/hooks/useProgress";

const RandomPage = () => {
  const navigate = useNavigate();
  const { trackRandom } = useProgress();
  useEffect(() => {
    trackRandom();
    const c = getRandomCapsule();
    navigate(`/capsule/${c.id}`, { replace: true });
  }, [navigate, trackRandom]);
  return null;
};

export default RandomPage;
