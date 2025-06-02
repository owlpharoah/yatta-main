import { json } from "express";

const apiKey = 'AIzaSyCZjm8mZ0Xrmln69pr7RE4AdfLybn0H2-M'; // Replace with your actual API key
export async function getVideoDetails(videoId) {
  const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${apiKey}`;
  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.items && data.items.length > 0) {
      const snippet = data.items[0].snippet;
      return {title: snippet.title , desc: snippet.description}
    } else {
      return;
    }
  } catch (error) {
    return error;
  }
}

// Call the function