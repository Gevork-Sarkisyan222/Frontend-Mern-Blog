import React, { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';

import { Post } from '../components/Post';
import { TagsBlock } from '../components/TagsBlock';
import { CommentsBlock } from '../components/CommentsBlock';
import axios from '../axios';
import { fetchPosts, fetchTags } from '../redux/slices/post';
import { useSelector, useDispatch } from 'react-redux';

export const Home = () => {
  const dispatch = useDispatch();
  const { posts, tags } = useSelector((state) => state.posts);
  const { comments } = useSelector((state) => state.posts);
  // post.items && tags.items получать getting
  const [popularPosts, setPopularPosts] = useState([]);
  const [popular, setPopular] = useState(false);

  const isPostLoading = posts.status === 'loading';
  const isTagsLoading = tags.status === 'loading';

  React.useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchTags());
  }, []);

  const userData = useSelector((state) => state.auth.data);

  const onSortPopular = () => {
    const filterPost = posts.items.filter((posts) => posts.viewsCount > 10);
    setPopularPosts(filterPost);
    setPopular(true);
  };

  return (
    <>
      <Tabs style={{ marginBottom: 15 }} value={popular ? 1 : 0} aria-label="basic tabs example">
        <Tab label="Новые" onClick={() => setPopular(false)} />
        <Tab label="Популярные" onClick={onSortPopular} />
      </Tabs>
      <Grid container spacing={4}>
        <Grid xs={8} item>
          {(isPostLoading ? [...Array(5)] : popular ? popularPosts : posts.items).map(
            (obj, index) =>
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
        </Grid>
        <Grid xs={4} item>
          <TagsBlock items={tags.items} isLoading={isTagsLoading} />
          <CommentsBlock
            items={[
              {
                user: {
                  fullName: 'Вася Пупкин',
                  avatarUrl: 'https://mui.com/static/images/avatar/1.jpg',
                },
                text: 'Это тестовый комментарий',
              },
              {
                user: {
                  fullName: 'Иван Иванов',
                  avatarUrl: 'https://mui.com/static/images/avatar/2.jpg',
                },
                text: 'When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top',
              },
            ]}
            isLoading={false}
          />
        </Grid>
      </Grid>
    </>
  );
};
