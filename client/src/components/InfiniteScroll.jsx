/* eslint-disable react/prop-types */
import { useEffect } from 'react';

const InfiniteScroll = ({ loadMore }) => {
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        loadMore();
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loadMore]);

  return null;
};

export default InfiniteScroll;
