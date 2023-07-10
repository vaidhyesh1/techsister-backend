// pages/SuccessStories.tsx
"use client";
import { useEffect, useState } from 'react';
import Story from './Story';
import axios from 'axios';
import loading from '../../app/loading';
import { useSession } from "next-auth/react";
import styles from './SuccessStories.module.css';
import {Button} from '../ui/button';

interface SuccessStoryListProps {
    apiEndpoint: string;
  }

const SuccessStories: React.FC<SuccessStoryListProps> = ({ apiEndpoint }) => {

  const [successStories, setSuccessStories] = useState<Story[]>([]);
  const { data: session, status } = useSession();
  const [isLoading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  
  useEffect(() => {
    if (!isLoading && !session) {
          window.location.href = '/';
          return; 
    }
  }, [session, isLoading]);


  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await axios.get(apiEndpoint);
        const data = response.data;
        if(data.success_stories)
            setSuccessStories(data.success_stories[0].success_stories);
        else{
            setSuccessStories([]);
        }
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchStories();
  },[apiEndpoint]);

 
  const totalPages = Math.ceil(successStories.length / itemsPerPage);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const currentSuccessStories = successStories.slice(startIndex, endIndex);

  function updateAutoplay(url:string) {
    const urlObj = new URL(url);
    const searchParams = new URLSearchParams(urlObj.search);
    searchParams.set('autoplay', '0');
    urlObj.search = searchParams.toString();
    const modifiedUrl = urlObj.toString();
    return modifiedUrl;
  }

  return (
    <div>
    {isLoading ? (
        loading() 
      ) : (
        <div className={styles.container}>
        <h1 className={styles.heading}>Breaking the glass ceiling &#128526;</h1>
        <div className={styles.successStories}>
          {currentSuccessStories.map((story) => (
            <div key={story.title} className={styles.story}>
              <h3 className={styles.title}>{story.title}</h3>
              <iframe className={styles.video} width="560" height="315" src={updateAutoplay(story.videoLink)} title={story.title} frameBorder="0" allowFullScreen></iframe>
            </div>
          ))}
        </div>
        <div className={styles.pagination}>
          <Button onClick={handlePreviousPage} disabled={currentPage === 1} className={styles.button}>Previous</Button>
          <span className={styles.pageCount}>{currentPage} of {totalPages}</span>
          <Button onClick={handleNextPage} disabled={currentPage === totalPages} className={styles.button}>Next</Button>
        </div>
      </div>
      )}
    </div>
  );
};

export default SuccessStories;
