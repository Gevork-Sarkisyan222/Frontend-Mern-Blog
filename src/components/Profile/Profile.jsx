import React, { useEffect } from 'react';
import './profile.scss';
import Avatar from '@mui/material/Avatar';
import PostCard from './PostCard';
import { useSelector } from 'react-redux';
import { fetchPosts } from '../../redux/slices/post';
import { useDispatch } from 'react-redux';

function Profile() {
  const userData = useSelector((state) => state.auth.data);
  const { posts } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  console.log(userData);

  useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  console.log(posts);
  const isPostLoading = posts.status === 'loading';

  if (isPostLoading) {
    return <div>Загрузка...</div>;
  }

  return (
    <div className="Content">
      <div className="left-content">
        <Avatar
          sx={{ width: '200px', height: '200px' }}
          alt={userData.name}
          src={userData.avatarUrl === '' ? '/broken-image.jpg' : userData.avatarUrl}
        />
        <article className="text-content">
          <h1>
            Имя: <span>{userData.name}</span>
          </h1>
          <h2>
            Фамилия: <span>{userData.surname}</span>
          </h2>
          <h2>
            Эл почта: <span>{userData.email}</span>
          </h2>
        </article>
      </div>
      <div className="right-content">
        <div className="user-posts">
          <h1>Все статьи автора</h1>
          <div className="post-place">
            {isPostLoading ? (
              <div>loading</div>
            ) : (
              // posts.items.map((post, index) => <PostCard index={index} post={post} />)
              posts.items
                .filter((post) => post.user._id === userData._id)
                .map((post, index) => <PostCard index={index} post={post} />)
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
