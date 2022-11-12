import {useMemo} from "react";

export const usePosts = (posts, filter) => {
  const FilteredPosts = useMemo(() => {
    if (Array.isArray(posts) && posts.length !== 0) {
      return posts.filter(({title}) => title.toLowerCase().includes(filter.toLowerCase()));
    }
    return [];
    
  }, [posts, filter]);
  
  return FilteredPosts;
}