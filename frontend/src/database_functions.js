import axios from "axios";

const backend = axios.create({
  baseURL: "http://localhost:8080"
});

export const registerUser = async (userData, setLoading, setError) => {
    setError("");
    setLoading(true);
  
    try {
      const response = await backend.post("/register", userData);
  
      setLoading(false);
      if (response.data[0] === false) {
        setError(response.data[1]);
        return false;
      }
  
      return true;
    } catch (error) {
      console.error("Error occurred:", error);
      setError("Registration failed");
      setLoading(false);
      return false;
    }
  };