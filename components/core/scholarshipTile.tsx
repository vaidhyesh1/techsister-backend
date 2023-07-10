import React from 'react';
import Scholarship from './scholarship';

interface ScholarshipTileProps {
  scholarship: Scholarship;
}

const ScholarshipTile: React.FC<ScholarshipTileProps> = ({ scholarship }) => {
  return (
    <div className="scholarship-tile">
       <style jsx>{`
          .scholarship-tile {
            background-color: #f0f0f0;
            padding: 16px;
            border-radius: 4px;
            margin-bottom: 16px;
          }
      `}</style>

      <h3>{scholarship.name}</h3>
      <p><strong>Amount: </strong>{scholarship.amount}</p>
      <p><strong>Deadline: </strong> {scholarship.deadline}</p>
      <p><strong>Link to apply: </strong>{scholarship.link}</p>
      <p><strong>Study Level: </strong>{scholarship.study_level}</p>
      <p><strong>Subject: </strong>{scholarship.subject}</p>
      <p><strong>Description: </strong>{scholarship.description}</p>
    </div>
  );
};

export default ScholarshipTile;

