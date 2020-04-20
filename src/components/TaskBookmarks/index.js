import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Emoji from 'components/Emoji';
import { updateBookmark, removeBookmark } from 'modules/task';
import Stack from 'components/Stack';
import InputText from 'components/InputText';
import styles from './styles.module.css';

export default function TaskBookmarks() {
  const bookmarks = useSelector(store => store.task.bookmarks);
  const dispatch = useDispatch();

  return bookmarks.map((bookmark, i) => (
    <Stack.Row key={bookmark.id} gap="s" className={styles.row}>
      {isUrl(bookmark) ? (
        <a href={bookmark.uri} target="_blank" rel="noopener noreferrer" className={styles.number}>{i < 9 ? i + 1 : ''}</a>
      ) : (
        <div className={styles.inactive} />
      )}
      <InputText
        type="text"
        id={`bookmark-${i}`}
        autoFocus={true}
        value={bookmark.uri}
        placeholder="https://example.com"
        onChange={e =>
          dispatch(updateBookmark({ id: bookmark.id, uri: e.target.value }))
        }
        onKeyDown={e => {
          if (e.target.value === '' && e.keyCode === 8) {
            dispatch(removeBookmark(bookmark));
            focusOnBookmarkWithIndex(i - 1);
          // } else if (e.target.value !== '' && e.keyCode === 13) {
          //   dispatch(newTodo({ after: todo }));
          } else if (e.keyCode === 38) {
            focusOnBookmarkWithIndex(i - 1);
          } else if (e.keyCode === 40) {
            focusOnBookmarkWithIndex(i + 1);
          }
        }}
      />
      {isUrl(bookmark) && (
        <a href={bookmark.uri} target="_blank" rel="noopener noreferrer" className={styles.link}>
          <Emoji emoji="↗️" />
        </a>
      )}
    </Stack.Row>
  ));
}

function isUrl(bookmark) {
  return !!bookmark.uri.match(/https?:\/\/.+\..+/);
}

function focusOnBookmarkWithIndex(index) {
  const el = document.getElementById(`bookmark-${index}`);
  el && el.focus();
}
