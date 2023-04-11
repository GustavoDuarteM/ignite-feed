import { format, formatDistanceToNow } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import { Avatar } from './Avatar.jsx'
import { Comment } from './Comment.jsx'
import styles from './Post.module.css'
import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react'

interface Author{
  name: string,
  role: string,
  avatarUrl: string
}

interface Content {
  type: string,
  content: string
}

interface PostProsps{
  author: Author,
  publishedAt: Date,
  content: Content[]
}

export function Post({author, publishedAt, content}: PostProsps) {
  const longFormatPublishedAt = format(publishedAt, "d 'de' LLLL 'ás' HH:mm'h'", { locale: ptBR });
  const RelativePublishedAt = formatDistanceToNow(publishedAt, {
    locale: ptBR,
    addSuffix: true
  })

  const [comments, setComments] = useState([
    'Muito bom Devon, parabéns!! 👏👏'
  ])

  const [newCommentText, setNewCommentText] = useState('')
  
  function handlerCreateNewComment(event: FormEvent){
    event.preventDefault()
    setComments([...comments, newCommentText])
    setNewCommentText('')
  }

  function handlerNewCommentChange(event: ChangeEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity('')
    setNewCommentText(event.target.value)
  }

  function deleteComment(deletedComment: string){
    setComments(comments.filter(comment => comment != deletedComment))
  }

  function handlerNewCommentInvalid(event: InvalidEvent<HTMLTextAreaElement>){
    event.target.setCustomValidity('Você ainda não escreveu um comentário')
  
  }

  const isNewCommentEmpty = newCommentText.length == 0

  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <Avatar src={author.avatarUrl}/>
          <div className={styles.authorInfo}>
            <strong>{author.name}</strong>
            <span>{author.role}</span>
          </div>
        </div>
        
        <time title={longFormatPublishedAt} dateTime={publishedAt.toISOString()}>{RelativePublishedAt}</time>
      </header>
      <div className={styles.content}>
        {
          content.map( (line, i) => {
            if(line.type == 'paragraph'){
              return <p key={i}>{line.content}</p>
            }else if(line.type == 'link'){
              return <p key={i}><a href="#">{line.content}</a></p>
            }
          })
        }
      </div>

      <form onSubmit={handlerCreateNewComment} className={styles.commentForm}>
        <strong>Deixe seu feedback</strong>
        <textarea 
          placeholder='Deixe um comentário'
          value={newCommentText} 
          onChange={handlerNewCommentChange}  
          required
          onInvalid={handlerNewCommentInvalid}
        />
        <footer>
          <button type='submit' disabled={isNewCommentEmpty}> Publicar </button>
        </footer>
      </form>

      <div className={styles.commentList}>
        {
          comments.map((comment, i) =>{
            return <Comment key={i} comment={comment} onDeleteComment={deleteComment}/>
          })
        }
      </div>
    </article>
  )
}

