import { ThumbsUp, Trash } from '@phosphor-icons/react';
import styles from './Comment.module.css'
import { Avatar } from './Avatar';
import { useState } from 'react';

interface CommentProps{
  comment: string,
  onDeleteComment: (comment: string) => void
}

export function Comment({comment, onDeleteComment}:CommentProps) {
  const [likeConut, setLikeCount] = useState(0)

  function deleteComment() {
    onDeleteComment(comment)
  }

  function handleLikeCount (){ 
    setLikeCount(state => state + 1); 
    setLikeCount(state => state + 1); 
  }
  
  return (
    <div className={styles.comment}>
      <Avatar hasBorder={false} src="https://github.com/GustavoDuarteM.png" />
      <div className={styles.commentBox}>
        <div className={styles.commentContent}>
          <header>
            <div className={styles.authorAndTime}>
              <strong>
                Gustavo Duarte(você)
              </strong>
              <time title='11 de maio ás 8:13h' dateTime='2022-05-11 08:13:30'>Publicado há 1h</time>
            </div>
            <button title='Deletar comentário' onClick={deleteComment}>
              <Trash size={24} />
            </button>
          </header>
          <p>{comment}</p>
        </div>
        <footer>
          <button onClick={handleLikeCount}>
            <ThumbsUp />
            Aplaudir
            <span> {likeConut} </span>
          </button>
        </footer>
      </div>
    </div>
  );
} 