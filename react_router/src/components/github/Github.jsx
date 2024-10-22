import React, { useState, useEffect } from "react";
import { useLoaderData } from "react-router-dom";

function Github() {
  const data = useLoaderData(); // Data from the loader
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // If data loading takes some time, display a loading state
  useEffect(() => {
    if (data) setLoading(false);
  }, [data]);

  if (loading) {
    return <div className="text-center text-white">Loading data...</div>;
  }

  if (error) {
    return (
      <div className="text-center text-red-500">
        Error fetching data: {error.message}
      </div>
    );
  }

  return (
    <div className="bg-gray-500 text-white text-3xl text-center py-5">
      <p>
        Github link:{" "}
        <a href={data.html_url} target="_blank" rel="noopener noreferrer">
          {data.html_url}
        </a>
      </p>
      <img src={data.avatar_url} width={300} alt={`${data.login}'s avatar`} />
      <p>Total repos: {data.public_repos}</p>
    </div>
  );
}

export default Github;

// Loader function to fetch GitHub data
export const githubInfoLoader = async () => {
  try {
    const response = await fetch("https://api.github.com/users/monu3");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
