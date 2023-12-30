import React from 'react';
import './chat.scss';
import Avatar from '@mui/material/Avatar';
import MessageArea from './MessageArea';
import { fetchCreateMessages, fetchMessages } from '../../redux/slices/chat';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';

function Chat() {
  const randomOnline = Math.floor(Math.random() * 1000);
  const { chat } = useSelector((state) => state.chat);
  const dispatch = useDispatch();
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      message: '',
    },
  });
  const userData = useSelector((state) => state.auth.data);

  const isLoadingChat = chat.status === 'loading';

  React.useEffect(() => {
    dispatch(fetchMessages());
  }, []);

  console.log(chat);

  if (isLoadingChat) {
    return <div>Зарузка...</div>;
  }

  const onSumbit = (values) => {
    dispatch(fetchCreateMessages(values))
      .then(() => {
        dispatch(fetchMessages());
        reset();
      })
      .catch((error) => {
        console.error('Ошибка при написании сообшения:', error);
      });
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div className="Main">
        <article className="content">
          <h1>Общий чат {randomOnline} онлайн</h1>
          {/* <div className="chat-container">
          <Avatar
            sx={{ bgcolor: 'grey' }}
            alt="Mikhail"
            src="https://scontent.ftbs6-2.fna.fbcdn.net/v/t39.30808-6/387754203_122094244100079438_1883192431668911678_n.jpg?stp=cp6_dst-jpg&_nc_cat=103&ccb=1-7&_nc_sid=efb6e6&_nc_eui2=AeG2dCDyDnkB_vKGhnYuoSga-RhCm1Cc36_5GEKbUJzfr7Nbeur8KaJUfg6VHzrhMwls_DhGlBoP0rsSVt8g22yF&_nc_ohc=RUk9NSimcXEAX-ppFmf&_nc_ht=scontent.ftbs6-2.fna&oh=00_AfA0ymV6i1UoPyvGZomGo8T6S2_HJUCZtkxkkl_B9sqPDg&oe=6589DE0D"
          />
          <div className="border-for-text">
            <h4 className="name-chat">Andranik Grigoran</h4>
            <h4 className="text">my name is bobinson and i support UK</h4>
          </div>
        </div> */}
          <section style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {!isLoadingChat &&
              chat.messages.map((obj, index) => (
                <MessageArea isEditable={userData?._id === obj.user._id} key={index} obj={obj} />
              ))}
          </section>

          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div className="write-in-chat-area">
              <form onSubmit={handleSubmit(onSumbit)} className="Message">
                <input
                  {...register('message', { required: 'Напишите сообшение' })}
                  placeholder="Напишите сообщение..."
                  class="MsgInput"
                  type="text"
                />
                <button style={{ border: 'none', background: 'transparent' }} type="submit">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    version="1.0"
                    width="30.000000pt"
                    height="30.000000pt"
                    viewBox="0 0 30.000000 30.000000"
                    preserveAspectRatio="xMidYMid meet"
                    class="SendSVG">
                    <g
                      transform="translate(0.000000,30.000000) scale(0.100000,-0.100000)"
                      fill="grey"
                      stroke="none">
                      <path d="M44 256 c-3 -8 -4 -29 -2 -48 3 -31 5 -33 56 -42 28 -5 52 -13 52 -16 0 -3 -24 -11 -52 -16 -52 -9 -53 -9 -56 -48 -2 -21 1 -43 6 -48 10 -10 232 97 232 112 0 7 -211 120 -224 120 -4 0 -9 -6 -12 -14z"></path>
                    </g>
                  </svg>
                  <span class="l"></span>
                </button>
              </form>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}

export default Chat;
