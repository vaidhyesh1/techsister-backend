import React from 'react';

const NotAssigned = () => {
    const containerStyle: React.CSSProperties = {
        textAlign: 'center',
        marginTop: '20px',
        fontSize: '24px',
        fontWeight: 'bold',
      };
    
    return (<h1 style={containerStyle}>Mentor/Mentee not yet assigned. Please try later!</h1>);
};

export default NotAssigned;
