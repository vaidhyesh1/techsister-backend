"use client";
import React, { useEffect, useState } from 'react';
import Scholarship from './scholarship';
import ScholarshipTile from './scholarshipTile';
import axios from 'axios';
import loading from '../../app/loading';
import { useSession } from "next-auth/react";

interface ScholarshipListProps {
  apiEndpoint: string;
}

const ITEMS_PER_PAGE = 10;

const ScholarshipList: React.FC<ScholarshipListProps> = ({ apiEndpoint }) => {
  const [scholarships, setScholarships] = useState<Scholarship[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isLoading, setLoading] = useState(true);
  const { data: session, status } = useSession();

  
  useEffect(() => {
    if (!isLoading && !session) {
          window.location.href = '/';
          return; 
    }
  }, [session, isLoading]);

  useEffect(() => {
    const fetchScholarships = async () => {
      try {
        const response = await axios.get(apiEndpoint);
        const data = response.data;
        if(data.scholarships)
          setScholarships(data.scholarships[0].scholarships);
        else{
          setScholarships([]);
        }
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchScholarships();
  },[apiEndpoint]);

  const filteredScholarships = scholarships.filter((scholarship) => {
    const containsSearchQuery = scholarship.name.toLowerCase().includes(searchQuery.toLowerCase());
    const hasSelectedTags =
      selectedTags.length === 0 || selectedTags.some((tag) => scholarship.tags.includes(tag));
    return containsSearchQuery && hasSelectedTags;
  });

  const totalItems = filteredScholarships.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedScholarships = filteredScholarships.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
  };

  const handleTagSelection = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
    setCurrentPage(1);
  };

  return (
    <div>
      {isLoading ? (
        loading() 
      ) : (
      <div>
        <style jsx>{`
          .page-button {
            display: inline-block;
            margin-right: 8px;
            margin-bottom: 5px;
            padding: 8px 12px;
            border: 1px solid #ccc;
            border-radius: 4px;
            background-color: #fff;
            cursor: pointer;
          }
          
          .page-button.active {
            background-color: #f0f0f0;
          }

          .tag-button {
            display: inline-block;
            margin-right: 8px;
            padding: 8px 12px;
            border: 1px solid #ccc;
            border-radius: 4px;
            background-color: #fff;
            cursor: pointer;
          }
          
          .tag-button.active {
            background-color: #f0f0f0;
          }

          .inputStyle {
            width: 400px;
            padding: 8px;
            border: 1px solid #ccc;
            borderRadius: 4px;
            boxSizing: border-box;
            fontFamily: inherit;
            fontSize: inherit;
          }
                
        `}</style>
        <div style={{marginLeft: '5px',marginTop: '5px'}}>
          <div style={{marginBottom: '10px'}}>
          <span style={{marginRight:'5px'}}>
              Search:
              </span>
          <input type="text" value={searchQuery} className='inputStyle' onChange={handleSearchChange} placeholder="Search for scholarships..." />
          </div>
          <div>
            <div style={{marginBottom:'10px'}}>
              <span style={{marginRight:'5px'}}>
              Apply Filters:
              </span>
            {scholarships.length > 0 &&
              Array.from(new Set(scholarships.flatMap((scholarship) => scholarship.tags))).map((tag) => (
                <button
                  key={tag}
                  className={selectedTags.includes(tag) ? 'tag-button active' : 'tag-button'}
                  onClick={() => handleTagSelection(tag)}
                >
                  {tag.replaceAll('_',' ')}
                </button>
              ))}
          </div>
          </div>
        </div>
        <div>
          {paginatedScholarships.map((scholarship, index) => (
            <ScholarshipTile key={index} scholarship={scholarship} />
          ))}
        </div>
        <div>
          <div className="pagination">
            {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
              <button
                key={page}
                className={currentPage === page ? 'page-button active' : 'page-button'}
                onClick={() => handlePageChange(page)}
              >
                {page}
              </button>
            ))}
          </div>
        </div>
      </div>
      )}
    </div>
  );
};

export default ScholarshipList;
