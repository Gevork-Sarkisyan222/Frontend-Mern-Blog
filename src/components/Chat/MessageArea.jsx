import React from 'react';
import './chat.scss';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import { useDispatch } from 'react-redux';
import { fetchDeleteMessages, fetchMessages, fetchEditMessages } from '../../redux/slices/chat';

function MessageArea({ obj, isEditable }) {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = React.useState(false);
  const [editedMessage, setEditedMessage] = React.useState(obj.message);
  const id = obj._id;

  const handleDeleteMessage = () => {
    const message = window.confirm('Вы действительно хотите удалить ваше сообщение?');
    if (message) {
      dispatch(fetchDeleteMessages(id))
        .then(() => {
          dispatch(fetchMessages());
        })
        .catch((e) => {
          console.warn(e);
          alert('Произошла ошибка при удалении сообщения !!!');
        });
    }
  };

  const handleEditComment = () => {
    if (isEditing) {
      dispatch(fetchEditMessages({ id, message: editedMessage }))
        .then(() => {
          dispatch(fetchMessages());
          setIsEditing(false);
          window.location.reload();
        })
        .catch((e) => {
          console.warn(e);
          alert('Произошла ошибка при редактировании сообщения !!!');
        });
    } else {
      setIsEditing(true);
    }
  };

  return (
    <div className="chat-container">
      <Avatar sx={{ bgcolor: 'grey' }} alt={obj.user.name} src={obj.user.avatarUrl} />
      <div className="border-for-text">
        <h4 className="name-chat">{obj.user.name + ' ' + obj.user.surname}</h4>
        {isEditing ? (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <input
              style={{
                border: 'none',
                border: '2px solid grey',
                padding: '10px',
                marginTop: '-10px',
                borderRadius: '7px',
                marginLeft: '4px',
              }}
              className="edit-message-input"
              type="text"
              value={editedMessage}
              onChange={(e) => setEditedMessage(e.target.value)}
            />
          </div>
        ) : (
          <h4 className="text">{obj.message}</h4>
        )}
      </div>
      <div className="comments-delete-icon">
        {isEditable && (
          <>
            <IconButton onClick={handleEditComment} color="secondary">
              {isEditing ? <SaveIcon /> : <EditIcon />}
            </IconButton>
            <IconButton onClick={handleDeleteMessage} color="secondary">
              <DeleteIcon />
            </IconButton>
          </>
        )}
      </div>
    </div>
  );
}

export default MessageArea;
