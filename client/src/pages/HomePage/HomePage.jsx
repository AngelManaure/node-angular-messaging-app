import { useEffect } from "react";
import { useAuth } from "../../context/AuthContext"
import { useNavigate } from "react-router-dom";

function HomePage() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/inbox")
    }
  }, [isAuthenticated])

  return (
    <div>HomePage</div>
  )
}

export default HomePage