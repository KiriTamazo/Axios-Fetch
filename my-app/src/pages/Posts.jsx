import instance from "../axios/axios";
import React, { useEffect, useState } from "react";
import useAxios from "../axios/useAxios";
import axios from "axios";
import useAxiosFunction from "../axios/useAxiosFunction";

const Posts = () => {
  const [movie, setMovie] = useState([]);
  const [value, setValue] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const Instance = axios.create({
    baseURL: "http://localhost:8080/",
  });

  // const {
  //   data,
  //   isLoading: loading,
  //   error,
  // } = useAxios({
  //   axiosInstance: Instance,
  //   method: "Get",
  //   url: "/",
  // });

  const { data, error, fetchData } = useAxiosFunction();
  const getData = () => {
    fetchData({
      axiosInstance: Instance,
      method: "get",
      url: "/posts",
    });
  };
  useEffect(() => {
    getData();
    console.log("A");
  }, []);

  const handleSubmit2 = async () => {
    console.log(data[data.length - 1].id, error);
    const sentPost = {
      // id: data[data.length - 1].id + 1,
      title: value,
    };
    fetchData({
      axiosInstance: Instance,
      method: "Post",
      url: "/posts",
      requestConfig: {
        ...sentPost,
      },
    });
    setMovie([...movie, sentPost]);
    setValue("");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await instance.get("/posts");
        setMovie(response.data);
      } catch (error) {
        console.log(`Error:${error.message}`);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [isLoading]);

  const handleChange = (e) => {
    setValue(e.target.value);
  };
  const handleSubmit = async () => {
    try {
      const response = await instance.post("/posts", {
        id: movie[movie.length - 1]?.id + 1,
        title: value,
      });

      setMovie([...movie, response.data]);
      setValue("");
      setIsLoading(true);
    } catch (error) {
      console.log("Submit Error", error);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    console.log(id);
    try {
      await instance.delete(`/posts/${id}`);
      const movieList = movie.filter((item) => item.id !== id);
      setMovie(movieList);
      setIsLoading(true);
    } catch (error) {
      console.log("Submit Error");
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {isLoading ? (
        <div>Loading</div>
      ) : (
        movie &&
        movie.map((item) => (
          <div
            key={item.id}
            style={{ display: "flex", alignContent: "center" }}
          >
            <h2>{item.title}</h2>
            <button onClick={() => handleDelete(item.id)}>Delete</button>
          </div>
        ))
      )}

      <div>
        <input type="text" value={value} onChange={handleChange} />
        <button onClick={handleSubmit}>Submit</button>
        <button onClick={handleSubmit2}>Submit 2</button>
      </div>
    </div>
  );
};

export default Posts;
