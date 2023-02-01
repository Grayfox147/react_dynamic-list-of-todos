import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { getUser } from '../../api';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { Loader } from '../Loader';

type Props = {
  selectedTodo: Todo,
  onSetIsSelected: (state: boolean) => void
};

export const TodoModal: React.FC<Props> = ({
  selectedTodo,
  onSetIsSelected,
}) => {
  const [user, setUser] = useState<User>();

  const loadingUser = async () => {
    const selectedUser = await getUser(selectedTodo.userId);

    setUser(selectedUser);
  };

  useEffect(() => {
    loadingUser();
  }, []);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {!selectedTodo.id
        ? (
          <Loader />
        ) : (
          <div className="modal-card">
            <header className="modal-card-head">
              <div
                className="modal-card-title has-text-weight-medium"
                data-cy="modal-header"
              >
                {`Todo #${selectedTodo.id}`}
              </div>

              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
              <button
                type="button"
                className="delete"
                data-cy="modal-close"
                onClick={() => {
                  onSetIsSelected(false);
                }}
              />
            </header>

            <div className="modal-card-body">
              <p className="block" data-cy="modal-title">
                {selectedTodo.title}
              </p>

              <p className="block" data-cy="modal-user">
                {/* <strong className="has-text-success">Done</strong> */}
                <strong
                  className={classNames({
                    'has-text-danger': !selectedTodo.completed,
                    'has-text-success': selectedTodo.completed,
                  })}
                >
                  {selectedTodo.completed
                    ? ('Done')
                    : ('Planned')}
                </strong>

                {' by '}
                {user
                  ? (
                    <a href={`mailto:${user.email}`}>
                      {user.name}
                    </a>
                  )
                  : (
                    <Loader />
                  )}
              </p>
            </div>
          </div>
        )}
    </div>
  );
};
