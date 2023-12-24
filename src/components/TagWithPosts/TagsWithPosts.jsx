import React, { useState, useEffect } from 'react';
import './tags&posts.scss';
import { Post } from '../Post';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPosts, fetchTags } from '../../redux/slices/post';
import { useParams } from 'react-router-dom';

function TagsWithPost() {
  const dispatch = useDispatch();
  const { posts, tags } = useSelector((state) => state.posts);
  const { comments } = useSelector((state) => state.posts);
  console.log(comments)
  // post.items && tags.items получать getting
  const isPostLoading = posts.status === 'loading';
  const isTagsLoading = tags.status === 'loading';
  const [fits, setFits] = useState(false);
  const [fitTagPosts, setFitTagPosts] = useState([]);

  useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchTags());
  }, []);

  const userData = useSelector((state) => state.auth.data);
  const { name } = useParams();

  // proverka

  useEffect(() => {
    const filterByTag = posts.items.filter((post) => post.tags.includes(name));
    setFitTagPosts(filterByTag);
    setFits(true);
  });

  return (
    <div className="main">
      <div className="container">
        <h1 style={{ color: 'grey' }}>#{name}</h1>
        {(isPostLoading ? [...Array(5)] : fits ? fitTagPosts : posts.items).map((obj, index) =>
          isPostLoading ? (
            <Post key={index} isLoading={true} />
          ) : (
            <Post
              id={obj._id}
              title={obj.title}
              imageUrl={`http://localhost:4444${obj.imageUrl}`}
              user={obj.user}
              nameAndSurname={obj.user.name + ' ' + obj.user.surname}
              createdAt={obj.createdAt}
              viewsCount={obj.viewsCount}
              commentsCount={comments.text.length}
              tags={obj.tags}
              isEditable={userData?._id === obj.user._id}
            />
          ),
        )}
      </div>
    </div>
  );
}

export default TagsWithPost;
