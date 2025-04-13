import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { getUser } from '../../api';
import { User } from '../../types/User';

type Props = {
  todo: Todo | null;
  onWindowClose: (obj: null) => void;
};

export const TodoModal: React.FC<Props> = ({ todo, onWindowClose }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (todo?.userId !== undefined) {
      getUser(todo.userId).then(fetchedUser => setUser(fetchedUser));
    } else {
      setUser(null);
    }
  }, [todo, user]);

  const reset = () => {
    setUser(null);
    onWindowClose(null);
  };

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {!todo ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #{todo.id}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={reset}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {todo.title}
            </p>

            <p className="block" data-cy="modal-user">
              {todo.completed ? (
                <strong className="has-text-success">Done</strong>
              ) : (
                <strong className="has-text-danger">Planned</strong>
              )}
              {/* <strong className="has-text-success">Done</strong> */}
              {' by '}
              {user ? (
                <a href={`mailto:${user.email}`}>{user.name}</a>
              ) : (
                'Unknown User'
              )}{' '}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
